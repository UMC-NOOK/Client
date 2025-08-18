import instance from '../../../../apis/instance';
import { CreateReadingRoomBody, CreateReadingRoomParams } from './types/create-reading-room-types';

export interface CreateReadingRoomRequest {
    body: CreateReadingRoomBody;
    query: CreateReadingRoomParams;
}

const CreateReadingRoom = async ({ body, query }: CreateReadingRoomRequest) => {
    const usp = new URLSearchParams();
    usp.append('themeName', query.themeName);
    (query.hashtags ?? []).forEach((h) => usp.append('hashtags', h)); // <-- [] 없이 반복

    const res = await instance.post('/api/reading-rooms', body, {
        params: usp, // URLSearchParams를 그대로 넘기면 [] 안 붙음
    });
    return res.data;
};

export default CreateReadingRoom;
