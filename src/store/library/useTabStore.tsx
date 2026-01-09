import { create } from 'zustand';

interface TabStore {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  selectedTab: '독서 중',
  setSelectedTab: (tab: string) => {
    set({ selectedTab: tab });
  },
}));
