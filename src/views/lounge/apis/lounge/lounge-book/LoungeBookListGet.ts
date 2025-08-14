import instance from '../../../../../apis/instance';
import { MallType } from '../types/lounge-types';

export interface LoungeBookListGetProps {
    mallType: MallType;
    sectionId?: string;
    categoryId?: string;
    page?: number;
}

const LoungeBookListGet = async ({ mallType, sectionId, categoryId, page = 0,  }: LoungeBookListGetProps) => {
    try{
        const res = await instance.get('/api/lounge/books',{
            params: { 
                mallType, 
                sectionId: sectionId || undefined, 
                categoryId: categoryId || undefined, 
                page },
        });

        return res.data;
    }catch(err){
        console.log('라운지 도서 리스트', err);
        throw err; // ← 이거 필수
    }
}

export default LoungeBookListGet;
