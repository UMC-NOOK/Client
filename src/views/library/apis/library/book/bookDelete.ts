import instance from '../../../../../apis/instance';

export interface bookDeleteProps {
  bookId: number;
}

const bookDelete = async ({ bookId }: bookDeleteProps) => {
  try {
    const res = await instance.delete(`api/bookshelf/delete/${bookId}`);
    return res.data;
  } catch (err) {
    console.log('월별책조회', err);
  }
};

export default bookDelete;
