import { useMutation, useQueryClient } from '@tanstack/react-query';
import JoinReadingRoom from '../../../apis/reading-room/JoinReadingRoom';

export const useJoinReadingRoom = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (roomId: number) => JoinReadingRoom({ roomId }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['myReadingRooms'] });
        },
    });
};
