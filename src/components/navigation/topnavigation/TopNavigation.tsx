// Client/src/components/navigation/topnavigation/TopNavigation.tsx

type TopNavigationProps = {
  left?: React.ReactNode;
  onClickLeft?: () => void;
  center?: React.ReactNode;
  right?: React.ReactNode;
  onClickRight?: () => void;
  className?: string;
};


function isTextLike(node: React.ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") return true;

  if (Array.isArray(node)) {
    return node.some(isTextLike);
  }

  if (
    typeof node === "object" &&
    node !== null &&
    "type" in node
  ) {
    const element = node as any;

    // HTML 태그일 경우 (span, div 등)
    if (typeof element.type === "string") {
      return ["span", "p", "h1", "h2", "h3", "div"].includes(element.type);
    }

    // 커스텀 컴포넌트면 내부 children 검사
    return isTextLike(element.props?.children);
  }

  return false;
}

export default function TopNavigation({
  left,
  onClickLeft,
  center,
  right,
  onClickRight,
  className = "",
}: TopNavigationProps) {
  const getPadding = (node: React.ReactNode) => {
    return isTextLike(node) ? "px-4 py-2" : "p-2";
  };

  return (
    <header
      className={[
        "relative w-full h-10 flex items-center justify-center",
        className,
      ].join(" ")}
    >
      {/* LEFT */}
      <div className="absolute left-0 flex items-center">
        <button
          onClick={onClickLeft}
          disabled={!onClickLeft}
          className={`${getPadding(left)} rounded-lg flex items-center justify-center`}
        >
          {left}
        </button>
      </div>

      {/* CENTER */}
      <div className="text-title-18-m text-gray-90 flex items-center justify-center">
        {center}
      </div>

      {/* RIGHT */}
      <div className="absolute right-0 flex items-center">
        <button
          onClick={onClickRight}
          disabled={!onClickRight}   // 🔥 핵심
          className={`${getPadding(right)} rounded-lg flex items-center justify-center`}
        >
          {right}
        </button>
      </div>
    </header>
  );
}