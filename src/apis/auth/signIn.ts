import type { SignInProps } from '../../types/auth/signin/userType';
import AuthInstance from './authInstance';

const SignIn = async (signInData: SignInProps) => {
  try {
    const response = await AuthInstance.post('api/users/login', signInData);
    console.log('로그인', response);
    return response.data.result;
  } catch (error) {
    console.log('로그인 error:', error);
  }
};

export default SignIn;
