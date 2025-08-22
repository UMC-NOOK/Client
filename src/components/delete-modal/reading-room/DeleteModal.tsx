interface DeleteBtnProps {
  usage?: 'exit' | 'delete';
  onDelete?: () => void;
  closeModal?: () => void;
}

const DeleteBtn = ({ onDelete, closeModal, usage }: DeleteBtnProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="w-[44.9rem] h-[19.8rem] flex flex-col justify-center items-center bg-[rgba(45,40,34,1)] rounded-2xl p-6 relative">
        <p className="text-md font-normal text-nook-100 mb-2">
          이 리딩룸을 삭제하시겠습니까?
        </p>
        <p className="text-md font-normal text-nook-100 mb-6">
          삭제한 리딩룸은 복구할 수 없습니다.
        </p>

        <div className="absolute bottom-10 right-10 flex space-x-4">
          <button
            onClick={onDelete}
            className="w-34 h-15 bg-nook-action-red rounded-[4px] text-sm font-semibold text-black"
          >
            삭제
          </button>
          <button
            onClick={closeModal}
            className="w-34 h-15 bg-transparent rounded-[4px] border-1 border-nook-300 text-sm text-nook-300 font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBtn;
