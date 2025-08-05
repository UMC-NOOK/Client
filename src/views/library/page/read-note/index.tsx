import { useState } from 'react';
import chevron_left from '/src/assets/button/read-note-edit/chevron-left.svg';
import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import info_edit_btn from '/src/assets/button/read-note/info-edit-btn.svg';
import read_note_save from '/src/assets/button/read-note/read-note-save.svg';
import read_note_save_btn from '/src/assets/button/read-note/read-note-save-btn.svg';
import quotation_arrow from '/src/assets/button/read-note-edit/quotation-arrow.svg';
import impression_icon from '/src/assets/button/read-note-edit/impression-icon.svg';

const ReadNotePage = () => {
  const [isReadNoteExist, setIsReadNoteExist] = useState(false);
  return (
    <div className="flex items-start justify-center w-full h-full gap-23 mt-20">
      <div className="flex flex-col items-center justify-start w-332">
        <div className="flex w-full h-35 items-center justify-between backdrop-blur-[20px] border-b border-solid border-b-[rgba(85,83,81,1)]">
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
        {isReadNoteExist ? (
          <div className="flex flex-col items-start justify-start w-[634px] h-[478px] gap-7 mt-20 overflow-y-auto  [&::-webkit-scrollbar]:hidden">
            <Phrase
              text="너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다."
              page={1}
            />
            <Impression text="보이지 않지만 분명히 느껴는 감정의 결을 섬세하게 포착한 문장이다. 이해받기 어려운 내면의 진동을 조용히 꺼내 보여주는 듯해 마음에 오래 머문다." />
            <Phrase
              text="시간이 많아지면 생각이 많아지고, 생각이 많아지면 우울이 찾아들기 마련이다."
              page={45}
            />
            <Phrase
              text="너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다. 너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다."
              page={112}
            />
            <Phrase
              text="너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다. 너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다."
              page={112}
            />
            <Phrase
              text="너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다. 너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다."
              page={112}
            />
            <Quotation
              text={[
                '조예은 작가의 『칵테일, 러브, 좀비』는 좀비 아포칼립스 속에서도 사랑과 일상이 존재할 수 있다는 사실을 낯설지만 설득력 있게 보여준다. 현실적인 감정과 비현실적인 상황이 자연스럽게 섞이면서, 오히려 더 진짜 같은 이야기로 다가왔다. 주인공들의 관계는 감정에 휩쓸리기보다 조심스럽게 서로를 알아가는 과정이라 더 인상 깊었다. 좀비보다 더 위협적인 것은 사람들 사이의 오해나 무관심이라는 점도 묵직하게 남는다. 장르적 재미와 감정의 진심이 잘 어우러진, 독특하고도 따뜻한 작품이었다.',
                '좀비로 변한 아버지를 향해 총을 든 엄마의 모습은 충격적이었지만, 동시에 오랜 억압을 스스로 끊어내는 해방의 순간으로 느껴졌다. 침묵 속에 있던 엄마가 주체적으로 행동하는 모습은 가부장적 구조에 균열을 내는 장면처럼 다가왔고, 그 변화가 줄 수 있는 희망을 떠올리게 했다.',
              ]}
            />
          </div>
        ) : (
          <div className="text-[rgba(255,255,255,0.50)] text-center text-base not-italic font-normal flex items-center justify-center w-[634px] h-[478px]">
            작성한 독서 기록이 없습니다.
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-35 relative ">
        <img src={read_note_save} alt="Save" className="w-[290px] h-[516px]" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer">
          <div className="text-[#222020] text-center text-xs not-italic font-normal">
            독서 카드 만들고
          </div>
          <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#2c251d]">
            <img src={read_note_save_btn} alt="" className="w-9 h-9" />
            <div className="text-white text-xs not-italic font-semibold">
              이미지로 저장하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadNotePage;

const Phrase = ({ text, page }: { text: string; page: number }) => {
  return (
    <div className="w-full flex items-start justify-start gap-10 text-white text-sm not-italic font-normal">
      <div className="w-20 ">P.{page}</div>
      <div className="w-full">{text}</div>
    </div>
  );
};

const Impression = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex items-start justify-start gap-10 text-white text-sm not-italic font-normal pl-30">
      <img src={quotation_arrow} alt="" className="w-10 h-10" />
      <div className="w-full">{text}</div>
    </div>
  );
};

const Quotation = ({ text }: { text: string[] }) => {
  return (
    <div className="w-full flex items-start justify-start gap-10 text-white text-sm not-italic font-normal">
      <img
        src={impression_icon}
        alt="impression"
        className="w-[33px] h-[39px]"
      />
      <div className="w-full flex flex-col gap-7">
        {text.map((line, index) => (
          <p key={index} className="mb-2">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
