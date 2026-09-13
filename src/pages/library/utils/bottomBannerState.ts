// 페이지 이동 중에는 유지하고, 새로고침 시에는 초기화한다.
let dismissed = false;

export function isBottomBannerDismissed() {
  return dismissed;
}

export function dismissBottomBanner() {
  dismissed = true;
}

export function resetBottomBanner() {
  dismissed = false;
}
