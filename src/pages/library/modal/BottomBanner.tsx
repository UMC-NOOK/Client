import movement from "../../../assets/icons/movement.svg";
import close from "../../../assets/icons/close-gray-60.svg";
import Icon from "../../../components/action/Button/Icon";
import Text from "../../../components/action/Button/Text";
import SectionHeader from "../../../components/content/InformationText/SectionHeader";
import WidthAwareEllipsis from "../../../components/content/WidthAwareEllipsis";

type BottomBannerProps = {
  bookId: number;
  title: string;
  coverUrl: string;
  page: number;
  focusTime: string;
  onClick?: (bookId: number) => void;
  onClose?: () => void;
};

export default function BottomBanner({
  bookId,
  title,
  coverUrl,
  focusTime,
  onClick,
  onClose,
}: BottomBannerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-end justify-center pb-1">
      <div className="pointer-events-auto flex h-29 w-full max-w-93.75 flex-col items-end justify-center px-4">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-0.5 shadow-elevation-20"
          aria-label="배너 닫기"
        >
          <Text size="12" color="gray-60">
            닫기
          </Text>
          <Icon size="xs" className="h-3 w-3 p-0">
            <img src={close} alt="" />
          </Icon>
        </button>

        {/* 10px radius는 Tailwind 기본 스케일(8px/12px)에 없어 Figma 실측값을 유지한다. */}
        <button
          type="button"
          onClick={() => onClick?.(bookId)}
          aria-label={`${title} 이어서 포커스하기`}
          className="flex h-24 w-full cursor-pointer flex-row items-end gap-4 rounded-[10px] bg-gray-15 p-4 text-left"
        >
          <img
            src={coverUrl}
            alt=""
            className="h-full w-11 shrink-0 rounded-xs"
          />

          <div className="flex h-full min-w-0 flex-1 items-center gap-2">
            <div className="flex h-full min-w-0 flex-1 flex-col items-start">
              <div className="text-label-13-sb text-gray-60">{focusTime}</div>

              <div className="mt-auto w-full min-w-0">
                <SectionHeader
                  size="16"
                  top={<WidthAwareEllipsis text={title} />}
                  bottom="이어서 포커스하기"
                />
              </div>
            </div>

            <span className="flex shrink-0 items-center justify-center">
              <img src={movement} className="h-8 w-8" alt="" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
