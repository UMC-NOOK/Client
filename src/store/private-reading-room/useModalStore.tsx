import { create } from 'zustand';

interface ModalStore {
  isExitModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setExitModalOpen: (state: boolean) => void;
  setDeleteModalOpen: (state: boolean) => void;
  toggleExitModal: () => void;
  toggleDeleteModal: () => void;
}

const useModalStore = create<ModalStore>((set) => {
  const initialModalState = false;

  return {
    isExitModalOpen: initialModalState,
    isDeleteModalOpen: initialModalState,
    setExitModalOpen: (state) => set({ isExitModalOpen: state }),
    setDeleteModalOpen: (state) => set({ isDeleteModalOpen: state }),
    toggleExitModal: () =>
      set((prev) => ({ isExitModalOpen: !prev.isExitModalOpen })),
    toggleDeleteModal: () =>
      set((prev) => ({ isDeleteModalOpen: !prev.isDeleteModalOpen })),
  };
});

export default useModalStore;
