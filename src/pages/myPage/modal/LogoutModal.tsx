import PopupConfirmModal from "../../../components/presentation/modal/popup/Origin";

type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onClick?: ()=> void;
};

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
  onClick
}: LogoutModalProps) {
  return (
    <PopupConfirmModal
      open={open}
      title="로그아웃 하시겠어요?"
      description="언제든지 다시 로그인할 수 있어요."
      leftLabel="취소"
      rightLabel="로그아웃"
      onLeftClick={onClose}
      onRightClick={onConfirm}
      onClose={onClose}
      ariaLabel="로그아웃 확인"
      onClick = {onClick}
    />
  );
}
