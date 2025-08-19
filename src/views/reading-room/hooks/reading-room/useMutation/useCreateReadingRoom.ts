import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateReadingRoom, { CreateReadingRoomRequest } from '../../../apis/reading-room/CreateReadingRoom';

export const useCreateReadingRoom = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (req: CreateReadingRoomRequest) => CreateReadingRoom(req),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['readingRooms'] });
            qc.invalidateQueries({ queryKey: ['myReadingRooms'] });
        },
    });
};
