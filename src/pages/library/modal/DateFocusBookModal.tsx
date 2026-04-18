import Icon from "../../../components/action/Button/Icon";
import TopNavigation from "../../../components/navigation/topnavigation/TopNavigation";
import close from "../../../assets/icons/close.svg";
import BookList from "../../../components/content/card/Book/List";
import { createPortal } from "react-dom";

interface DateFocusBookModalProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: string | null;
}

function formatDateLabel(date?: string | null) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

export default function DateFocusBookModal({
  open,
  onClose,
  selectedDate,
}: DateFocusBookModalProps) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="min-w-[375px] rounded-t-[16px] bg-gray-15 pt-4 pb-8 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <TopNavigation
          left={
            <div className="w-10 h-10" />
          }
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
          <BookList
            imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop"
            title="[국내도서] 혼모노"
            author="성해나"
            type="READINGORDONE"
            typeLabel="01:00:00"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}