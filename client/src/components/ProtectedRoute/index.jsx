import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

/**
 * 受保护的路由组件
 * 需要登录才能访问
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // 未登录，重定向到登录页
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
