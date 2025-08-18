import { useQuery } from "@tanstack/react-query";
import MyReadingRoomGet from "../../../apis/reading-room/MyReadingRoom";

const useGetMyReadingRoom = () => {
    return useQuery({
        queryKey: ['myReadingRooms'],
        queryFn: () => MyReadingRoomGet(),
        staleTime: 0,
        select : (data) => {
            const rooms = data.result;
            return rooms;
        }
    })
}

export default useGetMyReadingRoom;