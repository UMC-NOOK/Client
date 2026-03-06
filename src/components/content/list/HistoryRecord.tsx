import React from "react";
import bg from "../../../assets/images/bottom_banner.jpg";

type HistoryTimeProps = {
  time: string;
  className?: string;
};

export function HistoryRecord({ time, className }: HistoryTimeProps) {
  return (
    <div
      className={["flex items-start gap-2 p-3 w-full rounded-[4px] overflow-hidden", className ?? ""].join(" ")}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-4 w-4 items-center justify-center self-stretch shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path
            d="M10.6528 0C11.2753 0 11.8723 0.247296 12.3125 0.687485C12.7527 1.12767 13 1.7247 13 2.34722V7.22222H9.56944C8.94692 7.22222 8.3499 7.46952 7.90971 7.90971C7.46952 8.3499 7.22222 8.94692 7.22222 9.56944V13H2.34722C1.7247 13 1.12767 12.7527 0.687485 12.3125C0.247296 11.8723 0 11.2753 0 10.6528V2.34722C0 1.7247 0.247296 1.12767 0.687485 0.687485C1.12767 0.247296 1.7247 0 2.34722 0H10.6528ZM12.6822 8.30556L8.30556 12.6822V9.56944C8.30556 8.87178 8.87178 8.30556 9.56944 8.30556H12.6822Z"
            fill="#C5CCDB"
          />
        </svg>
      </div>

      <div className="min-w-0 flex flex-1 flex-col items-start justify-center gap-2">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-13-sb text-gray-100">독서 기록</p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-12-sb text-gray-500">{time}</p>
      </div>
    </div>
  );
}