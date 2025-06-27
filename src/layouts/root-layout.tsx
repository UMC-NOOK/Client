import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className="h-screen bg-[linear-gradient(to_bottom,rgba(12,14,9,1),rgba(0,53,44,1))]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
