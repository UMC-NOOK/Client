import { createBrowserRouter } from 'react-router-dom';
import Main from '../views/home/page';
import Lounge from '../views/lounge/page/lounge';
import BookInfoPage from '../views/lounge/page/book-info';
import Library from '../views/library/page';
import ReadingRoom from '../views/reading-room/page';
import NotFoundPage from '../views/404';
import MyPage from '../views/mypage/page';
import RootLayout from '../layouts/root-layout';
import AuthRouter from './authRouter';
import SearchResultPage from '../views/lounge/page/search/SearchResultPage';
import ReadNotePage from '../views/library/page/read-note';
import ReadNoteEditPage from '../views/library/page/read-note-edit';
import ReadingRoomList from '../views/reading-room/components/views/ReadingRoomList';
import CreateReadingRoom from '../views/reading-room/components/views/CreateReadingRoom';
import DesignPage from '../views/home/page/DesignPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'home',
        element: <Main />,
      },
      {
        path: 'home/DesignPage',
        element: <DesignPage />, 
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
            path: ':id',
            element: <ReadNotePage />,
          },
          {
            path: ':id/edit',
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
            element: <ReadingRoomList/>
          },
          {
            path: 'create',
            element: <CreateReadingRoom/>
          }
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
