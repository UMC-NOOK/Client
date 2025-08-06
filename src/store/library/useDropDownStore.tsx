import { create } from 'zustand';

interface useDropDownStore {
  selectMenu: string;
  setSelectMenu: (tab: string) => void;
}

export const useDropDownStore = create<useDropDownStore>((set) => ({
  selectMenu: '최근 등록순',
  setSelectMenu: (tab: string) => {
    set({ selectMenu: tab });
  },
}));
