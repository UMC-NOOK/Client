import { Navigate, Outlet } from 'react-router-dom';
import useLoginStore from '../store/sign-in/useLoginStore';

const ProtectedRoute = () => {
  const { isLogin } = useLoginStore();

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
