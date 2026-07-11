// libraries
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import Divider from "../../components/layout/Divider";
import Emotion from "../../components/action/Chip/Emotion";
import Image from "../../components/atomic/Image";
import Toast from "../../components/feedback/toast";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";
// types
import type { EmotionKey } from "../../components/action/Chip/Emotion";
// api
import { useCreateRecord } from "../../hooks/mutations/record/useCreateRecord";

export default function CreateReportPage() {
  const navigate = useNavigate();
  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";
  const bookId = history.state?.usr?.bookId;

  const record = history.state?.usr?.record;

  const initialImages: string[] = record?.imgUrls || record?.imageUrl || [];
  const imageArray = Array.isArray(initialImages)
    ? initialImages
    : [initialImages].filter(Boolean);

  const [content, setContent] = useState(record?.content || "");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey>(
    record?.emotion || null,
  );

  const [images, setImages] = useState<string[]>(imageArray);

  const [imageFiles, setImageFiles] = useState<(File | null)[]>(
    imageArray.map(() => null),
  );

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastKey, setToastKey] = useState<number>(0);

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
    } else {
      setIsToastOpen(true);
      setToastKey(Date.now());
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const remainingSlots = MAX_IMAGES - images.length;
    const allowedFiles = selectedFiles.slice(0, remainingSlots);

    const newImageUrls = allowedFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImageUrls]);
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
      setImages(images.filter((_, i) => i !== index));
      setImageFiles(imageFiles.filter((_, i) => i !== index));
      setDeleteIndex(null);
    } else {
      setDeleteIndex(index);
    }
  };

  const { mutate: createRecord } = useCreateRecord();

  return (
    <div className="flex flex-col items-center justify-start w-full h-dvh overflow-y-hidden gap-5 relative">
      {/* Top Navigation */}
      <div className="flex flex-col items-center justify-start w-full gap-2 shrink-0">
        <TopNavigation
          left={<img src={chevron_left} alt="back" />}
          onClickLeft={() => navigate(-1)}
          center={bookTitle}
        />
        <Divider width="full" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 items-start justify-start w-full gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <textarea
          placeholder="기억에 남는 문장, 떠오르는 감상을 기록하세요."
          className="w-full h-full text-body-13-r text-gray-90 placeholder:text-gray-50 bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 하단 UI 영역 */}
      <div className="flex flex-col items-start justify-start w-full gap-2 pb-26 shrink-0">
        <div className="flex items-start w-full overflow-x-scroll gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {emotionArray.map((key) => (
            <Emotion
              key={key}
              emojiKey={key}
              active={selectedEmotion === key}
              size="m"
              onClick={() =>
                setSelectedEmotion(selectedEmotion === key ? null : key)
              }
            />
          ))}
        </div>
        <div className="flex items-start w-full overflow-x-scroll gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* 업로드 버튼 */}
          <div onClick={handleUploadClick} className="cursor-pointer shrink-0">
            <Image type="Upload" />
          </div>

          {/* 추가된 이미지 렌더링 영역 */}
          {images.map((url, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="cursor-pointer shrink-0"
            >
              <Image
                type={deleteIndex === index ? "Delete" : "Image"}
                imageUrl={url}
              />
            </div>
          ))}

          {/* 남은 공간만큼 Skeleton 렌더링 영역 */}
          {Array.from({ length: MAX_IMAGES - images.length }).map(
            (_, index) => (
              <Image key={`skeleton-${index}`} type="Skeleton" />
            ),
          )}
        </div>
      </div>

      {/* Toast */}
      <div className="absolute bottom-25 left-0 w-full flex justify-center z-100">
        <Toast
          key={`toast-${toastKey}`}
          text="사진은 최대 5장까지 첨부할 수 있어요."
          isOpen={isToastOpen}
        />
      </div>

      <BottomSheet
        open={true}
        onClose={() => {}}
        overlay={false}
        footer={{
          layout: "single",
          variant: `${content ? "mint" : "primaryDisabled"}`,
          label: "기록 저장하기",
          onClick: () => {
            // imageFiles.filter(file => file !== null) 로 실제 새로 업로드된 파일만 추출 가능
            createRecord(
              {
                bookId: bookId,
                content,
                emotion: selectedEmotion,
                imageFiles: imageFiles.filter(
                  (file) => file !== null,
                ) as File[],
              },
              {
                onSuccess: () => {
                  navigate(`/report/${bookId}`);
                },
              },
            );
          },
        }}
      />
    </div>
  );
}
