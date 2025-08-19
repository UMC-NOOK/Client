import instance from '../../../../apis/instance';

export interface roomExitProps {
  roomId: number;
}

const roomExit = async ({ roomId }: roomExitProps) => {
  try {
    const res = await instance.get(`api/reading-rooms/${roomId}/guest`, {
      params: { roomId },
    });
    return res.data.result;
  } catch (err) {
    console.log('리딩룸 탈퇴', err);
  }
};

export default roomExit;
