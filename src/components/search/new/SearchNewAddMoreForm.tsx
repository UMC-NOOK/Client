// Client/src/components/search/new/SearchNewAddMoreForm.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import CameraIcon from "../../../assets/search/atomic-icon-shape.svg";

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

function LabelBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-start gap-3">
      <span className="text-gray-100 text-label-13-b">{label}</span>
      {children}
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-md bg-gray-900 outline-none " +
  "text-gray-100 text-body-14-r placeholder:text-gray-500";

const dateInputBase =
  "flex-1 min-w-0 px-4 py-3 rounded-lg bg-gray-900 outline-none " +
  "text-gray-100 text-body-14-r placeholder:text-gray-500";

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

  /** ───────── 소개 textarea auto resize ───────── */
  const introRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeIntro = () => {
    const el = introRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    resizeIntro();
  }, [intro]);

  const handleChangeIntro = (v: string) => {
    onChangeIntro(v.slice(0, MAX_INTRO));
  };

  const hasIntro = useMemo(() => intro.trim().length > 0, [intro]);
  const introCount = intro.length;
  const counterColor = introCount === 0 ? "text-gray-500" : "text-gray-100";

  /** ───────── 출판일 UX: 숫자만 + 자동 이동 ───────── */
  const yyyyRef = useRef<HTMLInputElement | null>(null);
  const mmRef = useRef<HTMLInputElement | null>(null);
  const ddRef = useRef<HTMLInputElement | null>(null);

  const onlyDigits = (v: string) => v.replace(/\D/g, "");

  // ✅ 여기 타입을 nullable ref로 받도록 수정 (TS 에러 해결 포인트)
  const setPartAndMaybeMove = (
    key: keyof DateParts,
    raw: string,
    maxLen: number,
    next?: React.RefObject<HTMLInputElement | null>
  ) => {
    const digits = onlyDigits(raw).slice(0, maxLen);
    onChangePubDate({ ...pubDate, [key]: digits });

    if (digits.length === maxLen) {
      next?.current?.focus();
    }
  };

  const handleDateKeyDown = (
    key: keyof DateParts,
    e: React.KeyboardEvent<HTMLInputElement>,
    prev?: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Backspace" && pubDate[key].length === 0) {
      prev?.current?.focus();
    }
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
          <input type="file" accept="image/*" className="hidden" onChange={handlePick} />
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
          <LabelBlock label="소개">
            <div className="w-full">
              <div className="w-full rounded-md bg-gray-900 px-4 py-3 flex flex-col gap-4">
                <textarea
                  ref={introRef}
                  value={intro}
                  onChange={(e) => handleChangeIntro(e.target.value)}
                  placeholder="책에 대한 소개를 입력해주세요."
                  className={[
                    "w-full min-h-15.75",
                    "bg-transparent outline-none resize-none overflow-hidden",
                    "text-gray-100 placeholder:text-gray-500",
                    hasIntro ? "text-body-14-b" : "text-body-14-r",
                  ].join(" ")}
                />

                <div
                  className="
                    max-w-full overflow-hidden text-ellipsis
                    [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]
                    text-label-13-b
                  "
                >
                  <span className={counterColor}>{introCount}</span>
                  <span className="text-gray-500">/{MAX_INTRO}</span>
                </div>
              </div>
            </div>
          </LabelBlock>

          {/* 분량 */}
          <LabelBlock label="분량">
            <input
              value={pages}
              onChange={(e) => onChangePages(e.target.value)}
              placeholder="책의 전체 쪽수를 입력해주세요."
              inputMode="numeric"
              className={inputBase}
            />
          </LabelBlock>

          {/* 출판사 */}
          <LabelBlock label="출판사">
            <input
              value={publisher}
              onChange={(e) => onChangePublisher(e.target.value)}
              placeholder="책의 출판사를 입력해주세요."
              className={inputBase}
            />
          </LabelBlock>

          {/* 출판일 */}
          <LabelBlock label="출판일">
            <div className="w-full flex items-start gap-2">
              <input
                ref={yyyyRef}
                value={pubDate.yyyy}
                onChange={(e) => setPartAndMaybeMove("yyyy", e.target.value, 4, mmRef)}
                onKeyDown={(e) => handleDateKeyDown("yyyy", e)}
                placeholder="YYYY"
                inputMode="numeric"
                className={dateInputBase}
              />
              <input
                ref={mmRef}
                value={pubDate.mm}
                onChange={(e) => setPartAndMaybeMove("mm", e.target.value, 2, ddRef)}
                onKeyDown={(e) => handleDateKeyDown("mm", e, yyyyRef)}
                placeholder="MM"
                inputMode="numeric"
                className={dateInputBase}
              />
              <input
                ref={ddRef}
                value={pubDate.dd}
                onChange={(e) => setPartAndMaybeMove("dd", e.target.value, 2)}
                onKeyDown={(e) => handleDateKeyDown("dd", e, mmRef)}
                placeholder="DD"
                inputMode="numeric"
                className={dateInputBase}
              />
            </div>
          </LabelBlock>

          {/* ISBN */}
          <LabelBlock label="ISBN">
            <input
              value={isbn}
              onChange={(e) => onChangeIsbn(e.target.value)}
              placeholder="책의 ISBN을 입력해주세요."
              className={inputBase}
            />
          </LabelBlock>
        </div>
      </div>
    </div>
  );
}
