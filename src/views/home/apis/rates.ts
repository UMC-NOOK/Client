import instance from '../../../apis/instance';
import type { ApiEnvelope, MonthlyRecordRateResponseDTO } from '../../home/type/home';

export const getHomeRates = async (year: string) => {
  const { data } = await instance.get<ApiEnvelope<MonthlyRecordRateResponseDTO>>(
    '/api/records/rate',
    { params: { year } },
  );
  return data.result;
};
