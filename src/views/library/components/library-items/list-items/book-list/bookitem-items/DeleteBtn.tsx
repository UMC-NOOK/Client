import trashcan from '../../../../../../../assets/button/library/delete.png';
import useDeleteBook from '../../../../../hooks/useMutation/library-mutation/useDeleteBook';

const DeleteBtn = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <img
        src={trashcan}
        alt="삭제 버튼 로고"
        className="w-8 h-9 text-[rgba(241,73,75,1)] max-w-[16px] max-h-[18px] object-contain"
      />
      <span className="text-sm font-normal text-[rgba(241,73,75,1)] pt-0.1">
        삭제
      </span>
    </div>
  );
};

export default DeleteBtn;
