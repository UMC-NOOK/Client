import {create} from 'zustand';

interface MyReadingRoom {
    id: number;
    bgImg: string;
    title: string;
    introduction: string;
    tags: string[];
    peopleOnLive: number,
    peopleCount: number;
    createdAt: Date;
}

interface MyReadingRoomStore{
    rooms: MyReadingRoom[];
    isLoading: boolean;
    setRooms: (rooms: MyReadingRoom[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateInfo: (id: number, title: string, introduction: string, 
        tags: string[], peopleOnLive: number, peopleCount: number) => void;
}

export const useReadingRoomStore = create<MyReadingRoomStore>((set) => ({
    rooms: [],
    isLoading: false,
    setRooms: (rooms) => set({rooms}),
    setIsLoading: (isLoading) => set({isLoading}),
    updateInfo: (id, title, introduction, tags, peopleOnLive, peopleCount) =>
        set((state) => ({
            rooms: state.rooms.map((room)=>
                room.id === id?{
                    ...room,
                    title,
                    introduction,
                    tags,
                    peopleOnLive,
                    peopleCount,
                }: room )
        }))
}));