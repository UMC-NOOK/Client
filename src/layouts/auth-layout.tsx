import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const AuthLayout = () => {
  return (
    <div>
      <div className="min-h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(35,23,9,1))]">
        <div className="flex justify-center">
          <Header isLogin={false} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
