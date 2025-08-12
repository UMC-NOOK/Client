import instance from '../../../apis/instance';
import type { ApiEnvelope, GoalRequestDTO, GoalResultDTO } from '../../home/type/home';

export const getHomeGoals = async () => {
  const { data } = await instance.get<ApiEnvelope<GoalResultDTO>>('/api/users/goals');
  return data.result;
};

export const patchHomeGoals = async (payload: GoalRequestDTO) => {
  const { data } = await instance.patch<ApiEnvelope<Record<string, never>>>(
    '/api/users/goals',
    payload,
  );
  return data.isSuccess; // result: {}
};
