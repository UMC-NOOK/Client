import instance from '../../../../apis/instance';

export interface myRoleFetchProps {
  roomId: number;
}

const myRoleFetch = async ({ roomId }: myRoleFetchProps) => {
  try {
    const res = await instance.get(`api/reading-rooms/${roomId}/my-role`);
    // console.log('내가 왕이 될 상인가', res.data.result);
    return res.data.result;
  } catch (err) {
    console.log('내역할조회', err);
  }
};

export default myRoleFetch;
