import instance from '../../../apis/instance';
import type {
  ApiEnvelope,
  PatchProfileParams,
  ProfileResponseDTO,
} from '../type/profile';

// GET /api/profiles
export const getProfile = async () => {
  const { data } = await instance.get<ApiEnvelope<ProfileResponseDTO>>('/api/profiles');
  return data.result;
};

// PATCH /api/profiles 
export const patchProfile = async (params: PatchProfileParams) => {
  const { data } = await instance.patch<ApiEnvelope<number>>('/api/profiles', null, {
    params,
  });
  return data.result; // 0
};

// PUT /api/profiles/nicknames?nickname=...
export const putNickname = async (nickname: string) => {
  const { data } = await instance.put<ApiEnvelope<number>>(
    '/api/profiles/nicknames',
    null,
    { params: { nickname } },
  );
  return data.result; // 0
};

