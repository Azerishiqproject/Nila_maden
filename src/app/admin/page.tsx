'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { checkAuthState } from '../../store/slices/authSlice';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminDashboard from '../../components/admin/AdminDashboard';

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state: { auth: { isAuthenticated: boolean; loading: boolean } }) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  // Sadece Firebase authentication varsa dashboard'u göster
  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  // Giriş yapılmamışsa login formunu göster
  return <AdminLogin />;
}
