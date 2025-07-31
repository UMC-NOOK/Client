import instance from '../instance';

const SignOut = async () => {
  try {
    const response = await instance.post('api/users/logout');
    return response.data;
  } catch (error) {
    console.log('signup error:', error);
  }
};

export default SignOut;
