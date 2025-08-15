import instance from '../../../../apis/instance';

export interface themeFetchProps {
  roomId: number;
}

const themeFetch = async ({ roomId }: themeFetchProps) => {
  try {
    const res = await instance.get(`api/reading-rooms/${roomId}/themes`, {
      params: { roomId },
    });
    return res.data.result;
  } catch (err) {
    console.log('배경조회', err);
  }
};

export default themeFetch;
