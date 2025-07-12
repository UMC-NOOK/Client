import Logo from './Logo';
import Navbar from './Navbar';
import { useSignInStore } from '../../store/sign-in/useLoginStore';
import Profile from './Profile';

const Header = () => {
  const isLogin = useSignInStore((state) => state.isLogin);

  return (
    <header className="h-35 w-[150rem] flex items-center justify-evenly bg-[rgba(0,0,0,0.1)]">
      <Logo />
      <Navbar />
      <Profile />
    </header>
  );
};

export default Header;
