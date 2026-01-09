import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLogin: boolean;
}

const Navbar = ({ isLogin }: NavbarProps) => {
  const menus = [
    { name: '홈', path: '/home' },
    { name: '라운지', path: '/lounge' },
    { name: '서재', path: '/library' },
    { name: '리딩룸', path: '/reading-room' },
  ];

  const location = useLocation();

  // 현재 경로가 메뉴 경로로 시작하는지 확인
  const isActiveMenu = (menuPath: string) => {
    return (
      location.pathname === menuPath ||
      location.pathname.startsWith(menuPath + '/')
    );
  };

  return (
    <nav
      className={clsx('w-1/4 h-full py-4', {
        invisible: !isLogin,
        visible: isLogin,
      })}
    >
      <ul className="flex justify-evenly items-center text-base h-full">
        {menus.map((menu) => (
          <li
            key={menu.path}
            className={`px-6 py-3 transition ${
              isActiveMenu(menu.path)
                ? 'text-nook-secondaey text-center font-semibold border-b-1 border-nook-secondaey'
                : 'text-[rgba(211,211,211,0.5)] font-normal text-[1.6rem]'
            }`}
          >
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith(menu.path + '/')
                  ? 'text-nook-secondaey text-center font-semibold'
                  : 'text-[rgba(211,211,211,0.5)] font-normal text-[1.6rem]'
              }
            >
              {menu.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
