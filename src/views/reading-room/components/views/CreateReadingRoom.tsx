import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CAMPFIRE_IMG from '../../../../assets/readingRoom/bg/Campfire.png';
import SUBWAY_IMG from '../../../../assets/readingRoom/bg/Subway.png';
import LIBRARY_IMG from '../../../../assets/readingRoom/bg/ReadingRoom.png';

import ActionButtons from '../reading-room/ActionButtons';
import { ReadingRoomActionsProvider } from '../../contexts/ReadingRoomActionsContext';
import InsertInfo from '../reading-room/InsertInfo';

import { useCreateReadingRoom } from '../../hooks/reading-room/useMutation/useCreateReadingRoom';
import { normalizeTagsForApi, normalizeThemeForApi } from '../../utils/reading-room/normalize';
import type { ThemeType } from '../../apis/reading-room/types/create-reading-room-types';
import type { CreateReadingRoomRequest } from '../../apis/reading-room/CreateReadingRoom';
import useInfo from '../../../auth/hook/useQuery/useInfo';

type UsageType = 'create' | 'edit';

interface CreateReadingRoomProps {
    usage: UsageType;
    onCloseModal?: () => void;
    onCreate?: (payload: { name: string; description: string; theme: ThemeType; tags: string[] }) => void;
    onEdit?: (payload: { roomId: number; name: string; description: string; theme: ThemeType; tags: string[] }) => void;
    room?: { roomId: number; name: string; description: string; theme: string; tags: string[] };
}

const CreateReadingRoom = ({ usage, onCloseModal, onCreate, onEdit, room }: CreateReadingRoomProps) => {
    const navigate = useNavigate();
    const { data: me } = useInfo();
    const userId = me?.userId ?? null;

    const [selected, setSelected] = useState<ThemeType>('CAMPFIRE');
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const isCreatingValid = roomName.trim() !== '' && roomDescription.trim() !== '';

    const themeImages: Record<ThemeType, string> = {
        CAMPFIRE: CAMPFIRE_IMG,
        SUBWAY: SUBWAY_IMG,
        LIBRARY: LIBRARY_IMG,
    };

    useEffect(() => {
        if (usage === 'edit' && room) {
            setSelected(normalizeThemeForApi(room.theme));
            setRoomName(room.name ?? '');
            setRoomDescription(room.description ?? '');
            setSelectedTags(room.tags ?? []);
        }
    }, [usage, room]);

    const { mutate: createRoom, isPending: creating } = useCreateReadingRoom();

    const actions = useMemo(() => {
        return {
            create: () => {
                if (!isCreatingValid) return;
                if (creating) return;
        
                const themeName = normalizeThemeForApi(selected);
                const hashtags = normalizeTagsForApi(selectedTags);

                const req: CreateReadingRoomRequest = {
                    body: { name: roomName, description: roomDescription },
                    query: { themeName, hashtags },
                };

            createRoom(req, {
                onSuccess: (res) => {
                    const newRoomId = res?.result;
                    if (newRoomId != null) {
                        navigate(`/reading-room/${newRoomId}/${userId ?? 0}`);
                    }
                    onCreate?.({ name: roomName, description: roomDescription, theme: themeName, tags: hashtags });
                },
                onError: (err) => {
                    console.error('[CreateReadingRoom] 생성 실패:', err);
                },
            });
        },

        edit: () => {
            if (!room) return;
            const themeName = normalizeThemeForApi(selected);
            const hashtags = normalizeTagsForApi(selectedTags);
            onEdit?.({ roomId: room.roomId, name: roomName, description: roomDescription, theme: themeName, tags: hashtags });
        },

        cancel: () => onCloseModal?.(),
        };
    }, [
        isCreatingValid, creating,            
        selected, selectedTags,
        roomName, roomDescription, room,
        createRoom, onCreate, onEdit, onCloseModal,
        navigate, userId,
    ]);

    return (
        <ReadingRoomActionsProvider value={actions}>
            <div className="flex flex-col justify-center items-center">
                <div className="relative w-full">
                    <div className="flex flex-row justify-center items-start gap-13 mt-10 px-10">
                        <div className="flex flex-col">
                            {usage === 'create' && (
                                <div className="flex flex-row items-center mb-20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        onClick={() => navigate('/reading-room')}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14.1919 2.05806C14.436 2.30214 14.436 2.69786 14.1919 2.94194L7.13388 10L14.1919 17.0581C14.436 17.3021 14.436 17.6979 14.1919 17.9419C13.9479 18.186 13.5521 18.186 13.3081 17.9419L5.80806 10.4419C5.56398 10.1979 5.56398 9.80214 5.80806 9.55806L13.3081 2.05806C13.5521 1.81398 13.9479 1.81398 14.1919 2.05806Z"
                                            fill="white"
                                            fillOpacity="0.5"
                                        />
                                    </svg>
                                <div className="text-white text-xl ml-6">내 리딩룸</div>
                            </div>
                        )}

                    <img
                        src={themeImages[selected]}
                        alt={selected}
                        className={`${usage === 'create' ? 'w-270 h-221 rounded-xl' : 'w-[446px] h-[365px] rounded-xl'}`}
                    />

                <div className="flex flex-col mt-6">
                    <div className="flex flex-row justify-start items-center gap-3">
                        <div className="text-white text-sm">테마 선택</div>
                        <div className="text-white text-2xs">리딩룸 생성 후 테마를 변경할 수 있습니다.</div>
                    </div>

                    <div className="flex flex-row justify-start items-center gap-5 mt-7 mb-10">
                        {(['CAMPFIRE', 'SUBWAY', 'LIBRARY'] as ThemeType[]).map((theme) => (
                            <img
                                key={theme}
                                src={themeImages[theme]}
                                alt={theme}
                                onClick={() => setSelected(theme)}
                                className={`cursor-pointer ${
                                    usage === 'create' ? 'w-84 h-69' : 'w-[139.617px] h-[114.558px]'
                                    } rounded-xl border transition-all duration-200 ${
                                    selected === theme ? 'border-[rgba(122,191,201,1)]' : 'border-transparent'
                                }`}
                                style={selected !== theme ? { filter: 'blur(1px)', opacity: 0.5 } : undefined}
                            />
                        ))}
                    </div>
                </div>
            </div>

                <div className={`flex flex-col justify-start ${usage === 'create' ? 'mt-40' : 'mt-10'}`}>
                    <InsertInfo
                        roomName={roomName}
                        setRoomName={setRoomName}
                        roomDescription={roomDescription}
                        setRoomDescription={setRoomDescription}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                    <ActionButtons usage={usage} disabled={usage === 'create' ? !isCreatingValid || creating : false} />
                    </div>
                </div>
            </div>
        </div>
    </ReadingRoomActionsProvider>
    );
};

export default CreateReadingRoom;
