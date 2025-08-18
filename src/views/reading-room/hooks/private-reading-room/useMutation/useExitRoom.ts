import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { roomExitProps } from '../../../apis/private-reading-room/roomExit';
import roomExit from '../../../apis/private-reading-room/roomExit';

interface UseRoomExitOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const useExitRoom = (options?: UseRoomExitOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId }: roomExitProps) => roomExit({ roomId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['theme'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error('리딩룸 탈퇴 실패:', error);
      options?.onError?.(error);
    },
  });
};

export default useExitRoom;
