interface DeleteBtnProps {
  usage?:
    | 'library'
    | 'book-info'
    | 'read-note-edit-quotation'
    | 'read-note-edit-phrase'
    | 'read-note-edit-impression'
    | 'read-note';
  onDelete: () => void;
  closeModal: () => void;
}

const DeleteBtn = ({ onDelete, closeModal, usage }: DeleteBtnProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div
        className={`${usage == 'book-info' ? 'w-[449px] h-[172px]' : ' w-[44.9rem] h-[19.8rem] '} flex flex-col justify-center items-center bg-[rgba(45,40,34,1)] rounded-2xl p-6 relative`}
      >
        {usage === 'library' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-2">
              서재에서 삭제하시겠습니까?
            </p>
            <p className="text-md font-normal text-nook-100 mb-6">
              작성한 도서 기록도 함께 삭제됩니다.
            </p>
          </>
        ) : usage === 'read-note-edit-quotation' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-2">
              이 인용을 삭제하시겠습니까?
            </p>
          </>
        ) : usage === 'read-note-edit-phrase' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-2">
              이 문장을 삭제하시겠습니까?
            </p>
          </>
        ) : usage === 'read-note-edit-impression' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-2">
              이 감상을 삭제하시겠습니까?
            </p>
          </>
        ) : usage === 'read-note' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-2">
              서재에서 삭제하시겠습니까?
            </p>
            <p className="text-md font-normal text-nook-100 mb-6">
              작성한 독서 기록도 함께 삭제됩니다.
            </p>
          </>
        ) : usage == 'book-info' ? (
          <>
            <p className="text-md font-normal text-nook-100 mb-6">
              리뷰를 삭제하시겠습니까?
            </p>
          </>
        ) : (
          <></>
        )}

        <div className="absolute bottom-10 right-10 flex space-x-4">
          <button
            onClick={onDelete}
            className="w-34 h-15 bg-nook-action-red rounded-[4px] text-[16px] font-semibold text-black"
          >
            삭제
          </button>
          <button
            onClick={closeModal}
            className="w-34 h-15 bg-transparent rounded-[4px] border-[1px] border-nook-300 text-[16px] text-nook-300 font-semibold"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBtn;
