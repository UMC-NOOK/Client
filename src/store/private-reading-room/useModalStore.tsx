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
}

const useModalStore = create<ModalStore>((set) => {
  const initialModalState = false;

  return {
    isExitModalOpen: initialModalState,
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
  };
});

export default useModalStore;
