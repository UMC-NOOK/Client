// libraries
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// components
import TopNavigation from "../../components/navigation/topnavigation/TopNavigation";
import Divider from "../../components/layout/Divider";
import Emotion from "../../components/action/Chip/Emotion";
import BottomSheet from "../../components/presentation/modal/bottomsheet/Origin";
import PopupConfirmModal from "../../components/presentation/modal/popup/Origin";
// assets
import chevron_left from "../../assets/icons/chevron_left.svg";

export default function ViewReportPage() {
  const { id, recordId } = useParams();
  const record = history.state?.usr?.record;
  const bookTitle = history.state?.usr?.bookTitle || "책 제목 없음";
  const navigate = useNavigate();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start w-full h-dvh overflow-y-hidden gap-5 relative">
      <div className="flex flex-col items-center justify-start w-full gap-2">
        <TopNavigation
          left={<img src={chevron_left} alt="back" />}
          onClickLeft={() => navigate(-1)}
          center={bookTitle}
        />
        <Divider width="full" />
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-5 overflow-y-auto &::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-30">
        <div className="text-gray-90 text-body-13-r">
          {record ? record.content : "내용을 불러올 수 없습니다."}
        </div>
        {record?.emotion ? (
          <Emotion size="m" emojiKey={record.emotion} active />
        ) : null}
        {record?.imageUrl.length > 0 ? (
          <div className="flex flex-col gap-1 w-full">
            {record.imageUrl.map((url: string) => (
              <img
                src={url}
                alt="record"
                className="w-full rounded-xs object-cover"
              />
            ))}
          </div>
        ) : null}
      </div>
      <BottomSheet
        open={true}
        onClose={() => {}}
        overlay={false}
        footer={{
          layout: "double",
          sizeMode: "split",
          leftVariant: "alert",
          leftLabel: "삭제",
          rightLabel: "기록 수정하기",
          onLeftClick: () => {
            setDeleteConfirmOpen(true);
          },
          onRightClick: () => {
            navigate(`/report/${id}/${recordId}/edit`, {
              state: { bookTitle, record },
            });
          },
        }}
      />
      {deleteConfirmOpen && (
        <PopupConfirmModal
          open={true}
          onClose={() => setDeleteConfirmOpen(false)}
          title="독서 기록을 삭제할까요?"
          description="삭제한 기록은 복구할 수 없어요."
          leftLabel="취소"
          rightLabel="삭제"
          onLeftClick={() => setDeleteConfirmOpen(false)}
          onRightClick={() => {
            // Handle delete logic here
            setDeleteConfirmOpen(false);
          }}
        />
      )}
    </div>
  );
}
