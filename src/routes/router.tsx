import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../views/home/page';
import Lounge from '../views/lounge/page/lounge';
import BookInfoPage from '../views/lounge/page/book-info';
import Library from '../views/library/page';
import ReadingRoom from '../views/reading-room/page/my-reaing-room';
import NotFoundPage from '../views/404';
import MyPage from '../views/mypage/page';
import RootLayout from '../layouts/root-layout';
import AuthRouter from './authRouter';
import SearchResultPage from '../views/lounge/page/search/SearchResultPage';
import ReadNotePage from '../views/library/page/read-note';
import ReadNoteEditPage from '../views/library/page/read-note-edit';
import ReadingRoomList from '../views/reading-room/components/views/ReadingRoomList';
import PrivateReadingRoom from '../views/reading-room/page/private-reading-room';
import CreateReadingRoom from '../views/reading-room/components/views/CreateReadingRoom';
import DesignPage from '../views/home/page/DesignPage';
import ProtectedRoute from './ProtectedRoute';
import SettingsPage from '../views/home/components/ProfileSettingPage';
import SignInPage from '../views/auth/sign-in/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />,
      },
      {
        path: '/',
        element: <Navigate to="/signup" replace />,
      },
      {
        errorElement: <NotFoundPage />,
        element: <ProtectedRoute />,
        children: [
          {
            path: 'home',
            element: <Main />,
          },
          {
            path: 'home/DesignPage',
            element: <DesignPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
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
                path: 'book-info/:isbn',
                element: <BookInfoPage />,
              },
              {
                path: 'search-result',
                element: <SearchResultPage />,
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
              {
                path: ':bookId',
                element: <ReadNotePage />,
              },
              {
                path: ':bookId/edit',
                element: <ReadNoteEditPage />,
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
              {
                path: 'all',
                element: <ReadingRoomList />,
              },
              {
                path: ':roomId/:userId',
                element: <PrivateReadingRoom />,
              },
              {
                path: 'create',
                element: <CreateReadingRoom usage="create" />,
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
    ],
  },

  ...AuthRouter,
]);

export default router;
