import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  // const token = localStorage.getItem('token');
  const token = useSelector((state: RootState) => state.user.jwt);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};
