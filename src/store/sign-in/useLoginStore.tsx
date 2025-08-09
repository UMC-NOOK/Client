import { create } from 'zustand';

interface LoginStore {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setLogin: (state: boolean) => void;
  onLogin: () => void;
}

const useLoginStore = create<LoginStore>((set) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const initialLoginState = !!accessToken;
  return {
    isLogin: initialLoginState,
    accessToken,
    refreshToken,
    setLogin: (state) => set({ isLogin: state }),
    onLogin: () => set({ isLogin: true }),
    onLogout: () => set({ isLogin: false }),
  };
});

export default useLoginStore;
