import { useState } from 'react';
import profileImg from '../../assets/header/Subtract.svg';
import settingImg from '../../assets/header/Vector.svg';
import logoutImg from '../../assets/header/Group.svg';
import questionImg from '../../assets/header/Frame 238038.png';
import clsx from 'clsx';

type UserData = {
  name: string;
  email: string;
};

const Profile = () => {
  const data = {
    name: '경민',
    email: 'nook123@gmail.com',
  };
  const [isClick, setIsClick] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(data);
  return (
    <div className="relative">
      <button onClick={() => setIsClick((prev) => !prev)}>
        <img
          src={profileImg}
          alt="프로필 이미지"
          className="w-14 h-14 max-w-[28px] max-h-[28px] object-contain"
        />
      </button>
      <div
        className={clsx(
          'w-[20.6rem] h-[19.1rem] bg-[rgba(31,28,25,1)] rounded-[8px] absolute top-full -right-2 mt-3 z-10 flex flex-col justify-center items-start px-12 py-6 gap-8',
          {
            hidden: !isClick,
            block: isClick,
          },
        )}
      >
        <div className="flex gap-5 relative">
          <img
            src={profileImg}
            alt="프로필 이미지"
            className="w-14 h-14 max-w-[28px] max-h-[28px] object-contain"
          />
          <div className="flex flex-col items-start ">
            <p className="text-xs font-normal text-nook-100">{userData.name}</p>
            <p className="text-[1rem] font-normal text-nook-100">
              {userData.email}
            </p>
          </div>
        </div>
        <p className="w-full border-b-1 border-[rgba(211,211,211,0.6)]" />
        <div className="flex flex-col items-start gap-5">
          <div className="flex justify-center items-center gap-4">
            <img
              src={settingImg}
              alt="톱니바퀴 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-xs font-normal text-nook-100">설정</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <img
              src={questionImg}
              alt="도움말 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-xs font-normal text-nook-100">도움말</p>
          </div>
        </div>
        <p className="w-full border-b-1 border-[rgba(211,211,211,0.6)]" />
        <div>
          <div className="flex justify-center items-center gap-4">
            <img
              src={logoutImg}
              alt="로그아웃 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[18px] object-contain"
            />
            <p className="text-xs font-normal text-nook-100">로그아웃</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
