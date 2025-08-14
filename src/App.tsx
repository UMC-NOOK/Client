import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </>
  );
}

export default App;