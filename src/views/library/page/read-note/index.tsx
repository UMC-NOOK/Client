import React from 'react';
import chevron_left from '/src/assets/button/read-note-edit/chevron-left.svg';
import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import info_edit_btn from '/src/assets/button/read-note/info-edit-btn.svg';
import read_note_save from '/src/assets/button/read-note/read-note-save.svg';

const ReadNotePage = () => {
  return (
    <div className="flex items-start justify-center w-full h-full gap-23 mt-20">
      <div className="flex flex-col items-center justify-center w-332 h-35 gap-22">
        <div className="flex w-full items-center justify-between backdrop-blur-[20px] border-b-[rgba(85,83,81,0.00)] border-b border-solid">
          <div className="flex items-center gap-20">
            <img src={chevron_left} alt="chevron left" className="h-10 w-10" />
            <div className="flex items-end gap-7">
              <span className="text-white text-[22px] not-italic font-semibold leading-[25px]">
                칵테일, 러브, 좀비
              </span>
              <p className="text-white text-xs not-italic font-normal">
                조예은
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={edit_btn} alt="Edit" className="w-17 h-17" />
            <img src={info_edit_btn} alt="Info Edit" className="w-17 h-17" />
            <img src={delete_btn} alt="Delete" className="w-17 h-17" />
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-center mt-35">
        <img src={read_note_save} alt="Save" className="w-[290px] h-[516px]" />
      </div>
    </div>
  );
};

export default ReadNotePage;
