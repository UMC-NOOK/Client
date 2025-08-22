// librarys
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// imgs
import chevron_left from '/src/assets/button/read-note-edit/chevron-left.svg';
import edit_btn from '/src/assets/button/read-note-edit/edit-btn.svg';
import delete_btn from '/src/assets/button/read-note-edit/delete-btn.svg';
import info_edit_btn from '/src/assets/button/read-note/info-edit-btn.svg';
import read_note_save from '/src/assets/button/read-note/read-note-save.svg';
import read_note_save_btn from '/src/assets/button/read-note/read-note-save-btn.svg';
import quotation_arrow from '/src/assets/button/read-note-edit/quotation-arrow.svg';
import impression_icon from '/src/assets/button/read-note-edit/impression-icon.svg';

// components
import LibraryRegistration from '../../../lounge/components/book-info/libraryRegistration';
import DeleteBtn from '../../../../components/delete-modal/DeleteModal';
import DownloadModal from '../../components/read-note/downloadModal';

// hooks
import useGetSentenceList from '../../hooks/useQuery/read-note/useGetSentenceList';
import useDeleteBook from '../../hooks/useMutation/library-mutation/useDeleteBook';

const ReadNotePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: sentenceList } = useGetSentenceList(location.state.bookId);
  const { mutate: deleteBook } = useDeleteBook();

  const isReadNoteExist = (sentenceList?.result?.length ?? 0) > 0;
  const [isLibraryRegistrationOpen, setIsLibraryRegistrationOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const libraryCloseHandler = () => {
    // 수정 로직 추가
    setIsLibraryRegistrationOpen(false);
  };

  const libraryHandler = () => {
    setIsLibraryRegistrationOpen((prev) => !prev);
  };

  const deleteHandler = () => {
    deleteBook({ bookId: location.state.bookId });
    setIsDeleteModalOpen((prev) => !prev);
    navigate('/library', { replace: true });
  };

  const deleteCloseHandler = () => {
    setIsDeleteModalOpen(false);
  };

  const downloadHandler = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  const downloadCloseHandler = () => {
    // 다운로드 로직 추가
    setIsDownloadModalOpen(false);
  };

  return (
    <div className="flex items-start justify-center w-full h-full gap-23 mt-20">
      {isLibraryRegistrationOpen && (
        <LibraryRegistration
          onRegister={libraryHandler}
          closeModal={libraryCloseHandler}
          bookImg={location.state?.coverImageUrl}
          bookTitle={location.state?.title}
          bookAuthor={location.state?.author}
          bookId={location.state?.bookId}
          type="edit"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteBtn
          onDelete={deleteHandler}
          closeModal={deleteCloseHandler}
          usage="read-note"
        />
      )}
      {isDownloadModalOpen && (
        <DownloadModal
          onDownload={downloadHandler}
          closeModal={downloadCloseHandler}
          bookImg={location.state?.coverImageUrl}
          bookTitle={location.state?.title}
          bookAuthor={location.state?.author}
          bookId={location.state?.bookId}
        />
      )}
      <div className="flex flex-col items-start justify-start w-332">
        <div className="flex w-full h-35 items-center justify-between backdrop-blur-[20px] border-b border-solid border-b-[rgba(85,83,81,1)]">
          <div className="flex items-center gap-[25px]">
            <img
              src={chevron_left}
              alt="chevron left"
              className="h-10 w-10"
              onClick={() => navigate(-1)}
            />
            <div className="flex items-end gap-7">
              <span className="text-white text-[22px] not-italic font-semibold leading-[25px]">
                {location.state?.title || '책 제목 데이터 없음'}
              </span>
              <p className="text-white text-xs not-italic font-normal">
                {location.state?.author || '저자 데이터 없음'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={edit_btn}
              alt="Edit"
              className="w-17 h-17 cursor-pointer"
              onClick={() =>
                navigate(`/library/${location.state.bookId}/edit`, {
                  state: {
                    bookId: location.state.bookId,
                    title: location.state.title,
                    author: location.state.author,
                  },
                })
              }
            />
            <img
              src={info_edit_btn}
              alt="Info Edit"
              className="w-17 h-17 cursor-pointer"
              onClick={libraryHandler}
            />
            <img
              src={delete_btn}
              alt="Delete"
              className="w-17 h-17 cursor-pointer"
              onClick={() => setIsDeleteModalOpen((prev) => !prev)}
            />
          </div>
        </div>
        {isReadNoteExist ? (
          <div className="flex flex-col items-start justify-start w-[634px] h-[478px] gap-7 mt-20 overflow-y-auto  [&::-webkit-scrollbar]:hidden">
            {sentenceList?.result?.map((sentence) => (
              <>
                {sentence.recordType === 'RECORD' ? (
                  sentence.page === null ? (
                    <Phrase
                      text={sentence.content}
                      page="-" // 페이지 정보가 없을 경우 -1로 표시
                    />
                  ) : (
                    <Phrase
                      text={sentence.content}
                      page={parseInt(sentence.page, 10)}
                    />
                  )
                ) : (
                  <></>
                )}
                {sentence.comments?.map((comment) => (
                  <Quotation key={comment.commentId} text={comment.content} />
                ))}
              </>
            ))}
            {sentenceList?.result?.map((sentence) => (
              <>
                {sentence.recordType === 'COMMENTARY' ? (
                  <Impression text={sentence.content} />
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-[rgba(255,255,255,0.50)] text-center text-base not-italic font-[300] flex items-center justify-center w-[634px] h-[478px]">
            작성한 독서 기록이 없습니다.
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-35 relative ">
        <img
          src={read_note_save}
          alt="Save"
          className="w-[290px] h-[516px] rounded-[4px]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer">
          <div className="text-[#222020] text-center text-xs not-italic font-normal">
            독서 카드 만들고
          </div>
          <div
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#2c251d]"
            onClick={downloadHandler}
          >
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

const Phrase = ({ text, page }: { text: string; page: number | string }) => {
  return (
    <div className="w-full flex items-start justify-start gap-10 text-white text-sm not-italic font-normal">
      <div className="w-20 ">P.{page}</div>
      <div className="w-full">{text}</div>
    </div>
  );
};

const Quotation = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex items-start justify-start gap-10 text-white text-sm not-italic font-normal pl-30">
      <img src={quotation_arrow} alt="" className="w-10 h-10" />
      <div className="w-full">{text}</div>
    </div>
  );
};

const Impression = ({ text }: { text: string }) => {
  return (
    <div className="w-full flex items-center justify-start gap-10 text-white text-sm not-italic font-normal">
      <img
        src={impression_icon}
        alt="impression"
        className="w-[33px] h-[39px]"
      />
      <div className="w-full flex flex-col gap-7">{text}</div>
    </div>
  );
};
