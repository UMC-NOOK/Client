import instance from '../../../../apis/instance';

export interface roomDeleteProps {
  roomId: number;
}

const roomDelete = async ({ roomId }: roomDeleteProps) => {
  try {
    const res = await instance.get(`api/reading-rooms/${roomId}/host`, {
      params: { roomId },
    });
    return res.data.result;
  } catch (err) {
    console.log('리딩룸 삭제', err);
  }
};

export default roomDelete;
