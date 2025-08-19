export interface ReadingRoom {
    roomId: number;
    name: string;
    description: string;
    hashtags: string[];          
    currentUserCount: number;    
    totalUserCount: number;      
    themeImageUrl: string;
}

export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export type ReadingRoomListResponse = ApiResponse<ReadingRoom[]>;
