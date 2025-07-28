import { useState } from 'react';

import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import quotation_btn from '/src/assets/button/read-note-edit/quotation-btn.svg';

interface PhraseProps {
  page?: number | string;
  text: string;
}

const Phrase = ({ page = '-', text }: PhraseProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="flex w-full items-center justify-start gap-8 mt-7 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[59px] text-white text-center text-sm not-italic font-normal leading-[22px]">
        P. {page}
      </div>
      <div className=" flex items-center justify-center">
        <div className="w-3 h-[86px] shrink-0 rounded-[8px_0_0_8px] bg-nook-br-100"></div>
        <div
          className={` w-[723px] h-[86px] px-7 py-9 rounded-[0_8px_8px_0] bg-[rgba(43,34,23,0.5)] text-white text-sm not-italic font-normal leading-[25px] flex items-center justify-start`}
        >
          {text}
        </div>
        {isHovered ? (
          <div className="absolute flex gap-2 items-center justify-center right-0 top-0">
            <img src={edit_btn} alt="Edit" className="w-14 h-14" />
            <img src={quotation_btn} alt="Quote" className="w-14 h-14" />{' '}
            <img src={delete_btn} alt="Delete" className="w-14 h-14" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Phrase;
