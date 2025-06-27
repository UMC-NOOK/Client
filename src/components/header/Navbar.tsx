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
      <ul className="flex justify-around items-center text-base bg-[rgba(43,58,37,0.5)] h-full rounded-4xl">
        {menus.map((menu) => (
          <li
            key={menu.path}
            className={`px-6 py-3 rounded-4xl transition 
              ${
                location.pathname === menu.path
                  ? 'bg-[rgba(54,72,46,1)] text-white text-center'
                  : 'text-white hover:bg-nook-forest-900'
              }`}
          >
            <NavLink
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? 'bg-[rgba(54,72,46,1)] text-white text-center'
                  : 'text-white hover:bg-nook-forest-900'
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
