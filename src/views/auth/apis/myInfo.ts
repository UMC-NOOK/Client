import instance from '../../../apis/instance';

const myInfo = async () => {
    try {
        const response = await instance.get(
        `api/users/me`,
        );
        console.log('로그인 성공:', response);
        return response.data;
    } catch (error) {
        console.error('로그인 error:', error);
        throw error;
    }
};

export default myInfo;
