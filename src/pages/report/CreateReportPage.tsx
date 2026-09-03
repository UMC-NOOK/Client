// libraries
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import Divider from "../../components/layout/Divider";
import Emotion from "../../components/action/Chip/Emotion";
import Image from "../../components/atomic/Image";
import Toast from "../../components/feedback/toast";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import PopupConfirmModal from "../../components/presentation/modal/popup/Origin";

// assets
import chevron_left from "../../assets/icons/chevron_left.svg";

// types
import type { EmotionKey } from "../../components/action/Chip/Emotion";

// hooks
import { useCreateRecord } from "../../hooks/mutations/record/useCreateRecord";
import { useEditRecord } from "../../hooks/mutations/record/useEditRecord";

export default function CreateReportPage() {
  const navigate = useNavigate();

  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";
  const bookId = history.state?.usr?.bookId;
  const record = history.state?.usr?.record;
  const book = history.state?.usr?.book || null;

  const isEditMode = !!record;

  const initialImages: string[] = record?.imgUrls || [];
  const initialImageKeys: string[] = record?.imageKeys || [];

  const [content, setContent] = useState(record?.content || "");

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey | "EMPTY">(
    record?.emotion || "EMPTY",
  );

  const [images, setImages] = useState<string[]>(initialImages);

  const [imageFiles, setImageFiles] =
    useState<(File | string)[]>(initialImageKeys);

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastKey, setToastKey] = useState<number>(0);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleBack = () => {
    if (isEditMode) {
      setIsExitModalOpen(true);
      return;
    }
    navigate(-1);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const emotionArray = [
    "FUN",
    "EMPATHIZING",
    "USEFUL",
    "SAD",
    "COMPLICATED",
    "UNCOMFORTABLE",
  ] as EmotionKey[];

  const MAX_IMAGES = 5;

  const handleUploadClick = () => {
    if (images.length < MAX_IMAGES) {
      fileInputRef.current?.click();
      return;
    }

    setIsToastOpen(true);
    setToastKey(Date.now());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const selectedFiles = Array.from(files);
    const remainingSlots = MAX_IMAGES - images.length;
    const allowedFiles = selectedFiles.slice(0, remainingSlots);

    const newImageUrls = allowedFiles.map((file) => URL.createObjectURL(file));

    // UI용 배열에는 브라우저 임시 URL 추가
    setImages((prev) => [...prev, ...newImageUrls]);

    // 전송용 배열에는 실제 File 객체 추가
    setImageFiles((prev) => [...prev, ...allowedFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (selectedFiles.length > remainingSlots) {
      setIsToastOpen(true);
      setToastKey(Date.now());
    }
  };

  const handleImageClick = (index: number) => {
    if (deleteIndex === index) {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== index));

      setDeleteIndex(null);

      return;
    }

    setDeleteIndex(index);
  };

  const { mutate: createRecord } = useCreateRecord();
  const { mutate: editRecord } = useEditRecord();

  return (
    <div
      className="
        relative
        flex w-full min-h-0 flex-col
        items-center justify-start
        gap-5
        overflow-hidden
        h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-8px)]
        max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-8px)]
      "
    >
      {/* Top Navigation */}
      <div className="flex w-full shrink-0 flex-col items-center justify-start gap-2">
        <TopNavigation
          left={<img src={chevron_left} alt="back" />}
          onClickLeft={handleBack}
          center={bookTitle}
        />

        <Divider width="full" />
      </div>

      {/* 텍스트 영역 */}
      <div
        className="
          flex min-h-0 w-full flex-1
          flex-col items-start justify-start
          overflow-hidden
        "
      >
        <textarea
          placeholder="기억에 남는 문장, 떠오르는 감상을 기록하세요."
          className="
            min-h-0 w-full flex-1
            resize-none
            overflow-y-auto
            border-none bg-transparent
            text-body-13-r text-gray-90
            outline-none
            placeholder:text-gray-50
            focus:outline-none focus:ring-0
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
          maxLength={700}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="mt-2 flex self-end text-[16px]">
          <span className="text-gray-90 text-label-13-sb">
            {content.length}
          </span>
          <span className="text-gray-50 text-label-13-sb">/{700}</span>
        </div>
      </div>

      {/* 하단 UI 영역 */}
      <div className="flex w-full shrink-0 flex-col items-start justify-start gap-2 pb-26">
        {/* Emotion */}
        <div
          className="
            flex w-full items-start gap-1
            overflow-x-auto
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          {emotionArray.map((key) => (
            <Emotion
              key={key}
              emojiKey={key}
              active={selectedEmotion === key}
              size="m"
              onClick={() =>
                setSelectedEmotion(selectedEmotion === key ? "EMPTY" : key)
              }
            />
          ))}
        </div>

        {/* Image */}
        <div
          className="
            flex w-full items-start gap-1
            overflow-x-auto
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]
          "
        >
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* 업로드 버튼 */}
          <div onClick={handleUploadClick} className="shrink-0 cursor-pointer">
            <Image type="Upload" />
          </div>

          {/* 추가된 이미지 */}
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              onClick={() => handleImageClick(index)}
              className="shrink-0 cursor-pointer"
            >
              <Image
                type={deleteIndex === index ? "Delete" : "Image"}
                imageUrl={url}
              />
            </div>
          ))}

          {/* Skeleton */}
          {Array.from({
            length: MAX_IMAGES - images.length,
          }).map((_, index) => (
            <Image key={`skeleton-${index}`} type="Skeleton" />
          ))}
        </div>
      </div>

      {/* Toast */}
      <div className="absolute bottom-25 left-0 z-100 flex w-full justify-center">
        <Toast
          key={`toast-${toastKey}`}
          text="사진은 최대 5장까지 첨부할 수 있어요."
          isOpen={isToastOpen}
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        open={true}
        onClose={() => {}}
        overlay={false}
        footer={{
          layout: "single",
          variant: content ? "mint" : "primaryDisabled",
          label: "기록 저장하기",

          onClick: () => {
            if (!content) return;

            if (isEditMode) {
              editRecord(
                {
                  recordId: record.recordId,
                  content,
                  emotion: selectedEmotion,
                  mixedImages: imageFiles,
                },
                {
                  onSuccess: (data) => {
                    navigate(`/report/${bookId}/${data.recordId}`, {
                      replace: true,
                      state: { bookTitle, bookId, record: data, book },
                    });
                  },
                },
              );

              return;
            }

            createRecord(
              {
                bookId,
                content,
                emotion: selectedEmotion,
                imageFiles: imageFiles.filter(
                  (file): file is File => file instanceof File,
                ),
              },
              {
                onSuccess: (data) => {
                  navigate(`/report/${bookId}/${data.recordId}`, {
                    replace: true,
                    state: { bookTitle, bookId, record: data, book },
                  });
                },
              },
            );
          },
        }}
      />
      {/* Exit Modal */}
      <PopupConfirmModal
        open={isExitModalOpen}
        title="기록 수정 화면에서 나갈까요?"
        description="수정한 내용이 저장되지 않아요."
        leftLabel="취소"
        rightLabel="나가기"
        onLeftClick={() => setIsExitModalOpen(false)}
        onRightClick={() => navigate(-1)}
        onClose={() => setIsExitModalOpen(false)}
      />
    </div>
  );
}
