import instance from '../../../../apis/instance';

const bookListFetch = async () => {
  try {
    const res = await instance.get(`api/reading-rooms/reading`);
    // console.log('사용자 책 조회', res.data.result);
    return res.data.result;
  } catch (err) {
    console.log('사용자 책 리스트 조회 에러', err);
  }
};

export default bookListFetch;
