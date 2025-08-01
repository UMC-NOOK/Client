import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import { shouldHideHeader } from '../utils/layout';

const RootLayout = () => {
  const { pathname } = useLocation();
  const showHeader = !shouldHideHeader(pathname);

  return (
    <div>
      <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(35,23,9,1))]">
        {showHeader && (
          <div className="flex justify-center">
            <Header isLogin={true} />
          </div>
        )}
        <div className="flex justify-center">
          {!shouldHideHeader && <Header isLogin={true} />}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
