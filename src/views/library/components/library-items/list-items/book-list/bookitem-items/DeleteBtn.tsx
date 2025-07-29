import trashcan from '../../../../../../../assets/button/library/delete.png';

const DeleteBtn = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <img
        src={trashcan}
        alt="삭제 버튼 로고"
        className="w-8 h-8 max-w-[16px] max-h-[16px] object-contain"
      />
      <span className="text-sm font-normal pt-0.1">삭제</span>
    </div>
  );
};

export default DeleteBtn;
