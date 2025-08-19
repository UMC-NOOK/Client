import instance from '../../../../apis/instance';


const MyReadingRoomGet = async() => {
    try{
        const res = await instance.get(
            '/api/reading-rooms/join');

        return res.data;
    }catch(err){
        console.log('내 리딩룸 목록 조회 실패', err);
        throw err;
    }
}

export default MyReadingRoomGet;