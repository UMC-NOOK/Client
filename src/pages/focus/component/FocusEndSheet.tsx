import { useRef } from "react";

import Checkbox from "../../../components/section/checkbox/Checkbox";
import BottomSheet from "../../../components/presentation/modal/bottomsheet/Origin";
import { formatDurationHms } from "../utils/formatDurationHms";

type FocusEndSheetProps = {
  open: boolean;
  elapsedSeconds: number;
  pageInput: string;
  isFinished: boolean;
  onPageInputChange: (value: string) => void;
  onFinishedChange: (checked: boolean) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function FocusEndSheet({
  open,
  elapsedSeconds,
  pageInput,
  isFinished,
  onPageInputChange,
  onFinishedChange,
  onClose,
  onSubmit,
}: FocusEndSheetProps) {
  const pageInputRef = useRef<HTMLInputElement>(null);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      footer={{
        layout: "double",
        sizeMode: "equal",
        leftVariant: "secondary",
        leftLabel: "취소",
        rightLabel: "종료",
        onLeftClick: onClose,
        onRightClick: onSubmit,
      }}
    >
      <div className="flex w-full flex-col gap-4">
        {/* 좌하단 취소 버튼과 기능이 겹쳐서 X는 뺐다(디자이너 확인, Figma 미반영).
            title prop 대신 여기서 직접 렌더링해 공용 BottomSheet 헤더(X 포함)는 건드리지 않는다. */}
        <div className="flex h-10 items-center justify-center">
          <span className="text-title-18-m text-gray-90">포커스 종료</span>
        </div>

        <div className="flex w-full flex-col gap-6">
          {/* 공용 TextField와 배경색·단위 표현이 달라 종료 시트 전용 필드로 구성한다. */}
          <div className="flex w-full flex-col items-start gap-3">
            <span className="text-label-13-sb text-gray-90">독서 시간</span>
            <div className="flex h-11.25 w-full items-center rounded-lg bg-gray-20 px-4 py-3">
              <span className="text-body-14-r text-gray-90">
                {formatDurationHms(elapsedSeconds)}
              </span>
            </div>
          </div>

          {/* 숫자 삭제를 방해하지 않도록 "쪽" 단위를 input 값과 분리한다. */}
          <div className="flex w-full flex-col items-start gap-3">
            <span className="text-label-13-sb text-gray-90">읽은 분량</span>
            <div
              className="flex h-11.25 w-full cursor-text items-center rounded-lg bg-gray-20 px-4 py-3"
              onClick={() => pageInputRef.current?.focus()}
            >
              <input
                ref={pageInputRef}
                value={pageInput}
                onChange={(event) =>
                  onPageInputChange(event.target.value.replace(/\D/g, ""))
                }
                placeholder={
                  pageInput ? undefined : "몇 쪽까지 읽었는지 입력해주세요."
                }
                inputMode="numeric"
                size={pageInput ? pageInput.length : undefined}
                className={[
                  "bg-transparent text-gray-90 text-body-14-r placeholder:text-gray-50",
                  "caret-gray-50 outline-none",
                  pageInput ? "w-auto min-w-0" : "w-full",
                ].join(" ")}
              />
              {pageInput && (
                <span className="text-gray-90 text-body-14-r">쪽</span>
              )}
            </div>
          </div>

          <Checkbox
            text="완독했어요."
            checked={isFinished}
            onCheckedChange={onFinishedChange}
          />
        </div>
      </div>
    </BottomSheet>
  );
}
