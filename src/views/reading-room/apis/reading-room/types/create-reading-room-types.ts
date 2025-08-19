export type ThemeType = 'LIBRARY' | 'CAMPFIRE' | 'SUBWAY';

export interface CreateReadingRoomParams {
    themeName: ThemeType;
    hashtags: string[];
}

export interface CreateReadingRoomBody{
    name: string;
    description: string;
}

export interface ApiResponse<T>{
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export type CreateReadingRoomResponse = ApiResponse<number>;