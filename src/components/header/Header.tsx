import Logo from './Logo';
import Navbar from './Navbar';
import Profile from './Profile';

interface HeaderProps {
  isLogin: boolean;
}

const Header = ({ isLogin }: HeaderProps) => {
  // const isLogin = useSignInStore((state) => state.isLogin);

  return (
    <header className="h-35 w-[1060px] flex items-center justify-between bg-[rgba(0,0,0,0.1)]">
      <Logo isLogin={isLogin} />
      <Navbar isLogin={isLogin} />
      <Profile isLogin={isLogin} />
    </header>
  );
};

export default Header;
