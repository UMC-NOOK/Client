import type { SignUpProps } from '../../types/auth/signup/userType';
import AuthInstance from './authInstance';

const SignUp = async (userData: SignUpProps) => {
  try {
    const response = await AuthInstance.post('api/users/signup', userData);
    // console.log('회원가입', response);
    return response.data;
  } catch (error) {
    console.log('signup error:', error);
  }
};

export default SignUp;
