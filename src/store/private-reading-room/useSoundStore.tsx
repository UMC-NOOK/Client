import { create } from 'zustand';

interface SoundStore {
  Sound: boolean;
  setSound: (state: boolean) => void;
  toggleSound: () => void;
}

const useSoundStore = create<SoundStore>((set) => {
  const initialModalState = false;

  return {
    Sound: initialModalState,
    setSound: (state) => set({ Sound: state }),
    toggleSound: () => set((prev) => ({ Sound: !prev.Sound })),
  };
});

export default useSoundStore;
