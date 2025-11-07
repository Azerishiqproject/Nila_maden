'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOutUser, signUp } from '../../store/slices/authSlice';
import { 
  fetchProducts, 
  fetchGoldPrices,
  clearError 
} from '../../store/slices/adminSlice';
import Contact from './Contact';
import ProductManagement from './ProductManagement';
import BlogManagement from './BlogManagement';
import { 
  Shield, 
  Package, 
  DollarSign, 
  LogOut, 
  UserPlus, 
  MessageCircle, 
  FileText,
  Menu,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  isStaticAuth?: boolean;
}

export default function AdminDashboard({ isStaticAuth = false }: AdminDashboardProps) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state: { auth: { user: unknown; isAuthenticated: boolean } }) => state.auth);
  const { loading, error } = useAppSelector((state: { admin: { loading: boolean; error: string | null } }) => state.admin);
  
  const [activeTab, setActiveTab] = useState<'products' | 'prices' | 'contact' | 'blog'>('products');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts());
      dispatch(fetchGoldPrices());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const clearErrors = () => {
    dispatch(clearError());
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (createUserForm.password !== createUserForm.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    try {
      await dispatch(signUp({ 
        email: createUserForm.email, 
        password: createUserForm.password 
      })).unwrap();
      
      setShowCreateUser(false);
      setCreateUserForm({ email: '', password: '', confirmPassword: '' });
      alert('Admin kullanıcısı başarıyla oluşturuldu!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert(`Hata: ${errorMessage}`);
    }
  };

  const navigation = [
    {
      id: 'products',
      name: 'Ürün Yönetimi',
      icon: Package,
      description: 'Ürünleri ekle, düzenle ve sil'
    },
    {
      id: 'blog',
      name: 'Blog Yönetimi',
      icon: FileText,
      description: 'Blog yazılarını yönet'
    },
    {
      id: 'prices',
      name: 'Altın Fiyatları',
      icon: DollarSign,
      description: 'Altın fiyatlarını güncelle'
    },
    {
      id: 'contact',
      name: 'İletişim',
      icon: MessageCircle,
      description: 'Müşteri mesajlarını yönet'
    }
  ];

  // Firebase kullanıcısı yoksa ve statik giriş de yapılmamışsa kullanıcı oluşturma formunu göster
  if (!isAuthenticated && !user && !isStaticAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-300/10 to-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <header className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    Admin Paneli
                  </h1>
                  <p className="text-sm text-gray-300">
                    Firebase Kullanıcısı Oluştur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="max-w-md mx-auto z-100">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Admin Kullanıcısı Oluştur
                </h2>
                <p className="text-gray-300 mt-2">
                  Firebase authentication için admin kullanıcısı oluşturun
                </p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={createUserForm.email}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={createUserForm.password}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Güçlü bir şifre girin"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={createUserForm.confirmPassword}
                    onChange={(e) => setCreateUserForm({ ...createUserForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
                >
                  Admin Kullanıcısı Oluştur
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Kullanıcı oluşturulduktan sonra otomatik olarak giriş yapılacak
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/5 to-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-300/5 to-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-500/3 to-yellow-400/3 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Admin Paneli
                </h1>
                <p className="text-sm text-gray-300">
                  Yönetim Paneli
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Only show create admin button if no Firebase user exists */}
              {!user && (
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg touch-manipulation"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Admin Oluştur</span>
                  <span className="sm:hidden">Oluştur</span>
                </button>
              )}
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg touch-manipulation"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Çıkış Yap</span>
                <span className="sm:hidden">Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-100 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white">Navigasyon</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="mt-6 px-3">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as 'products' | 'prices' | 'contact' | 'blog');
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-4 text-left rounded-xl transition-all duration-200 touch-manipulation ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${activeTab === item.id ? 'text-white' : 'text-white/60'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs ${activeTab === item.id ? 'text-white/80' : 'text-white/50'}`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 min-h-0 overflow-auto">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
            {/* Error Display */}
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-300 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={clearErrors}
                    className="text-red-300 hover:text-red-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {!loading && (
              <div className="space-y-6">
                {activeTab === 'products' && <ProductManagement />}
                
                {activeTab === 'blog' && <BlogManagement />}
                
                {activeTab === 'prices' && (
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                    <div className="text-center">
                      <DollarSign className="mx-auto h-16 w-16 text-amber-400 mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Altın Fiyat Yönetimi</h3>
                      <p className="text-gray-300">Bu özellik yakında eklenecek</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'contact' && <Contact />}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Admin Creation Modal */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-[9999]">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-2xl rounded-2xl bg-gray-800/95 backdrop-blur-xl border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">
                  Admin Kullanıcısı Oluştur
                </h3>
                <button
                  onClick={() => setShowCreateUser(false)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-1">
                    E-posta
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    value={createUserForm.email}
                    onChange={(e) => setCreateUserForm({...createUserForm, email: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    placeholder="admin@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="modal-password" className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre
                  </label>
                  <input
                    id="modal-password"
                    name="password"
                    type="password"
                    required
                    value={createUserForm.password}
                    onChange={(e) => setCreateUserForm({...createUserForm, password: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    placeholder="Güçlü bir şifre girin"
                  />
                </div>
                
                <div>
                  <label htmlFor="modal-confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    id="modal-confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={createUserForm.confirmPassword}
                    onChange={(e) => setCreateUserForm({...createUserForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateUser(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
