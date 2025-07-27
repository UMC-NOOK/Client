import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';

const RootLayout = () => {
  // 헤더를 숨길 경로인지 판단
  const location = useLocation();
  const shouldHideHeader = /^\/library\/[^/]+\/edit$/.test(location.pathname);

  return (
    <div>
      <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(35,23,9,1))]">
        <div className="flex justify-center">
          {!shouldHideHeader && <Header isLogin={true} />}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
