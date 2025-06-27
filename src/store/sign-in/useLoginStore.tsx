import { create } from 'zustand';

export const useSignInStore = create<{
  isLogin: boolean;
}>((set, get) => ({
  isLogin: false,
}));
