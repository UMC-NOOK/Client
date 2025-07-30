import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SignUpProps } from '../../../../types/auth/signup/userType';
import SignUp from '../../../../apis/auth/signUp';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: SignUpProps) => SignUp(userData),
    onSuccess: (data) => {
      //   console.log(data);
      navigate('/login');
    },
  });
};

export default useSignUp;
