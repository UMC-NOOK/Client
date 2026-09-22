// 닫힘은 현재 방문 중에만 유지한다. 로그인 토큰의 수명과는 무관하다.
let dismissed = false;
const listeners = new Set<() => void>();

export function subscribeBottomBanner(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setDismissed(value: boolean) {
  if (dismissed === value) return;
  dismissed = value;
  listeners.forEach((listener) => listener());
}

export function isBottomBannerDismissed() {
  return dismissed;
}

export function dismissBottomBanner() {
  setDismissed(true);
}

export function resetBottomBanner() {
  setDismissed(false);
}

export function trackBottomBannerVisit() {
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") resetBottomBanner();
  };
  const handlePageShow = (event: PageTransitionEvent) => {
    // 뒤로 가기로 복원된 페이지는 메모리와 React 상태도 그대로 복원된다.
    if (event.persisted) resetBottomBanner();
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pageshow", handlePageShow);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pageshow", handlePageShow);
  };
}
