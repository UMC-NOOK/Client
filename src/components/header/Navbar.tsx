import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const menus = [
    { name: '홈', path: '/home' },
    { name: '라운지', path: '/lounge' },
    { name: '서재', path: '/library' },
    { name: '리딩룸', path: '/reading-room' },
  ];

  const location = useLocation();

  return (
    <nav className="w-1/4 h-full py-4">
      <ul className="flex justify-evenly items-center text-base h-full">
        {menus.map((menu) => (
          <li
            key={menu.path}
            className={`px-6 py-3 transition 
              ${
                location.pathname === menu.path
                  ? 'text-nook-secondaey text-center font-semibold border-b-2 border-nook-secondaey'
                  : 'text-[rgba(211,211,211,0.5)] '
              }`}
          >
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-nook-secondaey text-center font-semibold'
                  : 'text-[rgba(211,211,211,0.5)] '
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
