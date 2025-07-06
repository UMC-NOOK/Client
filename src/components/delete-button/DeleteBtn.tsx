interface DeleteBtnProps {
  onDelete: () => void;
  closeModal: () => void;
}

const DeleteBtn = ({ onDelete, closeModal }: DeleteBtnProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[449px] h-[198px] flex flex-col justify-center items-center bg-nook-500 rounded-2xl p-6 relative">
        <p className="text-lg font-normal text-nook-100 mb-2">
          서재에서 삭제하시겠습니까?
        </p>
        <p className="text-lg font-normal text-nook-100 mb-6">
          작성한 도서 기록도 함께 삭제됩니다.
        </p>
        <div className="absolute bottom-6 right-6 flex space-x-4">
          <button
            onClick={onDelete}
            className="w-[68px] h-[30px] bg-nook-action-red rounded-md text-sm font-semibold text-black"
          >
            삭제
          </button>
          <button
            onClick={closeModal}
            className="w-[68px] h-[30px] bg-transparent rounded-md border-2 border-nook-300 text-sm text-nook-300 font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBtn;
