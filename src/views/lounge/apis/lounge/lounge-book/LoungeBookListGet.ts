import instance from '../../../../../apis/instance';
import { MallType } from '../types/lounge-types';

export interface LoungeBookListGetProps {
    mallType: MallType;
}

const LoungeBookListGet = async ({ mallType}: LoungeBookListGetProps) => {
    try{
        const res = await instance.get('/api/lounge/books',{
            params: { 
                mallType},
        });

        return res.data;
    }catch(err){
        console.log('라운지 도서 리스트', err);
        throw err;
    }
}

export default LoungeBookListGet;
