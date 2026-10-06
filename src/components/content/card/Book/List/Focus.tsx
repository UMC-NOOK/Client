import playIcon from "../../../../../assets/icons/movement.svg";
import SectionHeader from "../../../InformationText/SectionHeader";
import WidthAwareEllipsis from "../../../WidthAwareEllipsis";

type Props = {
  imageUrl: string;
  imageAlt?: string;
  timeText: string;
  title: string;
  author: string;
  /**
   * 재생 버튼만이 아니라 카드 전체가 터치 영역이다 — Figma 컴포넌트 코멘트에서 디자이너가
   * 명시적으로 확인함(2026-08-10): "터치 영역은 아이콘이 아닌 Card/Book/List/Focus 컴포넌트
   * 전체로 설정했습니다. 컴포넌트 선택 시 'focus : 테마 선택/이미지'로 이동합니다."
   */
  onClick?: () => void;
};

export function Focus({
  imageUrl,
  imageAlt = "thumbnail",
  timeText,
  title,
  author,
  onClick,
}: Props) {
  const clickable = Boolean(onClick);

  return (
    <div
      // rounded-[10px]: Tailwind v4 기본 radius 스케일에 10px가 없음(8px=lg, 12px=xl) — Figma 실측값 그대로 arbitrary 유지
      className="flex w-full h-full min-h-24 items-center rounded-[10px] bg-gray-15 p-4"
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div
        className="h-16 w-11 shrink-0 rounded-xs bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={imageAlt}
      />

      <div className="flex min-w-0 flex-1 items-center gap-2 pl-4">
        <div className="flex min-h-16 min-w-0 flex-1 flex-col justify-between">
          <p className="text-label-13-sb text-gray-60">{timeText}</p>

          <div className="mt-auto w-full min-w-0">
            <SectionHeader
              size="16"
              top={<WidthAwareEllipsis text={title} />}
              bottom={<WidthAwareEllipsis text={author} />}
            />
          </div>
        </div>

        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          <img src={playIcon} className="h-full w-full" />
        </span>
      </div>
    </div>
  );
}
