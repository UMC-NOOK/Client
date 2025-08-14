import kakao from '../../../assets/button/kakao/kakaoLogin.png';

const KakaoBtn = () => {
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthUrl;
  };

  return (
    <button
      className="w-full h-[5.2rem]"
      onClick={handleKakaoLogin}
      type="button"
    >
      <img src={kakao} alt="카카오 로그인 버튼" />
    </button>
  );
};

export default KakaoBtn;
