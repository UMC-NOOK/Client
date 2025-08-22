// librarys
import { Fragment } from 'react';

// imgs
import close_btn from '/src/assets/button/read-note/close-btn.svg';
import download_btn from '/src/assets/button/read-note/read-note-save-btn.svg';
import bg_img from '/src/assets/button/read-note/read-note-save.svg';
import quotation_arrow from '/src/assets/button/read-note/quotation-arrow.svg';
import impression_icon from '/src/assets/button/read-note/impression_icon.svg';
import fullStar from '/src/assets/button/book-info/fullStar.svg';
import emptyStar from '/src/assets/button/book-info/emptyStar.svg';

// hooks
import useGetSentenceList from '../../hooks/useQuery/read-note/useGetSentenceList';

interface DownloadModalProps {
  onDownload: () => void;
  closeModal: () => void;
  bookImg: string;
  bookTitle: string;
  bookAuthor: string;
  bookId: string;
}

const DownloadModal = ({
  onDownload,
  closeModal,
  bookId,
  bookImg,
  bookTitle,
  bookAuthor,
}: DownloadModalProps) => {
  const { data: sentenceList } = useGetSentenceList(bookId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="relative w-[413px] h-[642px] rounded-2xl bg-[rgba(45,40,34,1)] px-[61px] pb-[24px] pt-[42px] text-[#7A7A7A]"
        style={{ fontFamily: 'NanumBaeEunHyeCe, Pretendard, sans-serif' }}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute right-12 top-12 w-7 h-7"
          onClick={closeModal}
          aria-label="닫기"
        >
          <img src={close_btn} alt="닫기" />
        </button>

        {/* 노트 미리보기 카드 */}
        <div className="flex w-full justify-center">
          <div
            id="reading-card"
            className="relative inline-block rounded-xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
          >
            {/* 배경 이미지 */}
            <img
              src={bg_img}
              alt=""
              className="block w-[290px] h-[516px] select-none"
              draggable={false}
            />

            {/* 오버레이: 카드 내부는 flex column으로 잡고, 본문은 flex-1에 스크롤 */}
            <div className="absolute inset-0 pl-[41.3px] pt-[37.73px] pr-[23.71px] text-[#262626] flex flex-col">
              {/* 헤더 (고정 높이) */}
              <div className="shrink-0">
                <div className="flex items-start justify-start gap-[27.53px] w-[217.53px]">
                  {/* 좌측: 표지 + 타이틀 */}
                  <div className="flex gap-4">
                    <div className="h-[57.882px] w-[39.48px] rounded-[1.34px] bg-black/10 ml-[2.55px]">
                      <img
                        src={bookImg}
                        alt="이미지 없음"
                        className="h-[57.882px] w-[39.48px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[8.19px] items-start justify-center">
                      <div className="text-[10.743px] w-[90.106px] text-ellipsis overflow-hidden whitespace-nowrap w-70">
                        {bookTitle}
                      </div>
                      <div className="text-[10.743px] w-[90.106px] text-ellipsis overflow-hidden whitespace-nowrap w-70 ">
                        {bookAuthor}
                      </div>
                    </div>
                  </div>

                  {/* 우측 메타 */}
                  <div className="flex flex-col items-start justify-start gap-[4px] mt-[30px]">
                    <div className="text-[8.057px]">2025. 06. 16</div>
                    <div className="flex items-center gap-1">
                      <img
                        src={fullStar}
                        alt="별"
                        className="inline-block w-3 h-3"
                      />
                      <img
                        src={fullStar}
                        alt="별"
                        className="inline-block w-3 h-3"
                      />
                      <img
                        src={fullStar}
                        alt="별"
                        className="inline-block w-3 h-3"
                      />
                      <img
                        src={fullStar}
                        alt="별"
                        className="inline-block w-3 h-3"
                      />
                      <img
                        src={emptyStar}
                        alt="별"
                        className="inline-block w-3 h-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 본문: 남은 공간을 차지 (폭/높이 고정값 제거) */}
              <div className="mt-[18.26px] y-[315.17px] w-full">
                {sentenceList?.result?.map((sentence) => (
                  <Fragment key={sentence.recordId}>
                    {sentence.recordType === 'RECORD' ? (
                      <Phrase
                        text={sentence.content}
                        page={parseInt(sentence.page, 10)}
                      />
                    ) : (
                      <></>
                    )}
                    {sentence.comments?.map((comment) => (
                      <Quotation
                        key={comment.commentId}
                        text={comment.content}
                      />
                    ))}
                  </Fragment>
                ))}
                {sentenceList?.result?.map((sentence) => (
                  <Fragment key={sentence.recordId}>
                    {sentence.recordType === 'COMMENTARY' ? (
                      <Impression text={sentence.content} />
                    ) : (
                      <></>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onDownload}
            className="flex h-20 w-[271px] items-center justify-center gap-2 rounded-xl bg-nook-br-100 text-[12px] font-semibold text-white font-pretendard"
          >
            <img src={download_btn} alt="" className="h-9 w-9" />
            이미지로 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;

const Phrase = ({ text, page }: { text: string; page: number }) => (
  <div className="w-full flex items-start justify-start gap-7 mb-[7.01px] ">
    <div className=" h-[14px] flex items-center text-[6.714px] font-pretendard text-[#737373]">
      P.{page}
    </div>
    <div className="whitespace-pre-wrap text-[10.743px]">{text}</div>
  </div>
);

const Quotation = ({ text }: { text: string }) => (
  <div className="w-full flex items-start gap-[4.21px] text-[10.743px] mb-[7.01px] pl-[30px]">
    <img src={quotation_arrow} alt="" className="w-[10.55px] h-[10.55px]" />
    <div className="whitespace-pre-wrap">{text}</div>
  </div>
);

const Impression = ({ text }: { text: string }) => (
  <div className="w-full flex items-start gap-[10px] text-[10.743px] mb-[7.01px]">
    <img src={impression_icon} alt="impression" className="w-10 h-[23.48px]" />
    <div className="whitespace-pre-wrap">{text}</div>
  </div>
);
