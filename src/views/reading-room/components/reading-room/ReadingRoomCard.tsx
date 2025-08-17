// src/views/reading-room/components/views/ReadingRoomCard.tsx
import React from 'react';
import fallbackCard from '../../../../assets/readingRoom/card/card.png';
import { ReadingRoom } from '../../apis/reading-room/types/reading-room-types';

interface ReadingRoomCardProps {
    room: ReadingRoom;
    onClick?: () => void;
    variant?: 'all' | 'my';
}

const ReadingRoomCard: React.FC<ReadingRoomCardProps> = ({ room, onClick }) => {
    const {
        roomId,
        name,
        description,
        hashtags = [],
        currentUserCount = 0,
        totalUserCount = 0,
        themeImageUrl,
    } = room;

    const displayTags = hashtags.map((t) => t.replace(/^_/, ''));

    const cleanedUrl = (themeImageUrl ?? '').trim();
    const [src, setSrc] = React.useState<string>(cleanedUrl || fallbackCard);

    React.useEffect(() => {
        if (!cleanedUrl) {
            console.error(
                `[ReadingRoomCard] themeImageUrl is missing. roomId=${roomId}, name="${name}"`
        );
    }
        setSrc(cleanedUrl || fallbackCard);
    }, [cleanedUrl, roomId, name]);

    const handleImgError = () => {
        if (cleanedUrl) {
            console.error(
            `[ReadingRoomCard] Failed to load themeImageUrl="${cleanedUrl}" for roomId=${roomId}, name="${name}"`
        );
    }
        setSrc(fallbackCard);
    };

    return (
        <div
            className="relative w-124 h-200 group rounded-xl overflow-hidden cursor-pointer"
            onClick={onClick}
            data-room-id={roomId}
        >
        <img
            src={src}
            onError={handleImgError}
            alt="RoomCard"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg z-0"
        />

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="248"
            height="122"
            viewBox="0 0 248 122"
            fill="none"
            className="absolute top-0 left-0 z-10"
        >
            <g clipPath="url(#clip0_1185_4567)">
                <rect width="248" height="122" rx="8" fill="url(#paint0_linear_1185_4567)" />
            </g>
            <defs>
            <linearGradient
                id="paint0_linear_1185_4567"
                x1="124"
                y1="0"
                x2="124"
                y2="122"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#2B2217" />
                <stop offset="1" stopColor="#2B2217" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_1185_4567">
                <rect width="248" height="122" rx="8" fill="white" />
            </clipPath>
            </defs>
        </svg>

        <div className="flex flex-col absolute top-13 left-12 z-20 text-white">
            <span className="text-base font-semibold">{name}</span>
            <span className="text-2xs font-thin">{description}</span>

            <div className="flex flex-row items-start text-2xs font-thin gap-2 mt-5">
                {displayTags.map((tag, idx) => (
                <span
                    key={idx}
                    className="flex justify-center items-center rounded-lg px-5 py-2"
                    style={{ backgroundColor: 'rgba(66, 60, 53, 0.80)' }}
                >
                # {tag}
                </span>
                ))}
            </div>
        </div>

        <div className="flex flex-row text-white">
            <div className="absolute bottom-7 left-10 text-sm">{currentUserCount}명 접속 중</div>
            <div className="absolute bottom-7 right-10 text-sm">
                {currentUserCount}/{totalUserCount}
            </div>
        </div>
    </div>
    );
};

export default ReadingRoomCard;
