import { useState, useEffect } from 'react';
import chevron_left from '/src/assets/button/read-note-edit/chevron-left.svg';
import nook_chat from '/src/assets/button/read-note-edit/nook-chat.svg';
import arroow_redo from '/src/assets/button/read-note-edit/arrow-redo-outline.svg';
import send_btn from '/src/assets/button/read-note-edit/send-button.svg';
import quotation_arrow from '/src/assets/button/read-note-edit/quotation-arrow.svg';

import Toggle from '../../components/read-note-edit/toggle';
import Phrase from '../../components/read-note-edit/phrase';
import Quotation from '../../components/read-note-edit/quotation';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';

const ReadNoteEditPage = () => {
  const [isReadNoteExist, setIsReadNoteExist] = useState(true);
  const [clickPhraseId, setClickPhraseId] = useState<number | null>(null);

  // textArea 로직
  type textContentType = 'phrase' | 'impression' | 'quotation';
  const [textContent, setTextContent] = useState<textContentType>('phrase');
  const [placeholderText, setPlaceholderText] = useState(
    '책에서 수집하고 싶은 문장을 작성해보세요.',
  );
  const [selectedPhrasePage, setSelectedPhrasePage] = useState<
    number | string | null
  >(null);
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
  }, [textContent, clickPhraseId]);

  const phraseData = [
    {
      phraseId: 1,
      page: 17,
      text: '너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다.',
    },
    {
      phraseId: 2,
      page: 45,
      text: '시간이 많아지면 생각이 많아지고, 생각이 많아지면 우울이 찾아들기 마련이다.',
    },
    { phraseId: 3, page: null, text: '이얍' },
    {
      phraseId: 4,
      page: 17,
      text: '너무 사소해서 남에게 말하기조차 민망하지만 확실히 나의 신경을 자극하는 것. 존재하지 않지만 나에게는 느껴지는 것. 그런 걸 어떻게 다뤄야 하는지 나는 알지 못했다.',
    },
    {
      phraseId: 5,
      page: 45,
      text: '시간이 많아지면 생각이 많아지고, 생각이 많아지면 우울이 찾아들기 마련이다.',
    },
    { phraseId: 6, page: null, text: '이얍' },
  ];

  const quotationData = [
    {
      phraseId: 1,
      Quotation: 1,
      text: '보이지 않지만 분명히 감각되는 감정의 결을 섬세하게 포착한 문장이다. 이해받기 어려운 내면의 진동을 조용히 꺼내 보여주는 듯해 마음이 오래 머문다.',
    },
    {
      phraseId: 1,
      Quotation: 2,
      text: '하하',
    },
    {
      phraseId: 3,
      Quotation: 1,
      text: '하하',
    },
  ];

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
    // 삭제 로직을 여기에 구현
    console.log('삭제되었습니다.');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-400">
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
          <img src={nook_chat} alt="nook chat" className="h-16 w-16" />
        </div>
        <hr className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-600/70 mt-14" />
        <div className="flex flex-col items-center justify-center h-full w-450">
          <div className="ml-40 flex flex-col items-center justify-start gap-4 box-border overflow-y-auto [&::-webkit-scrollbar]:hidden mb-17 w-full">
            {isReadNoteExist ? (
              <>
                {phraseData.map((phrase) => {
                  const matchingQuotations = quotationData.filter(
                    (q) => q.phraseId === phrase.phraseId,
                  );

                  return phrase.page == null ? (
                    <div
                      key={phrase.phraseId}
                      className="flex flex-col items-start justify-start w-full"
                    >
                      <Phrase
                        text={phrase.text}
                        setSelectedPhrasePage={setSelectedPhrasePage}
                        setTextContent={setTextContent}
                        clickPhrase={() => {
                          setClickPhraseId(phrase.phraseId);
                          setDeleteOption('read-note-edit-phrase');
                        }}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                      />
                      {matchingQuotations.map((q) => (
                        <Quotation
                          key={q.Quotation}
                          text={q.text}
                          clickPhrase={() => {
                            setClickPhraseId(phrase.phraseId);
                            setDeleteOption('read-note-edit-quotation');
                          }}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      key={phrase.phraseId}
                      className="flex flex-col items-start justify-start w-full"
                    >
                      <Phrase
                        page={phrase.page}
                        text={phrase.text}
                        setSelectedPhrasePage={setSelectedPhrasePage}
                        setTextContent={setTextContent}
                        clickPhrase={() => {
                          setClickPhraseId(phrase.phraseId);
                          setDeleteOption('read-note-edit-phrase');
                        }}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                      />
                      {matchingQuotations.map((q) => (
                        <Quotation
                          key={q.Quotation}
                          text={q.text}
                          clickPhrase={() => {
                            setClickPhraseId(phrase.phraseId);
                            setDeleteOption('read-note-edit-quotation');
                          }}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                        />
                      ))}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-[rgba(255,255,255,0.50)] text-center text-sm not-italic font-normal leading-[22px]">
                작성한 독서 기록이 없습니다.
              </div>
            )}
          </div>
          <div className="w-402">
            {textContent === 'phrase' ? (
              <div className="flex w-full h-[38px] items-center gap-3 shrink-0 border px-[27px] py-[9px] rounded-[14px_14px_0_0] border-solid border-nook-br-100 bg-[#2B2217]">
                <img src={arroow_redo} alt="" className="h-[13px] w-[13px]" />
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
                    onChange={(e) => setTextContent('quotation')}
                  ></textarea>
                </div>
              ) : (
                <textarea
                  name=""
                  id="phraseTextArea"
                  placeholder={placeholderText}
                  className="w-full h-full text-white text-sm not-italic font-normal leading-11 resize-none focus:outline-none placeholder:text-[#95908a] placeholder:text-sm placeholder:not-italic placeholder:font-normal placeholder:leading-11"
                ></textarea>
              )}

              <div className="flex items-center justify-end gap-4 w-full">
                <Toggle
                  isPhrase={textContent === 'phrase'}
                  setIsPhrase={setTextContent}
                  onClick={() => {
                    const textArea = document.getElementById(
                      'phraseTextArea',
                    ) as HTMLTextAreaElement;
                    if (textArea) {
                      textArea.value = ''; // Clear the textarea when toggling
                    }
                  }}
                />
                <img src={send_btn} alt="" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadNoteEditPage;
