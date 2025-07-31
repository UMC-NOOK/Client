import { useState } from 'react';
import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import quotation_arrow from '/src/assets/button/read-note-edit/quotation-arrow.svg';
import send_btn from '/src/assets/button/read-note-edit/send-button.svg';

interface QuotationProps {
  text: string;
  clickPhrase: () => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

const Quotation = ({
  text,
  clickPhrase,
  setIsDeleteModalOpen,
}: QuotationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);

  // hover 로직
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 수정 로직
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSend = () => {
    setIsEditing(false);
  };

  // 삭제로직
  const handleDelete = () => {
    // 삭제 로직을 여기에 구현
    console.log('삭제되었습니다.');
    clickPhrase();
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className="flex w-full items-start justify-start gap-8 mt-7 relative ml-43"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center">
        <img src={quotation_arrow} alt="Quote" className="w-10 h-10" />
      </div>
      {isEditing ? (
        <div className="flex w-[683px] h-64 flex-col items-start gap-2.5 shrink-0 border px-7 py-9 rounded-lg border-solid border-nook-br-100 ">
          <textarea
            name="editPhrase"
            id="editPhrase"
            className="no-spinner w-full h-full bg-transparent border-none outline-none text-white text-sm not-italic font-normal leading-[22px] resize-none"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <div className="flex items-center justify-end gap-4 w-full">
            <img
              src={send_btn}
              alt="Send"
              className="w-12 h-12"
              onClick={handleSend}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-3 h-[86px] shrink-0 rounded-[8px_0_0_8px] bg-nook-secondaey"></div>
          <div
            className={` w-[677px] h-[86px] px-7 py-9 rounded-[0_8px_8px_0] bg-[rgba(43,34,23,0.5)] text-white text-sm not-italic font-normal leading-[25px] flex items-center justify-start`}
          >
            {textValue}
          </div>
          {isHovered ? (
            <div className="absolute flex gap-2 items-center justify-center right-59 top-0">
              <img
                src={edit_btn}
                alt="Edit"
                className="w-14 h-14"
                onClick={handleEdit}
              />
              <img
                src={delete_btn}
                alt="Delete"
                className="w-14 h-14"
                onClick={handleDelete}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Quotation;
