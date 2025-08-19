import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { roomDeleteProps } from '../../../apis/private-reading-room/roomDelete';
import roomDelete from '../../../apis/private-reading-room/roomDelete';

interface UseRoomDeleteOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const useDeleteRoom = (options?: UseRoomDeleteOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId }: roomDeleteProps) => roomDelete({ roomId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['theme'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error('리딩룸 삭제 실패:', error);
      options?.onError?.(error);
    },
  });
};

export default useDeleteRoom;
