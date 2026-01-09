import { useState, useRef } from 'react';

// imgs
import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import send_btn from '/src/assets/button/read-note-edit/send-button.svg';
import impression_icon from '/src/assets/button/read-note-edit/impression-icon.svg';

// hooks
import usePutComment from '../../hooks/useMutation/read-note-edit/usePutComment';
interface ImpressionProps {
  text: string;
  recordId: number;
  clickImpression: () => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void; // Optional prop for delete modal
  isNookChatOpen: boolean;
}

const Impression = ({
  text,
  recordId,
  clickImpression,
  setIsDeleteModalOpen,
  isNookChatOpen, // Optional prop for nook chat state
}: ImpressionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);

  const { mutate: putComment } = usePutComment(recordId);

  const taRef = useRef<HTMLTextAreaElement>(null);

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
    clickImpression();
  };
  const handleSubmit = () => {
    if (textValue.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    putComment(textValue);
    setIsEditing(false);
    clickImpression();
    setTimeout(() => taRef.current?.focus(), 0);
  };

  // 삭제로직
  const handleDelete = () => {
    // 삭제 로직을 여기에 구현
    console.log('삭제되었습니다.');
    clickImpression();
    setIsDeleteModalOpen(true); // Open delete modal
  };

  const handleTextAreaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key !== 'Enter') return;

    // 한글 입력 조합 중(IME) Enter는 무시
    // (React 17+에선 e.nativeEvent.isComposing, 일부 브라우저는 e.isComposing)
    // @ts-ignore
    if (e.isComposing || (e.nativeEvent && (e.nativeEvent as any).isComposing))
      return;

    if (e.shiftKey) {
      // Shift+Enter는 기본 동작(줄바꿈) 유지
      return;
    }

    // Enter 단독: 줄바꿈 막고 등록
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div
      className="flex w-full items-center justify-start gap-8 mt-7 relative"
      onMouseEnter={isNookChatOpen ? undefined : handleMouseEnter}
      onMouseLeave={isNookChatOpen ? undefined : handleMouseLeave}
    >
      <div
        className={`px-3 text-white text-center text-sm not-italic font-normal leading-[22px] flex items-center justify-center w-[59px] h-[59px]`}
      >
        <img
          src={impression_icon}
          alt="impression"
          className="w-[33px] h-[39px]"
        />
      </div>
      {isEditing ? (
        <div className="flex w-[729px] h-[144px] flex-col items-start gap-2.5 shrink-0 border px-7 py-9 rounded-[8px] border-solid border-nook-br-100 ">
          <textarea
            ref={taRef}
            onKeyDown={handleTextAreaKeyDown}
            name="editImpression"
            id="editImpression"
            className="no-spinner w-full h-full bg-transparent border-none outline-none text-white text-sm not-italic font-normal leading-[22px] resize-none"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <div className="flex items-center justify-end gap-4 w-full">
            <img
              src={send_btn}
              alt="Send"
              className="w-12 h-12"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className=" flex items-stretch justify-center">
          <div className="w-3 shrink-0 rounded-[8px_0_0_8px] bg-nook-secondaey"></div>
          <div
            className={` px-7 py-9 rounded-[0_8px_8px_0] bg-[#2B2217] text-white text-sm not-italic font-normal leading-[25px] flex items-center justify-start ${isNookChatOpen ? 'w-[569px]' : 'w-[723px]'}`}
          >
            {textValue}
          </div>
          {isHovered ? (
            <div className="absolute flex gap-2 items-center justify-center right-16 top-0">
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

export default Impression;
