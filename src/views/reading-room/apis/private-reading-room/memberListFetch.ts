import instance from '../../../../apis/instance';

export interface memberListFetchProps {
  roomId: number;
}

const memberListFetch = async ({ roomId }: memberListFetchProps) => {
  try {
    const res = await instance.get(`api/reading-rooms/${roomId}/joined-users`);
    // console.log('사용자 책 조회', res.data.result);
    return res.data.result;
  } catch (err) {
    console.log('맴버목록조회', err);
  }
};

export default memberListFetch;
