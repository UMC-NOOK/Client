import trashcan from '../../../../../assets/button/library/delete.png';

const DeleteBtn = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <img
        src={trashcan}
        alt="삭제 버튼 로고"
        className="w-12 h-12 max-w-[24px] max-h-[24px] object-contain"
      />
      <span className="text-[1.6rem] font-normal pt-0.1">삭제</span>
    </div>
  );
};

export default DeleteBtn;
