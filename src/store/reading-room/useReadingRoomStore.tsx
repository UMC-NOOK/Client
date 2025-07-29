import {create} from 'zustand';

interface ReadingRoom {
    id: number;
    bgImg: string;
    title: string;
    introduction: string;
    tags: string[];
    peopleOnLive: number,
    peopleCount: number;
    createdAt: Date;
}

interface ReadingRoomStore{
    rooms: ReadingRoom[];
    isLoading: boolean;
    setRooms: (rooms: ReadingRoom[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateInfo: (id: number, peopleOnLive: number, peopleCount: number) => void;
}

export const useReadingRoomStore = create<ReadingRoomStore>((set) => ({
    rooms: [],
    isLoading: false,
    setRooms: (rooms) => set({rooms}),
    setIsLoading: (isLoading) => set({isLoading}),
    updateInfo: (id, peopleOnLive, peopleCount) =>
        set((state) => ({
            rooms: state.rooms.map((room)=>
                room.id === id?{
                    ...room,
                    peopleOnLive,
                    peopleCount,
                }: room )
        }))
}));