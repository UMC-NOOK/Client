import instance from '../../../../apis/instance';

export type ThemeType = 'LIBRARY' | 'CAMPFIRE' | 'SUBWAY' | 'READINGROOM';
export interface GetReadingRoomsParams {
    themeName: ThemeType;
    hashtags: string[];
}

const CreateReadingRoom = async({page = 0} : GetReadingRoomsParams ) => {
  try{
    const res = await instance.get(
      '/api/reading-rooms',
      {
        params: { page }
      });

      return res.data;
  }catch(err){
    console.log('전채 리딩룸 목록 조회 실패', err);
    throw err;
  }
}

export default CreateReadingRoom;

export const allReadingRoomQueryKeys = {
    rooms: (page: number) => ['readingRooms', page] as const,
};
