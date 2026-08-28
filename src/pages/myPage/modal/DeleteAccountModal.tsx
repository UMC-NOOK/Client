import Solid from "../../../components/action/Button/Solid";

type DeleteAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="계정 삭제 모달 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          aria-describedby="delete-account-description"
          className="flex w-77.75 flex-col items-center gap-5 rounded-lg bg-gray-17 px-12 py-8"
        >
          <div className="flex flex-col items-center gap-1 self-stretch">
            <p
              id="delete-account-title"
              className="text-center text-body-16-b text-gray-90"
            >
              계정을 삭제하시겠어요?
            </p>
            <p
              id="delete-account-description"
              className="self-stretch text-center text-body-14-m text-gray-90"
            >
              삭제한 계정은 복구할 수 없어요.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <Solid
              text="취소"
              size="s"
              variant="secondary"
              onClick={onClose}
            />
            <Solid
              text="삭제"
              size="s"
              variant="alert"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
