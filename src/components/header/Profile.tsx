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

interface ProfileProps {
  isLogin: boolean;
}

const Profile = ({ isLogin }: ProfileProps) => {
  const data = {
    name: '경민',
    email: 'nook123@gmail.com',
  };
  const [isClick, setIsClick] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(data);
  return (
    <div
      className={clsx('relative', {
        invisible: !isLogin,
        visible: isLogin,
      })}
    >
      <button onClick={() => setIsClick((prev) => !prev)}>
        <img
          src={profileImg}
          alt="프로필 이미지"
          className="w-14 h-14 max-w-[28px] max-h-[28px] object-contain"
        />
      </button>
      <div
        className={clsx(
          'w-[20.6rem] h-[21.1rem] bg-[rgba(31,28,25,1)] rounded-[8px] absolute top-full -right-2 mt-3 z-10 flex flex-col justify-center items-start px-5 pt-6 pb-10 gap-3',
          {
            hidden: !isClick,
            block: isClick,
          },
        )}
      >
        <div className="w-93 h-26 px-7 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl cursor-pointer">
          <div className="flex gap-5 relative items-center">
            <img
              src={profileImg}
              alt="프로필 이미지"
              className="w-14 h-14 max-w-[30px] max-h-[30px] object-contain"
            />
            <div className="flex flex-col items-start">
              <p className="text-sm font-normal text-nook-100">
                {userData.name}
              </p>
              <p className="text-xs font-normal text-nook-100">
                {userData.email}
              </p>
            </div>
          </div>
        </div>

        <p className="w-[85%] mx-auto border-b-1 border-[rgba(211,211,211,0.6)]" />

        <div className="flex flex-col items-start gap-1.5">
          <div className="flex justify-start w-93 h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl cursor-pointer">
            <img
              src={settingImg}
              alt="톱니바퀴 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">설정</p>
          </div>
          <div className="flex justify-start w-93 h-15 px-7 items-center gap-4 hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl cursor-pointer">
            <img
              src={questionImg}
              alt="도움말 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[12px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">도움말</p>
          </div>
        </div>

        <p className="w-[85%] mx-auto border-b-1 border-[rgba(211,211,211,0.6)]" />

        <div className="w-93 h-15 px-7 mt-3 flex items-center hover:bg-[rgba(66,60,53,0.3)] hover:rounded-xl cursor-pointer">
          <div className="flex justify-center items-center gap-4">
            <img
              src={logoutImg}
              alt="로그아웃 아이콘"
              className="w-6 h-6 max-w-[12px] max-h-[18px] object-contain"
            />
            <p className="text-sm font-normal text-nook-100">로그아웃</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
