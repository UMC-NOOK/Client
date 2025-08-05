import { useState, useRef, useEffect } from 'react';

import chat_send_btn from '/src/assets/button/read-note-edit/chat-send-button.svg';
import chat_send_disable_btn from '/src/assets/button/read-note-edit/chat-send-disable-button.svg';
import nook_chat from '/src/assets/button/read-note-edit/nook-chat.svg';

const NookChat = () => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이 초기화
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`; // 최대 160px
    }
  }, [value]);
  return (
    <div className="flex flex-col items-center justify-center w-[372px] h-[600px] rounded-[20px] bg-[rgba(66,60,53,0.5)] px-5 pb-4">
      <div className="w-full px-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <NookSay message="엄마의 행동을 보며 떠오른 기억이나, 현실에서 비슷한 감정을 느꼈던 경험이 있을까요?" />
        <UserSay message="경험은 없지만, 이것이 단지 한 가정의 이야기가 아니라 오랫동안 이어져 온 가부장적인 사회 구조에 균열이 생기는 순간처럼 다가왔어요." />
        <NookSay message="엄마의 행동을 보며 떠오른 기억이나, 현실에서 비슷한 감정을 느꼈던 경험이 있을까요?" />
        <UserSay message="경험은 없지만, 이것이 단지 한 가정의 이야기가 아니라 오랫동안 이어져 온 가부장적인 사회 구조에 균열이 생기는 순간처럼 다가왔어요." />
        <NookSay message="엄마의 행동을 보며 떠오른 기억이나, 현실에서 비슷한 감정을 느꼈던 경험이 있을까요?" />
        <UserSay message="경험은 없지만, 이것이 단지 한 가정의 이야기가 아니라 오랫동안 이어져 온 가부장적인 사회 구조에 균열이 생기는 순간처럼 다가왔어요." />
      </div>
      <div className="w-[352px] flex flex-col gap-5 bg-nook-br-100 rounded-[14px] px-10 py-5  mt-25 self-end">
        <textarea
          ref={textareaRef}
          className="w-full resize-none overflow-auto text-sm outline-none text-black max-h-[87px] bg-transparent text-white text-sm not-italic font-normal placeholder:text-[rgba(255,255,255,0.50)] placeholder:text-sm placeholder:not-italic placeholder:font-normal
          "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="질문에 답하며, 감상을 천천히 정리해보세요."
        />
        <img
          src={value ? chat_send_btn : chat_send_disable_btn}
          alt=""
          className="w-[25px] h-[25px] self-end cursor-pointer"
        />
      </div>
    </div>
  );
};

export default NookChat;

interface NookSayProps {
  message: string;
}

interface UserSayProps {
  message: string;
}

const NookSay = ({ message }: NookSayProps) => {
  return (
    <div className="w-full pr-[21px] mt-7 ">
      <div className="flex flex-col items-start justify-start gap-4 rounded-lg bg-[#423C35] p-7">
        <div className="flex items-start gap-4">
          <img src={nook_chat} alt="" className="w-[14px] h-[14px]" />
          <div className="text-white text-sm not-italic font-normal ">
            AI NOOK CHAT
          </div>
        </div>
        <div className="text-white text-xs not-italic font-normal">
          {message}
        </div>
      </div>
    </div>
  );
};

const UserSay = ({ message }: UserSayProps) => {
  return (
    <div className="w-full pl-[21px] mt-7 ">
      <div className="rounded-lg bg-[#B7D8DA] p-7 text-black text-sm not-italic font-normal">
        {message}
      </div>
    </div>
  );
};
