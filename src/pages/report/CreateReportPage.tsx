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

export default function CreateReportPage() {
  const navigate = useNavigate();
  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";

  const [content, setContent] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionKey>(null);

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

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

  // 1️⃣ 커스텀 업로드 버튼 클릭 시 숨겨진 input 강제 클릭
  const handleUploadClick = () => {
    if (images.length < MAX_IMAGES) {
      // 5장 미만일 때만 파일 선택 창 열기
      fileInputRef.current?.click();
    } else {
      setIsToastOpen(true);
      setToastKey(Date.now());
    }
  };

  // 2️⃣ 실제 파일이 선택되었을 때 실행되는 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 선택된 파일들을 배열로 변환
    const selectedFiles = Array.from(files);
    const remainingSlots = MAX_IMAGES - images.length;

    // 남은 슬롯만큼만 파일 자르기 (사용자가 한 번에 여러 장을 선택할 경우 대비)
    const allowedFiles = selectedFiles.slice(0, remainingSlots);

    // 💡 미리보기를 위한 로컬 URL 생성 (URL.createObjectURL)
    const newImageUrls = allowedFiles.map((file) => URL.createObjectURL(file));

    // 상태 업데이트
    setImages((prev) => [...prev, ...newImageUrls]);
    setImageFiles((prev) => [...prev, ...allowedFiles]);

    // input 초기화 (같은 파일을 연달아 올릴 수 있도록 조치)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // 만약 남은 슬롯보다 더 많은 파일을 선택했다면 Toast 띄워주기
    if (selectedFiles.length > remainingSlots) {
      setIsToastOpen(true);
      setToastKey(Date.now());
    }
  };

  // 이미지 삭제 핸들러 (URL과 File 객체 모두 삭제해야 함)
  const handleImageClick = (index: number) => {
    if (deleteIndex === index) {
      setImages(images.filter((_, i) => i !== index));
      setImageFiles(imageFiles.filter((_, i) => i !== index)); // 💡 File 객체도 같이 삭제
      setDeleteIndex(null);
    } else {
      setDeleteIndex(index);
    }
  };

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

      {/* 💡 1. 텍스트 영역: 고정 높이(h-[59vh]) 대신 flex-1 적용 */}
      <div className="flex flex-col flex-1 items-start justify-start w-full gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <textarea
          placeholder="기억에 남는 문장, 떠오르는 감상을 기록하세요."
          className="w-full h-full text-body-13-r text-gray-90 placeholder:text-gray-50 bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* 💡 2. 하단 UI 영역: 기존 패딩(pb-26) 유지 + shrink-0 추가 */}
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
            multiple // 여러 장 선택 허용
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

      {/* 💡 3. Toast 분리 및 z-index 고정 */}
      <div className="absolute bottom-[100px] left-0 w-full flex justify-center z-[100]">
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
          onClick: () => {},
        }}
      />
    </div>
  );
}
