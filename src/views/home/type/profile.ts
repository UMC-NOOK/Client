export type ApiEnvelope<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
  };
  
  export type ProfileResponseDTO = {
    // 누키 위에 표시될 텍스트(별명)
    alias: string;
    // 캐릭터/램프 색상
    characterColor: 'BLUE' | 'RED' | 'ORANGE' | 'GREEN';
    // 배경 패턴
    backgroundPattern: 'NONE' | 'STRIPE' | 'ARGYLE' | 'DOT' | 'PLAID' | 'STAR';
  };
  
  export type PatchProfileParams = {
    alias: string;
    characterColor: ProfileResponseDTO['characterColor'];
    backgroundPattern: ProfileResponseDTO['backgroundPattern'];
  };
  
  export type UserMeDTO = {
    userId: number;
    email: string;
    nickname: string; 
  };
  
  