import AuthLayout from '../layouts/auth-layout';
import KakaoCallback from '../views/auth/hook/kakao/kakaoCallBack';
import SignInPage from '../views/auth/sign-in/page';
import SignUpPage from '../views/auth/sign-up/page';
import Complete from '../views/auth/sign-up/page/complete';

const AuthRouter = [
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
    ],
  },
  {
    path: '/signup',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
      },
      {
        path: 'completed',
        element: <Complete />,
      },
    ],
  },
  {
    path: '/kakao/callback',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <KakaoCallback />,
      },
    ],
  },
];

export default AuthRouter;
