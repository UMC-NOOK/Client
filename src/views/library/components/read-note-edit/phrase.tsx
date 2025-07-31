import { useState } from 'react';

import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import quotation_btn from '/src/assets/button/read-note-edit/quotation-btn.svg';
import send_btn from '/src/assets/button/read-note-edit/send-button.svg';

type textContentType = 'phrase' | 'impression' | 'quotation';
interface PhraseProps {
  page?: number | string;
  text: string;
  setSelectedPhrasePage: (page: number | string | null) => void;
  setTextContent: (content: textContentType) => void;
  clickPhrase: () => void;
}

const Phrase = ({
  page = '-',
  text,
  setSelectedPhrasePage,
  setTextContent,
  clickPhrase,
}: PhraseProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const [pageValue, setPageValue] = useState<number | string>(page);

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
    clickPhrase();
  };
  const handleSend = () => {
    setIsEditing(false);
    clickPhrase();
  };

  // 인용 로직
  const handleQuote = () => {
    if (pageValue !== '-') {
      setSelectedPhrasePage(Number(pageValue));
    } else {
      setSelectedPhrasePage('-');
    }
    setTextContent('quotation');
    clickPhrase();
  };

  return (
    <div
      className="flex w-full items-center justify-start gap-8 mt-7 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`px-3 text-white text-center text-sm not-italic font-normal leading-[22px] flex items-center justify-center ${isEditing ? 'rounded-[8px] bg-nook-br-100 w-[50px] h-[50px] ml-[8px] mr-[3px]' : 'w-[59px] h-[59px] '}`}
      >
        {isEditing ? 'P. ' : `P. ${pageValue}`}
        {isEditing && (
          <input
            type="number"
            className="no-spinner w-full h-full bg-transparent border-none outline-none text-white text-sm not-italic font-normal leading-[22px] ml-2 "
            value={pageValue}
            onChange={(e) => setPageValue(e.target.value)}
          />
        )}
      </div>
      {isEditing ? (
        <div className="flex w-[729px] h-64 flex-col items-start gap-2.5 shrink-0 border px-7 py-9 rounded-lg border-solid border-nook-br-100 ">
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
        <div className=" flex items-center justify-center">
          <div className="w-3 h-[86px] shrink-0 rounded-[8px_0_0_8px] bg-nook-br-100"></div>
          <div
            className={` w-[723px] h-[86px] px-7 py-9 rounded-[0_8px_8px_0] bg-[rgba(43,34,23,0.5)] text-white text-sm not-italic font-normal leading-[25px] flex items-center justify-start`}
          >
            {textValue}
          </div>
          {isHovered ? (
            <div className="absolute flex gap-2 items-center justify-center right-0 top-0">
              <img
                src={edit_btn}
                alt="Edit"
                className="w-14 h-14"
                onClick={handleEdit}
              />
              <img
                src={quotation_btn}
                alt="Quote"
                className="w-14 h-14"
                onClick={handleQuote}
              />
              <img src={delete_btn} alt="Delete" className="w-14 h-14" />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Phrase;
