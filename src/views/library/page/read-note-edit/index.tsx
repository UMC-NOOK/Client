// librarys
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// imgs
import chevron_left from '/src/assets/button/read-note-edit/chevron-left.svg';
import nook_chat from '/src/assets/button/read-note-edit/nook-chat.svg';
import arroow_redo from '/src/assets/button/read-note-edit/arrow-redo-outline.svg';
import send_btn from '/src/assets/button/read-note-edit/send-button.svg';
import send_disable_btn from '/src/assets/button/read-note-edit/send-disable-button.svg';
import quotation_arrow from '/src/assets/button/read-note-edit/quotation-arrow.svg';

// components
import Toggle from '../../components/read-note-edit/toggle';
import Phrase from '../../components/read-note-edit/phrase';
import Quotation from '../../components/read-note-edit/quotation';
import Impression from '../../components/read-note-edit/impression';
import NookChat from '../../components/read-note-edit/nook-chat';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';

// hooks
import useGetSentenceList from '../../hooks/useQuery/read-note/useGetSentenceList';
import useDeleteSentence from '../../hooks/useMutation/read-note-edit/useDeleteSentence';

const ReadNoteEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [clickPhraseId, setClickPhraseId] = useState<number>();

  const { data: sentenceList } = useGetSentenceList(location.state.bookId);

  // textArea 로직
  type textContentType = 'phrase' | 'impression' | 'quotation';
  const [textContent, setTextContent] = useState<textContentType>('phrase');
  const [placeholderText, setPlaceholderText] = useState(
    '책에서 수집하고 싶은 문장을 작성해보세요.',
  );
  const [selectedPhrasePage, setSelectedPhrasePage] = useState<
    number | string | null
  >(null);
  const [textAreaContent, setTextAreaContent] = useState('');
  useEffect(() => {
    if (textContent === 'phrase') {
      setPlaceholderText('책에서 수집하고 싶은 문장을 작성해보세요.');
    } else if (textContent === 'impression') {
      setPlaceholderText(
        '이 책에 대한 감상을 남겨보세요. 수집한 문장을 선택해 인용할 수도 있습니다.',
      );
    } else {
      console.log('selectedPhrasePage', selectedPhrasePage);
      if (selectedPhrasePage == null) {
        setPlaceholderText('- 페이지의 문장을 인용한 감상을 남겨보세요.');
      } else {
        setPlaceholderText(
          `${selectedPhrasePage} 페이지의 문장을 인용한 감상을 남겨보세요.`,
        );
      }
    }
  }, [textContent, selectedPhrasePage]);

  const phrases = useMemo(
    () =>
      (sentenceList?.result ?? []).map((s) => ({
        phraseId: s.recordId,
        page: s.page ? Number(s.page) : null,
        text: s.content,
      })),
    [sentenceList],
  );

  const quotations = useMemo(
    () =>
      (sentenceList?.result ?? []).flatMap((s) =>
        (s.comments ?? []).map((c) => ({
          quotationId: c.commentId,
          phraseId: s.recordId,
          text: c.content,
        })),
      ),
    [sentenceList],
  );

  const impressions = useMemo(
    () =>
      (sentenceList?.result ?? [])
        .filter((s) => s.recordType === 'COMMENTARY')
        .map((s) => ({
          impressionId: s.recordId,
          text: s.content,
        })),
    [sentenceList],
  );

  // 삭제 로직
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  type DeleteOption =
    | 'read-note-edit-phrase'
    | 'read-note-edit-impression'
    | 'read-note-edit-quotation';
  const [deleteOption, setDeleteOption] = useState<DeleteOption>(
    'read-note-edit-phrase',
  );
  const modalHandler = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // nook chat 로직
  const [isNookChatOpen, setIsNookChatOpen] = useState(false);
  const toggleNookChat = () => {
    setIsNookChatOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-350">
      {isDeleteModalOpen && (
        <DeleteBtn
          usage={deleteOption}
          onDelete={handleDelete}
          closeModal={modalHandler}
        />
      )}
      <div className="flex flex-col items-center justify-center w-[1044px] h-full pt-30 pb-[40px] box-border">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-20">
            <img
              src={chevron_left}
              alt="chevron left"
              className="h-10 w-10"
              onClick={() => navigate(-1)}
            />
            <div className="flex items-end gap-7">
              <span className="text-white text-[22px] not-italic font-semibold leading-[25px]">
                {location.state?.title}
              </span>
              <p className="text-white text-xs not-italic font-normal">
                {location.state?.author}
              </p>
            </div>
          </div>
          <img
            src={nook_chat}
            alt="nook chat"
            className="h-16 w-16"
            onClick={toggleNookChat}
          />
        </div>
        <div
          className={`w-full h-[600px] flex flex-col justify-center ${isNookChatOpen ? 'items-start' : 'items-center'}`}
        >
          <hr
            className={`${isNookChatOpen ? 'w-[661px]' : 'w-full'} h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600/70 mt-14`}
          />
          <div
            className={`w-full h-[600px] flex items-center gap-9 ${isNookChatOpen ? 'justify-between' : 'justify-center'}`}
          >
            <div
              className={`flex flex-col items-center justify-between h-full  ${isNookChatOpen ? 'w-[650px]' : 'w-450'}`}
            >
              <div
                className={`flex flex-col items-center justify-start gap-4 box-border overflow-y-auto [&::-webkit-scrollbar]:hidden mb-17 w-full ${isNookChatOpen ? '' : sentenceList?.code == 'SUCCESS-204' ? 'mt-[200px]' : 'ml-40 '}`}
              >
                {phrases.length ? (
                  phrases.map((phrase) => {
                    const matching = quotations.filter(
                      (q) => q.phraseId === phrase.phraseId,
                    );
                    return (
                      <div
                        key={phrase.phraseId}
                        className="flex flex-col items-start w-full"
                      >
                        <Phrase
                          page={phrase.page ?? undefined}
                          text={phrase.text}
                          phraseId={phrase.phraseId}
                          setSelectedPhrasePage={setSelectedPhrasePage}
                          setTextContent={setTextContent}
                          clickPhrase={() => {
                            setClickPhraseId(phrase.phraseId);
                            setDeleteOption('read-note-edit-phrase');
                          }}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          isNookChatOpen={isNookChatOpen}
                        />
                        {matching.map((q) => (
                          <Quotation
                            key={q.quotationId}
                            text={q.text}
                            clickPhrase={() => {
                              setClickPhraseId(phrase.phraseId);
                              setDeleteOption('read-note-edit-quotation');
                            }}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            isNookChatOpen={isNookChatOpen}
                          />
                        ))}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-normal leading-[22px]">
                    작성한 독서 기록이 없습니다.
                  </div>
                )}

                {impressions.length > 0 &&
                  impressions.map((it) => (
                    <Impression
                      key={it.impressionId}
                      text={it.text}
                      clickImpression={() => {
                        setClickPhraseId(it.impressionId);
                        setDeleteOption('read-note-edit-impression');
                      }}
                      setIsDeleteModalOpen={setIsDeleteModalOpen}
                      isNookChatOpen={isNookChatOpen}
                    />
                  ))}
              </div>
              <div className={` ${isNookChatOpen ? 'w-[654px]' : 'w-402'}`}>
                {textContent === 'phrase' ? (
                  <div className="flex w-full h-[38px] items-center gap-3 shrink-0 border px-[27px] py-[9px] rounded-[14px_14px_0_0] border-solid border-nook-br-100 bg-[#2B2217]">
                    <img
                      src={arroow_redo}
                      alt=""
                      className="h-[13px] w-[13px]"
                    />
                    <input
                      type="number"
                      placeholder="페이지를 입력해주세요 (숫자만 입력)"
                      className="no-spinner w-full text-white text-xs not-italic font-normal leading-5 bg-transparent outline-none placeholder:text-[#95908a] placeholder:text-xs placeholder:not-italic placeholder:font-normal placeholder:leading-5"
                    />
                  </div>
                ) : (
                  ''
                )}

                <div
                  className={`flex w-full flex-col items-start gap-3 shrink-0 border px-[27px] py-[9px]  border-solid border-nook-br-100 px-[27px] py-[18px] ${textContent === 'phrase' ? 'h-[137px] rounded-[0_0_14px_14px]' : 'h-[175px] rounded-[14px]'}`}
                >
                  {textContent === 'quotation' ? (
                    <div className="flex items-start justify-start gap-3 w-full h-full">
                      <img
                        src={quotation_arrow}
                        alt="Quote"
                        className="w-10 h-10 mr-3"
                      />
                      <textarea
                        name=""
                        id="phraseTextArea"
                        placeholder={placeholderText}
                        className="w-full h-full text-white text-sm not-italic font-normal leading-11 resize-none focus:outline-none placeholder:text-[#95908a] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-11"
                        value={textAreaContent}
                        onChange={(e) => {
                          setTextContent('quotation');
                          setTextAreaContent(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  ) : (
                    <textarea
                      name=""
                      id="phraseTextArea"
                      placeholder={placeholderText}
                      className="w-full h-full text-white text-sm not-italic font-normal leading-11 resize-none focus:outline-none placeholder:text-[#95908a] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-11"
                      value={textAreaContent}
                      onChange={(e) => {
                        setTextAreaContent(e.target.value);
                      }}
                    ></textarea>
                  )}

                  <div className="flex items-center justify-end gap-4 w-full">
                    <Toggle
                      isPhrase={textContent === 'phrase'}
                      setIsPhrase={setTextContent}
                      onClick={() => {
                        setTextAreaContent('');
                      }}
                    />
                    <img
                      src={
                        textAreaContent.trim() === ''
                          ? send_disable_btn
                          : send_btn
                      }
                      alt="send"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
              </div>
            </div>
            {isNookChatOpen && <NookChat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadNoteEditPage;
