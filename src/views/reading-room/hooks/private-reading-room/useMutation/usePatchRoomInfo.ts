import { useMutation } from '@tanstack/react-query';
import roomInfoPatch from '../../../apis/private-reading-room/roomInfoPatch';
import type { RoomInfoPatchProps } from '../../../apis/private-reading-room/roomInfoPatch';

const usePatchRoomInfo = () => {
  return useMutation({
    mutationFn: (params: RoomInfoPatchProps) => roomInfoPatch(params),
    onSuccess: (data) => {
      console.log('독서방 정보 수정 성공:', data);
    },
    onError: (error) => {
      console.error('독서방 정보 수정 실패:', error);
    },
  });
};

export default usePatchRoomInfo;
