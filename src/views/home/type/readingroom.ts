//임시연결(리딩룸파트)
export type ApiEnvelope<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
  };
  
  export type LastAccessedReadingRoomResponseDTO = {
    hashtags: boolean;
    roomId: number;
    name: string;
    description: string;
    currentUserCount: number;
    themeImageUrl?: string;
  } | null; 
  