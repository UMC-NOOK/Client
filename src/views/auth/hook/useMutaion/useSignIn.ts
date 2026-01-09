import type { SignInProps } from '../../../../types/auth/signin/userType';
import SignIn from '../../../../apis/auth/signIn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../../store/sign-in/useLoginStore';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { onLogin } = useLoginStore();
  return useMutation({
    mutationFn: (signInData: SignInProps) => SignIn(signInData),
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('accessToken', data.token.accessToken);
      sessionStorage.setItem('refreshToken', data.token.refreshToken);
      sessionStorage.setItem('nickName', data.nickname);
      onLogin();
      navigate('/home');
    },
  });
};

export default useSignIn;
