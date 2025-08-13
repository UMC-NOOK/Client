import { create } from 'zustand';

interface SoundStore {
  isSoundEnabled: boolean;
  setSound: (enabled: boolean) => void;
  toggleSound: () => void;
}

const useSoundStore = create<SoundStore>((set) => {
  return {
    isSoundEnabled: false,
    setSound: (enabled) => set({ isSoundEnabled: enabled }),
    toggleSound: () =>
      set((prev) => ({ isSoundEnabled: !prev.isSoundEnabled })),
  };
});

export default useSoundStore;
