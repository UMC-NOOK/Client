import instance from '../../../apis/instance';
import type { ApiEnvelope, UserMeDTO } from '../type/profile';

export const getMe = async () => {
  const { data } = await instance.get<ApiEnvelope<UserMeDTO>>('/api/users/me');
  return data.result;
};

export const deleteMe = async () => {
  const { data } = await instance.delete<ApiEnvelope<string>>('/api/users/me');
  return data.result; 
};
