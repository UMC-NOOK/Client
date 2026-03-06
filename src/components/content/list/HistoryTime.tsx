import React from "react";

type HistoryTimeProps = {
  focus: string; // top text
  time: string;  // bottom text
  className?: string;
};

export function HistoryTime({ focus, time, className }: HistoryTimeProps) {
  return (
    <div
      className={[
        "flex items-start gap-2 p-3 w-full rounded-[4px] bg-gray-900",
        className ?? "",
      ].join(" ")}
    >
      {/* Icon */}
      <div className="flex h-4 w-4 items-center justify-center self-stretch">
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
      </div>

      {/* Texts */}
      <div className="flex flex-1 flex-col items-start justify-center gap-2">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-13-sb text-gray-100">
          {focus}
        </p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-label-12-sb text-gray-500">
          {time}
        </p>
      </div>
    </div>
  );
}