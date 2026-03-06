/**
 * BottomSheetTestPage
 *
 * [사용 예시]
 * - BottomSheet의 header/footer ON/OFF 및 footer 1~7번 케이스를 빠르게 확인하는 테스트 페이지
 * - 각 버튼을 누르면 서로 다른 스펙의 footer로 BottomSheet가 열립니다.
 */

import { useState } from "react";
import BottomSheet, {
  type BottomSheetFooterConfig,
} from "../../../components/presentation/modal/bottomsheet/Origin";

type CaseKey =
  | "no_header"
  | "header_only"
  | "primary_alert"
  | "primary_disabled"
  | "primary_secondary_text"
  | "second_false_mint"
  | "double_secondary_equal"
  | "double_secondary_split"
  | "double_alert_equal"
  | "double_alert_split";

const CASES: Array<{
  key: CaseKey;
  label: string;
  title?: string;
  footer?: BottomSheetFooterConfig;
}> = [
  {
    key: "header_only",
    label: "Header만 (Footer OFF)",
    title: "헤더만 있는 바텀시트",
    footer: undefined,
  },

  // 1) primary alert
  {
    key: "primary_alert",
    label: "1. primary alert (single)",
    title: "Single / Alert",
    footer: {
      layout: "single",
      variant: "primaryAlert",
      label: "삭제하기",
      onClick: () => console.log("primary alert clicked"),
    },
  },

  // 2) primary disabled
  {
    key: "primary_disabled",
    label: "2. primary disabled (single)",
    title: "Single / Disabled",
    footer: {
      layout: "single",
      variant: "primaryDisabled",
      label: "확인",
      onClick: () => console.log("disabled clicked (should not)"),
    },
  },

  // 3) primary secondary text
  {
    key: "primary_secondary_text",
    label: "3. primary secondary (single)",
    title: "Single / Secondary Text",
    footer: {
      layout: "single",
      variant: "primarySecondaryText",
      label: "다음에 할게요",
      onClick: () => console.log("primary secondary text clicked"),
    },
  },

  // 4) second=false mint
  {
    key: "second_false_mint",
    label: "4. second=false mint (single)",
    title: "Single / Mint",
    footer: {
      layout: "single",
      variant: "mint",
      label: "확인",
      onClick: () => console.log("mint clicked"),
    },
  },

  // 5) second=true 기본 (secondary left, mint right)
  {
    key: "double_secondary_equal",
    label: "5. second=true 기본 (equal 5:5)",
    title: "Double / Secondary Left / Equal",
    footer: {
      layout: "double",
      sizeMode: "equal",
      leftVariant: "secondary",
      leftLabel: "취소",
      rightLabel: "확인",
      onLeftClick: () => console.log("left cancel"),
      onRightClick: () => console.log("right confirm"),
    },
  },
  {
    key: "double_secondary_split",
    label: "5. second=true 기본 (split 80px + fill)",
    title: "Double / Secondary Left / Split",
    footer: {
      layout: "double",
      sizeMode: "split",
      leftVariant: "secondary",
      leftLabel: "취소",
      rightLabel: "확인",
      onLeftClick: () => console.log("left cancel"),
      onRightClick: () => console.log("right confirm"),
    },
  },

  // 6) left alert
  {
    key: "double_alert_equal",
    label: "6. left alert (equal 5:5)",
    title: "Double / Alert Left / Equal",
    footer: {
      layout: "double",
      sizeMode: "equal",
      leftVariant: "alert",
      leftLabel: "삭제",
      rightLabel: "확인",
      onLeftClick: () => console.log("left alert"),
      onRightClick: () => console.log("right confirm"),
    },
  },

    {
    key: "no_header",
    label: "Header OFF (Footer만)",
    title: undefined,
    footer: {
        layout: "single",
        variant: "mint",
        label: "확인",
    },
    },

  {
    key: "double_alert_split",
    label: "6. left alert (split 80px + fill)",
    title: "Double / Alert Left / Split",
    footer: {
      layout: "double",
      sizeMode: "split",
      leftVariant: "alert",
      leftLabel: "삭제",
      rightLabel: "확인",
      onLeftClick: () => console.log("left alert"),
      onRightClick: () => console.log("right confirm"),
    },
  },
];



export default function BottomSheetTestPage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>("테스트");
  const [footer, setFooter] = useState<BottomSheetFooterConfig | undefined>(
    undefined
  );
  const [caseKey, setCaseKey] = useState<CaseKey>("header_only");

  const openCase = (key: CaseKey) => {
    const found = CASES.find((c) => c.key === key);
    if (!found) return;

    setCaseKey(key);
    setTitle(found.title);
    setFooter(found.footer);
    setOpen(true);
  };

  return (
    <div
      className={[
        "min-h-screen",
        "bg-gray-17",
        "p-6",
        "flex flex-col",
        "gap-4",
      ].join(" ")}
    >
      <h1 className="text-title-20-b text-gray-90">BottomSheet Test</h1>

      <div className="flex flex-col gap-2">
        {CASES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => openCase(c.key)}
            className={[
              "w-full",
              "h-12",
              "px-4",
              "rounded-lg",
              "bg-gray-25",
              "text-gray-90",
              "text-btn-16-sb",
              "text-left",
            ].join(" ")}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-2 text-body-14-r text-gray-60">
        현재 케이스: <span className="text-gray-90">{caseKey}</span>
      </div>

      <BottomSheet
        open={open}
        title={title}
        onClose={() => setOpen(false)}
        footer={footer}
      >
        <div className="w-full flex flex-col gap-3">
          <p className="text-body-14-r text-gray-90">
            여기는 <span className="text-gray-90">children</span> 영역입니다.
            (컴포넌트 밖에서 내용 구성)
          </p>

          <div className="rounded-xl bg-gray-20 p-4">
            <p className="text-body-14-r text-gray-90">
              스펙 확인용 더미 콘텐츠
            </p>
            <p className="text-body-13-r text-gray-60">
              Header ↔ Body: 16px / Body ↔ Footer: 32px
            </p>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}