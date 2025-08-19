import instance from '../../../../apis/instance';

export interface JoinReadingRoomsParams {
    roomId?: number;
}

const JoinReadingRoom = async({roomId} : JoinReadingRoomsParams ) => {
    try{
        const res = await instance.post(
            `/api/reading-rooms/${roomId}/join`,
        null
        );

        return res.data;
    }catch(err){
        console.log('리딩룸 가입 실패', err);
        throw err;
    }
}

export default JoinReadingRoom;

export const joinReadingRoomQueryKeys = {
    room: (roomId: number) => ['roomId', roomId] as const,
};
