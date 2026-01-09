import { create } from 'zustand';

interface ModalStore {
  isExitModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;

  setExitModalOpen: (state: boolean) => void;
  setDeleteModalOpen: (state: boolean) => void;
  setEditModalOpen: (state: boolean) => void;

  toggleExitModal: () => void;
  toggleDeleteModal: () => void;
  toggleEditModal: () => void;

  resetAllModals: () => void;
}

const useModalStore = create<ModalStore>((set) => {
  const initialModalState = false;
  const initialExitModalState = false;

  return {
    isExitModalOpen: initialExitModalState,
    isDeleteModalOpen: initialModalState,
    isEditModalOpen: initialModalState,
    openEditModal: () => set({ isEditModalOpen: true }),
    closeEditModal: () => set({ isEditModalOpen: false }),
    setExitModalOpen: (state) => set({ isExitModalOpen: state }),
    setDeleteModalOpen: (state) => set({ isDeleteModalOpen: state }),
    setEditModalOpen: (state) => set({ isEditModalOpen: state }),
    toggleExitModal: () =>
      set((prev) => ({ isExitModalOpen: !prev.isExitModalOpen })),
    toggleDeleteModal: () =>
      set((prev) => ({ isDeleteModalOpen: !prev.isDeleteModalOpen })),
    toggleEditModal: () =>
      set((prev) => ({ isEditModalOpen: !prev.isEditModalOpen })),
    resetAllModals: () =>
      set({
        isExitModalOpen: false,
        isDeleteModalOpen: false,
        isEditModalOpen: false,
      }),
  };
});

export default useModalStore;
