
import { useEffect, useState } from "react";
import PopupConfirmModal from "../presentation/modal/popup/Origin";

type RateLimitMessage = {
  title: string;
  description: string;
};

export default function RateLimitModal() {
  const [message, setMessage] =
    useState<RateLimitMessage | null>(null);

  useEffect(() => {
    const handleRateLimit = (event: Event) => {
      const { detail } =
        event as CustomEvent<RateLimitMessage>;

      // 이미 팝업이 열려 있으면 중복 표시하지 않음
      setMessage((current) => current ?? detail);
    };

    window.addEventListener(
      "api-rate-limit",
      handleRateLimit,
    );

    return () => {
      window.removeEventListener(
        "api-rate-limit",
        handleRateLimit,
      );
    };
  }, []);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <PopupConfirmModal
      open={message !== null}
      title={message?.title ?? ""}
      description={message?.description ?? ""}
      rightLabel="확인"
      onRightClick={handleClose}
      onClose={handleClose}
      closeOnOverlayClick={false}
      ariaLabel="요청 한도 초과 안내"
    />
  );
}
