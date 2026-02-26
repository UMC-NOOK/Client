/**
 * PopupConfirmModalTestPage
 *
 * [사용 예시]
 * - 팝업 열기/닫기와 문구 변경이 정상 동작하는지 확인용
 */

import { useState } from "react";
import PopupConfirmModal from "../../../components/presentation/modal/popup/Origin";

export default function PopupConfirmModalTestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-17 p-6 flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          "h-12",
          "px-4",
          "rounded-lg",
          "bg-mint-60",
          "text-gray-10",
          "text-btn-16-sb",
          "w-fit",
        ].join(" ")}
      >
        팝업 열기
      </button>

      <PopupConfirmModal
        open={open}
        title="완독 상태로 변경할까요?"
        description="다시 독서 중 상태로 되돌릴 수 있어요."
        leftLabel="취소"
        rightLabel="변경"
        onLeftClick={() => setOpen(false)}
        onRightClick={() => {
          console.log("변경");
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}