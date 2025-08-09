import instance from '../../../apis/instance';
import type { ApiEnvelope, UserMeDTO } from '../type/profile';

export const getMe = async () => {
  const { data } = await instance.get<ApiEnvelope<UserMeDTO>>('/api/users/me');
  return data.result;
};

export const patchNickname = async (payload: { nickname: string }) => {
  const { data } = await instance.patch<ApiEnvelope<number>>('/api/users/me', payload);
  return data.result; // 0
};
