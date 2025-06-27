import { createBrowserRouter } from 'react-router-dom';

import Main from '../views/home/page';
import Lounge from '../views/lounge/page';
import Library from '../views/library/page';
import ReadingRoom from '../views/reading-room/page';
import NotFoundPage from '../views/404';
import MyPage from '../views/mypage/page';
import RootLayout from '../layouts/root-layout';
import AuthRouter from './authRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: 'home',
        element: <Main />,
      },

      {
        path: 'lounge',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <Lounge />,
          },
          {
            path: 'book-info',
            element: <Lounge />,
          },
        ],
      },

      {
        path: 'library',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <Library />,
          },
        ],
      },

      {
        path: 'reading-room',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <ReadingRoom />,
          },
        ],
      },

      {
        path: 'mypage',
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <MyPage />,
          },
        ],
      },
    ],
  },

  ...AuthRouter,
]);

export default router;
