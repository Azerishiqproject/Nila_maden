'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signIn, checkAuthState } from '../../store/slices/authSlice';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { validateConfig } from '@/lib/config';

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: { auth: { loading: boolean; error: string | null; isAuthenticated: boolean } }) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Firebase authentication kontrolü
  useEffect(() => {
    setIsCheckingAuth(true);
    // Firebase config check (build-time env presence)
    try {
      validateConfig();
    } catch {
      // Config validation failed
    }
    
    dispatch(checkAuthState())
      .unwrap()
      .then(() => {
        // Auth check completed
      })
      .catch(() => {
        // Firebase auth check failed, will use static login
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, [dispatch]);

  // Giriş işlemi
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!email || !password) {
      setLoginError('Lütfen e-posta ve şifre girin!');
      return;
    }

    // Sadece Firebase ile giriş
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        // Firebase giriş başarılı
      })
      .catch(() => {
        setLoginError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      });
  };

  // Auth kontrolü yapılıyorsa loading göster
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center z-10 relative">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-400 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-white mb-2">Güvenlik Kontrolü</h3>
          <p className="text-gray-300">Sistem güvenliği kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  // Ana login formu
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-300/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-500/5 to-yellow-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full z-10 relative">
        {/* Glassmorphism card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Admin Girişi
            </h2>
            <p className="text-gray-300 text-sm">
              Güvenli yönetim paneline erişim
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifreniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center p-3 rounded-xl backdrop-blur-sm">
                {loginError}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-amber-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Static login bilgileri tamamen kaldırıldı */}

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              🔒 SSL şifreli güvenli bağlantı
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
