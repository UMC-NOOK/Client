import logo from '../../../assets/logo/NOOK_1.png';
import union from '../../../assets/logo/Union.png';

const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <img
          src={union}
          alt=""
          className="w-[2.5rem] h-[4.4rem] max-w-[25.41px] max-h-[44.16px] object-contain"
        />
        <img
          src={logo}
          alt=""
          className="w-[14.3rem] h-[5rem] max-w-[143px] max-h-[50px] object-contain"
        />
      </div>
      <p className="text-[1.6rem] font-light text-nook-100">
        온전한 독서를 위한 기록 서비스
      </p>
    </div>
  );
};

export default Logo;
