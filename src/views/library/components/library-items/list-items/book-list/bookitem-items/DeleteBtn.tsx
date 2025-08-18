import trashcan from '../../../../../../../assets/button/library/delete.png';
import useDeleteBook from '../../../../../hooks/useMutation/library-mutation/useDeleteBook';

const DeleteBtn = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <img
        src={trashcan}
        alt="삭제 버튼 로고"
        className="w-9 h-9 max-w-[18px] max-h-[18px] object-contain"
      />
      <span className="text-sm font-normal pt-0.1">삭제</span>
    </div>
  );
};

export default DeleteBtn;
