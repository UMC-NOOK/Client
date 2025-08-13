// pages/KakaoCallback.tsx 또는 기존 컴포넌트에 추가
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import kakaoLogin from '../../apis/kakao';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    if (code) {
      handleKakaoCallback(code);
    } else {
      console.error('인가 코드가 없습니다');
      navigate('/login');
    }
  }, [location]);

  const handleKakaoCallback = async (code: string) => {
    try {
      const result = await kakaoLogin({ code });

      if (result) {
        localStorage.setItem('accessToken', result.token.accessToken);
        navigate('/home');
      }
    } catch (error) {
      alert(error);
      navigate('/login');
    }
  };

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
