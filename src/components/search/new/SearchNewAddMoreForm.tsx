// Client/src/components/search/new/SearchNewAddMoreForm.tsx
import React, { useEffect, useState } from "react";
import CameraIcon from "../../../assets/search/atomic-icon-shape.svg";
import TextArea from "../../input/textinput/TextArea";
import { TextField, TripleTextField } from "../../input/textinput/TextField";

type DateParts = {
  yyyy: string;
  mm: string;
  dd: string;
};

type Props = {
  imageFile: File | null;

  intro: string;
  pages: string;
  publisher: string;
  isbn: string;
  pubDate: DateParts;

  onChangeImage: (f: File | null) => void;
  onChangeIntro: (v: string) => void;
  onChangePages: (v: string) => void;
  onChangePublisher: (v: string) => void;
  onChangeIsbn: (v: string) => void;
  onChangePubDate: (v: DateParts) => void;
};

const MAX_INTRO = 500;

export default function SearchNewAddMoreForm({
  imageFile,
  intro,
  pages,
  publisher,
  isbn,
  pubDate,
  onChangeImage,
  onChangeIntro,
  onChangePages,
  onChangePublisher,
  onChangeIsbn,
  onChangePubDate,
}: Props) {
  /** ───────── 이미지 프리뷰 ───────── */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onChangeImage(f);
    e.target.value = "";
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center gap-8 px-1">
        {/* 이미지 */}
        <label
          aria-label="사진 추가"
          className="
            flex w-25 h-36
            items-center justify-center
            rounded-xs bg-gray-900
            cursor-pointer overflow-hidden
          "
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePick}
          />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="선택한 책 이미지"
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <img src={CameraIcon} alt="" className="w-6 h-6" draggable={false} />
          )}
        </label>

        <div className="w-full flex flex-col items-start gap-6 px-1">
          {/* 소개 */}
          <TextArea
            title="소개"
            value={intro}
            onChange={onChangeIntro}
            placeholder="책에 대한 소개를 입력해주세요."
            maxLength={MAX_INTRO}
          />

          {/* 분량 */}
          <TextField
            title="분량"
            value={pages}
            onChange={onChangePages}
            placeholder="책의 전체 쪽수를 입력해주세요."
            inputMode="numeric"
          />

          {/* 출판사 */}
          <TextField
            title="출판사"
            value={publisher}
            onChange={onChangePublisher}
            placeholder="책의 출판사를 입력해주세요."
          />

          {/* 출판일 */}
         <TripleTextField
            title="출판일"
            value={pubDate}
            onChange={onChangePubDate}
            fields={[
              { key: "yyyy", placeholder: "YYYY", maxLen: 4 },
              { key: "mm", placeholder: "MM", maxLen: 2 },
              { key: "dd", placeholder: "DD", maxLen: 2 },
            ]}
            digitsOnly
          /> 

          {/* ISBN */}
          <TextField
            title="ISBN"
            value={isbn}
            onChange={onChangeIsbn}
            placeholder="책의 ISBN을 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
}
