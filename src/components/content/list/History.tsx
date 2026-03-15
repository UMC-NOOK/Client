import bg from "../../../assets/images/bottom_banner.jpg";

type Variant = "history" | "time";

type Props = {
  variant: Variant;
  time: string;
  title?: string;
};

export function HistoryInfoCard({
  variant,
  time,
  title,
}: Props) {
  const isHistory = variant === "history";

  return (
    <div
      className={[
        "flex w-full items-start gap-2 rounded-[4px] p-3",
        !isHistory ? "bg-gray-17" : ""].join(" ")}
      style={
        isHistory
          ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <div className="flex h-4 w-4 shrink-0 items-center justify-center self-stretch">
        {isHistory ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10.6528 0C11.2753 0 11.8723 0.247296 12.3125 0.687485C12.7527 1.12767 13 1.7247 13 2.34722V7.22222H9.56944C8.94692 7.22222 8.3499 7.46952 7.90971 7.90971C7.46952 8.3499 7.22222 8.94692 7.22222 9.56944V13H2.34722C1.7247 13 1.12767 12.7527 0.687485 12.3125C0.247296 11.8723 0 11.2753 0 10.6528V2.34722C0 1.7247 0.247296 1.12767 0.687485 0.687485C1.12767 0.247296 1.7247 0 2.34722 0H10.6528ZM12.6822 8.30556L8.30556 12.6822V9.56944C8.30556 8.87178 8.87178 8.30556 9.56944 8.30556H12.6822Z"
              fill="#C5CCDB"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.66667 0C10.3486 1.62263e-05 13.3333 2.98471 13.3333 6.66667C13.3333 10.3486 10.3486 13.3333 6.66667 13.3333C2.98471 13.3333 1.62268e-05 10.3486 0 6.66667C0 2.9847 2.9847 0 6.66667 0ZM4.02327 3.68508C3.8376 3.57899 3.63143 3.78516 3.73753 3.97082L5.6503 7.31832C6.06284 8.04027 7.04864 8.17212 7.63662 7.58417C8.22458 6.9962 8.09272 6.0104 7.37077 5.59785L4.02327 3.68508Z"
              fill="#C5CCDB"
            />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex flex-1 flex-col items-start justify-center gap-2">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-13-sb text-gray-90">
          {isHistory ? "독서 기록" : title}
        </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-12-sb text-gray-50">
          {time}
        </p>
      </div>
    </div>
  );
}