import { useState, useRef, useEffect } from 'react';

// imgs
import chat_send_btn from '/src/assets/button/read-note-edit/chat-send-button.svg';
import chat_send_disable_btn from '/src/assets/button/read-note-edit/chat-send-disable-button.svg';
import nook_chat from '/src/assets/button/read-note-edit/nook-chat.svg';
import divide_line from '/src/assets/button/read-note-edit/divide-line.svg';

// hooks
import useGetNookChat from '../../hooks/useQuery/read-note-edit-query/useGetNookChat';
import usePostNookChatSave from '../../hooks/useMutation/read-note-edit/usePostNookChatSave';
import usePostNookChat from '../../hooks/useMutation/read-note-edit/usePostNookChat';

// interfaces
interface NookChatProps {
  bookId: number;
}

const NookChat = ({ bookId }: NookChatProps) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: nookChatData } = useGetNookChat(bookId);
  const { mutate: postNookChat } = usePostNookChat(bookId);
  const { mutate: postNookChatSave } = usePostNookChatSave(bookId);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이 초기화
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`; // 최대 160px
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-between w-[372px] h-[600px] rounded-[20px] bg-[rgba(66,60,53,0.5)] px-5 pb-4">
      <div className="w-full px-3 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <NookSay message="독서 후 기억에 남는 장면이나 떠오른 감상이 있나요?" />
        {nookChatData?.result.map((chat) => (
          <div key={chat.chatRecordId} className="mb-4">
            {chat.chatType === 'SYSTEM' ? (
              <NookSay message={chat.message} />
            ) : chat.chatType === 'USER' ? (
              <UserSay message={chat.message} />
            ) : (
              <>
                <NookSay message="대화 내용에 기반해 감상문을 생성합니다." />
                <img src={divide_line} alt="" className="w-full my-[18.5px]" />
                <div className="w-[332px] text-white text-sm not-italic font-normal">
                  {chat.message}
                </div>
                <div
                  className="flex w-[180px] h-10 justify-center items-center gap-2.5 shrink-0 border p-2.5 rounded-lg border-solid border-[#7ABFC9] text-[#7ABFC9] text-sm not-italic font-semibold"
                  onClick={() => postNookChatSave(chat.chatRecordId)}
                >
                  내 감상으로 붙여넣기
                </div>
              </>
            )}
          </div>
        ))}
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
          onClick={() => {
            if (value.trim()) {
              postNookChat(value);
              setValue('');
            }
          }}
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
