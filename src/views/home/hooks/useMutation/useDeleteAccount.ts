import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMe } from '../../apis/user';

export const useDeleteAccount = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMe(),
    onSuccess: () => {
      // 토큰/세션 비우기
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // 리액트쿼리 캐시도 정리
      qc.clear();

      // 탈퇴 후 로그인 화면으로 연결 
      window.location.href = '/login';
    },
  });
};
