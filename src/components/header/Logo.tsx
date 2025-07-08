import Nook from '../../assets/logo/NOOK.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/home');
  };
  return (
    <div
      className="flex justify-center items-center space-x-2 w-38 h-13 cursor-pointer"
      onClick={() => gotoHome()}
    >
      <img src={Nook} alt="logoNook" className="h-full object-contain" />
    </div>
  );
};

export default Logo;
