export function shouldHideHeader(pathname: string): boolean {
  if (pathname === '/reading-room') return false;
  if (pathname.startsWith('/reading-room/')) return true;

  // 헤더바 숨기고 싶은 url 추가해주시면 됩니다!
  const hiddenPaths = ['/login', '/signup', '/intro'];

  return hiddenPaths.includes(pathname);
}
