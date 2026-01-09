import { useNavigate } from 'react-router-dom';

const SignInBtn = () => {
  const navigate = useNavigate();
  const gotoSignIn = () => {
    navigate('/Login');
  };
  const gotoSignUp = () => {
    navigate('/signup');
  };
  return (
    <div className="flex justify-evenly items-center gap-3">
      <button
        className="bg-[rgba(43,58,37,0.5)] rounded-4xl text-white w-36 h-16 text-xs px-6"
        onClick={gotoSignIn}
      >
        로그인
      </button>
      <button
        className="bg-[rgba(43,58,37,0.5)] rounded-4xl text-white w-36 h-16 text-xs px-6"
        onClick={gotoSignUp}
      >
        로그아웃
      </button>
    </div>
  );
};

export default SignInBtn;
