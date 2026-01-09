import { create } from 'zustand';

interface SoundStore {
  isSoundEnabled: boolean;
  isEntSoundEnabled: boolean;
  setSound: (enabled: boolean) => void;
  setEntSound: (enabled: boolean) => void;
  toggleSound: () => void;
  toggleEntSound: () => void;
  onSound: () => void;
  offSound: () => void;
  onEntSound: () => void;
  offEntSound: () => void;
}

const useSoundStore = create<SoundStore>((set) => ({
  isSoundEnabled: false,
  isEntSoundEnabled: false,

  setSound: (enabled) => set({ isSoundEnabled: enabled }),
  setEntSound: (enabled) => set({ isEntSoundEnabled: enabled }), // 수정됨

  onSound: () => set({ isSoundEnabled: true }),
  offSound: () => set({ isSoundEnabled: false }),
  onEntSound: () => set({ isEntSoundEnabled: true }),
  offEntSound: () => set({ isEntSoundEnabled: false }),

  toggleSound: () =>
    set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  toggleEntSound: () =>
    set((state) => ({ isEntSoundEnabled: !state.isEntSoundEnabled })),
}));

export default useSoundStore;
