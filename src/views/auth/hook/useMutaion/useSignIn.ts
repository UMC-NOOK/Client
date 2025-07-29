import { SignInProps } from '../../../../types/auth/signin/userType';
import SignIn from '../../../../apis/auth/SignIn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (signInData: SignInProps) => SignIn(signInData),
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('accessToken', data.token.accessToken);
      sessionStorage.setItem('refreshToken', data.token.refreshToken);
      navigate('/home');
    },
  });
};

export default useSignIn;
