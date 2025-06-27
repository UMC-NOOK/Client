import React from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
import { useSignInStore } from '../../store/sign-in/useLoginStore';
import SignInBtn from './SignInBtn';
import UserInfo from './UserInfo';

const Header = () => {
  const isLogin = useSignInStore((state) => state.isLogin);

  return (
    <header className="h-28 flex items-center justify-between bg-[rgba(7,12,6,1)] shadow-[0_4px_10px_0_rgba(73,73,73,0.04)] px-28">
      <Logo />
      <Navbar />
      {isLogin ? <UserInfo /> : <SignInBtn />}
    </header>
  );
};

export default Header;
