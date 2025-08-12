//src/view/home/hooks/useQuery/useHomeRates.ts

import { useQuery } from '@tanstack/react-query';
import { getHomeRates } from '../../apis/rates';

export const useGetHomeRates = (year: string) =>
  useQuery({ queryKey: ['home','rates', year], queryFn: () => getHomeRates(year) });
