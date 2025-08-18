import { useQuery } from "@tanstack/react-query";
import AllReadingRoomGet, { allReadingRoomQueryKeys, GetReadingRoomsParams } from "../../../apis/reading-room/AllReadingRoomGet";

const useGetAllReadingRoom = ({page} : GetReadingRoomsParams) => {
    return useQuery({
        queryKey: allReadingRoomQueryKeys.rooms(page ?? 0),
        queryFn: () => AllReadingRoomGet({page: page}),
        staleTime: 0, 
        select : (data) => {
            const rooms = data.result;
            return rooms;
        }
    })
}

export default useGetAllReadingRoom;