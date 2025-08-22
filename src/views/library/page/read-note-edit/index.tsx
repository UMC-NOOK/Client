// librarys
import { useState, useEffect, useMemo, useRef } from 'react';
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
import useDeleteComment from '../../hooks/useMutation/read-note-edit/useDeleteComment';
import usePostComment from '../../hooks/useMutation/read-note-edit/usePostComment';
import usePostSentence from '../../hooks/useMutation/read-note-edit/usePostSentence';

const ReadNoteEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const taRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (textAreaContent.trim() === '') return;

    if (textContent === 'phrase') {
      postSentence({ content: textAreaContent, page: pageValue ?? null });
    } else if (textContent === 'impression') {
      postComment({ content: textAreaContent, parentRecordId: null });
    } else if (textContent === 'quotation') {
      postComment({
        content: textAreaContent,
        parentRecordId: clickPhraseId ?? null,
      });
    }

    setTextAreaContent('');
    setPageValue('');
    setTextContent('phrase');

    // UX: 전송 후 포커스 유지
    setTimeout(() => taRef.current?.focus(), 0);
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

  // textArea 로직
  type textContentType = 'phrase' | 'impression' | 'quotation';
  const [clickPhraseId, setClickPhraseId] = useState<number>();
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

  const { data: sentenceList } = useGetSentenceList(location.state.bookId);
  const { mutate: deleteSentence } = useDeleteSentence(clickPhraseId ?? -1);
  const { mutate: deleteComment } = useDeleteComment(clickPhraseId ?? -1);
  const { mutate: postComment } = usePostComment(location.state.bookId);
  const { mutate: postSentence } = usePostSentence(location.state.bookId);

  const [textValue, setTextValue] = useState();
  const [pageValue, setPageValue] = useState<string | null>('');

  const phrases = useMemo(
    () =>
      (sentenceList?.result ?? [])
        .filter((s) => s.recordType === 'RECORD')
        .map((s) => ({
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
    if (deleteOption === 'read-note-edit-phrase') {
      deleteSentence();
    } else if (deleteOption === 'read-note-edit-impression') {
      deleteComment();
    } else if (deleteOption === 'read-note-edit-quotation') {
      deleteComment();
    }
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
              <p className="text-white text-xs not-italic font-[300]">
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
            className={`${isNookChatOpen ? 'w-[661px]' : 'w-full'} h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600/70 mt-14 mb-7`}
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
                {sentenceList?.result?.length!! > 0 ? (
                  <>
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
                              handleTextAreaKeyDown={handleTextAreaKeyDown}
                            />
                            {matching.map((q) => (
                              <Quotation
                                key={q.quotationId}
                                text={q.text}
                                quotationId={q.quotationId}
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
                      <></>
                    )}

                    {impressions.length > 0 &&
                      impressions.map((it) => (
                        <Impression
                          key={it.impressionId}
                          text={it.text}
                          recordId={it.impressionId}
                          clickImpression={() => {
                            setClickPhraseId(it.impressionId);
                            setDeleteOption('read-note-edit-impression');
                          }}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          isNookChatOpen={isNookChatOpen}
                        />
                      ))}
                  </>
                ) : (
                  <div className="text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-[300] leading-[22px]">
                    작성한 독서 기록이 없습니다.
                  </div>
                )}
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
                      value={pageValue ?? ''}
                      placeholder="페이지를 입력해주세요 (숫자만 입력)"
                      className="no-spinner w-full text-white text-xs not-italic font-[300] leading-5 bg-transparent outline-none placeholder:text-[#95908a] placeholder:text-xs placeholder:not-italic placeholder:font-[300] placeholder:leading-5"
                      onFocus={(e) => (e.currentTarget.placeholder = '')}
                      onBlur={(e) =>
                        (e.currentTarget.placeholder =
                          '페이지를 입력해주세요 (숫자만 입력)')
                      }
                      onChange={(e) => {
                        setPageValue(e.target.value || null);
                      }}
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
                        ref={taRef}
                        onKeyDown={handleTextAreaKeyDown}
                        name=""
                        id="phraseTextArea"
                        placeholder={placeholderText}
                        className="w-full h-full text-white text-sm not-italic font-[300] leading-11 resize-none focus:outline-none placeholder:text-[#95908a] placeholder:text-sm placeholder:not-italic placeholder:font-[300] placeholder:leading-11"
                        value={textAreaContent}
                        onFocus={(e) => (e.currentTarget.placeholder = '')}
                        onBlur={(e) =>
                          (e.currentTarget.placeholder = placeholderText)
                        }
                        onChange={(e) => {
                          setTextContent('quotation');
                          setTextAreaContent(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  ) : (
                    <textarea
                      ref={taRef}
                      onKeyDown={handleTextAreaKeyDown}
                      name=""
                      id="phraseTextArea"
                      placeholder={placeholderText}
                      className="w-full h-full text-white text-sm not-italic font-[300] leading-11 resize-none focus:outline-none placeholder:text-[#95908a] placeholder:text-sm placeholder:not-italic placeholder:font-[300] placeholder:leading-11"
                      value={textAreaContent}
                      onFocus={(e) => (e.currentTarget.placeholder = '')}
                      onBlur={(e) =>
                        (e.currentTarget.placeholder = placeholderText)
                      }
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
                      onClick={() => {
                        if (textAreaContent.trim() !== '') handleSubmit();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isNookChatOpen && (
              <NookChat bookId={Number(location.state.bookId)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadNoteEditPage;
