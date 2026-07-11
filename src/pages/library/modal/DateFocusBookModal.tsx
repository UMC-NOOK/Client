import Icon from "../../../components/action/Button/Icon";
import TopNavigation from "../../../components/navigation/topnavigation/TopNavigation";
import close from "../../../assets/icons/close.svg";
import BookList from "../../../components/content/card/Book/List";
import { createPortal } from "react-dom";
import type { DateBookInfo } from "../../../types/libraryInfo/library";

interface DateFocusBookModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: string | null;
  items: DateBookInfo[];
}

function formatDateLabel(date?: string | null) {
  if (!date) return "";

  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;

  return `${Number(month)}월 ${Number(day)}일`;
}

export default function DateFocusBookModal({
  open,
  onClose,
  selectedDate,
  items,
}: DateFocusBookModalProps) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="min-w-[375px] rounded-t-[16px] bg-gray-15 px-4 pt-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <TopNavigation
          left={<div className="w-10 h-10" />}
          center={
            <label className="text-label-18-rb text-gray-90">
              {formatDateLabel(selectedDate)}
            </label>
          }
          right={
            <button type="button" onClick={onClose}>
              <Icon size="m">
                <img src={close} alt="닫기" />
              </Icon>
            </button>
          }
        />

        <div className="pt-4">
          {items.length === 0 ? (
            <div className="py-6 text-center text-gray-60">
              해당 날짜의 기록이 없습니다.
            </div>
          ) : (
            <div className="max-h-105.5 overflow-y-auto pr-1 scrollbar-hide">
              <div className="flex flex-col">
                {items.map((item, index) => (
                  <BookList
                    key={`${item.bookId}-${index}`}
                    imageUrl={item.coverUrl}
                    title={item.title}
                    author={item.author}
                    type="READINGORDONE"
                    typeLabel={item.focusTime}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
