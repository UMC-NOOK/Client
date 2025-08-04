import Nook from '../../assets/logo/NOOK.png';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  isLogin: boolean;
}

const Logo = ({ isLogin }: LogoProps) => {
  const navigate = useNavigate();
  const gotoHome = (isLogin: boolean) => {
    if (isLogin) {
      navigate('/home');
    }
  };
  return (
    <div
      className="flex justify-center items-center space-x-2 w-38 h-13 cursor-pointer"
      onClick={() => gotoHome(isLogin)}
    >
      <img src={Nook} alt="logoNook" className="h-full object-contain" />
    </div>
  );
};

export default Logo;
