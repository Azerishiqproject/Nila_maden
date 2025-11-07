'use client';

import Image from 'next/image';
import { Crown, Star, Eye, Search, Grid, List, Award, Users, TrendingUp, Shield, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Navbar, Footer, FAQSection } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchCollectionProducts,
  setSelectedProduct,
  clearSelectedProduct,
  setCategoryFilter,
  setSearchQuery,
  selectFilteredProducts,
  selectCollectionLoading,
  selectCollectionError,
  selectSelectedProduct,
  selectCollectionFilters,
} from '@/store/slices/collectionSlice';

export default function KoleksiyonlarimizPage() {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Redux state
  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectCollectionLoading);
  const error = useAppSelector(selectCollectionError);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const filters = useAppSelector(selectCollectionFilters);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchCollectionProducts());
  }, [dispatch]);

  // Handle product selection
  const handleProductClick = (product: typeof products[0]) => {
    dispatch(setSelectedProduct(product));
    setShowProductModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowProductModal(false);
    dispatch(clearSelectedProduct());
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category));
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Get all products for stats (not filtered)
  const allProducts = useAppSelector((state) => state.collection.products);

  // Dynamic stats based on actual products
  const collectionStats = [
    {
      icon: Package,
      number: allProducts.length.toString(),
      label: "Koleksiyon Parçası",
      description: "Nadir ve değerli eserler"
    },
    {
      icon: Users,
      number: "25K+",
      label: "Koleksiyoner",
      description: "Güvenilir müşteri ağı"
    },
    {
      icon: Award,
      number: "50+",
      label: "Yıllık Deneyim",
      description: "Sektörde uzmanlık"
    },
    {
      icon: Shield,
      number: "100%",
      label: "Güvenlik",
      description: "SSL korumalı platform"
    }
  ];

  // FAQ items - keeping these as they're general information
  const faqItems = [
    {
      question: "Koleksiyon parçalarının orijinalliği nasıl garanti ediliyor?",
      answer: "Tüm koleksiyon parçalarımız uzman gemologlar tarafından incelenir ve sertifikalandırılır. Her parça için detaylı analiz raporu ve orijinallik belgesi verilir."
    },
    {
      question: "Koleksiyon parçalarında ödeme seçenekleri nelerdir?",
      answer: "Koleksiyon parçalarında peşin ödeme, taksitli ödeme ve leasing seçenekleri sunuyoruz. Ayrıca özel koleksiyon parçaları için özel finansman çözümleri de mevcuttur."
    },
    {
      question: "Koleksiyon parçalarının değer takibi yapılıyor mu?",
      answer: "Evet, tüm koleksiyon parçalarımızın değer takibi yapılmaktadır. Düzenli olarak piyasa analizi yapılarak güncel değer bilgileri paylaşılır."
    },
    {
      question: "Koleksiyon parçalarında sigorta hizmeti veriyor musunuz?",
      answer: "Evet, tüm koleksiyon parçalarımız için kapsamlı sigorta hizmeti sunuyoruz. Hırsızlık, hasar ve kayıp durumlarında tam koruma sağlanır."
    },
    {
      question: "Koleksiyon parçalarının teslimatı nasıl yapılıyor?",
      answer: "Koleksiyon parçalarının teslimatı özel güvenlik ekibi eşliğinde, sigortalı olarak yapılmaktadır. Teslimat süresi parçanın konumuna göre 1-7 gün arasında değişir."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Koleksiyon yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1920&h=1080&fit=crop')`
            }}
          ></div>
          
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        
        {/* Text Content - Sol taraftan başlıyor */}
        <div className="absolute inset-0 flex items-center">
          <div className="text-left text-white max-w-4xl px-12 md:px-16 lg:px-20 z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm">ÖZEL KOLEKSİYONLAR</span>
            </div>
            
            <h1 className="text-4xl  md:text-7xl font-bold text-white mb-6 leading-tight">
              Koleksiyonlarımız
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Dünyanın en değerli altın koleksiyonlarından seçkin parçalar
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-6"></div>
            
            <p className="text-sm md:text-lg lg:text-xl text-white/85 font-light drop-shadow-md max-w-3xl leading-relaxed">
              Antik dönemlerden günümüze, her dönemin en nadide altın eserlerini 
              sizler için özenle seçtik ve koruduk.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">KOLEKSİYON İSTATİSTİKLERİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Rakamlarla Koleksiyonlarımız</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">25 yıllık deneyimimizle oluşturduğumuz değerli koleksiyonlar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold mb-2 text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
                <div className="text-sm text-gray-500 mt-2">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
                <Star className="w-3 h-3" />
                <span className="text-xs font-medium">KOLEKSİYON ÖNE ÇIKANLARI</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Koleksiyon Öne Çıkanları</h2>
              <p className="text-lg text-gray-600">Tarihi ve sanatsal değeri olan nadide altın eserlerimizden seçkiler</p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-0">
              <div className="relative">
                <Search className="absolute left-3 text-black top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Koleksiyon ara..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filters.category}
                onChange={(e) => {
                  handleCategoryChange(e.target.value);
                }}
                className="px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="Premium">Premium</option>
                <option value="Antik">Antik</option>
                <option value="Modern">Modern</option>
                <option value="El İşi">El İşi</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Collection Highlights Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ürünler yükleniyor...</h3>
              <p className="text-gray-600">Lütfen bekleyin.</p>
            </div>
          ) : allProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz koleksiyon yok</h3>
              <p className="text-gray-600">Koleksiyon parçaları yakında eklenecek</p>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {currentProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`${viewMode === 'list' ? 'w-48' : 'w-full'} aspect-square overflow-hidden relative`}>
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {product.isFeatured && (
                      <div className="absolute top-3 right-3 bg-white text-amber-600 text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                        ÖNE ÇIKAN
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium border border-gray-200">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {product.period}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700">Malzeme:</span>
                        <span className="text-gray-600">{product.material}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700">Teknik:</span>
                        <span className="text-gray-600">{product.technique}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {product.historicalInfo}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleProductClick(product)}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Önceki</span>
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              currentPage === page
                                ? 'bg-amber-500 text-white border-amber-500'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span>Sonraki</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Sayfa {currentPage} / {totalPages} ({products.length} koleksiyon parçası)
                </div>
              )}
            </>
          )}
          
          {!loading && products.length === 0 && allProducts.length > 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sonuç bulunamadı</h3>
              <p className="text-gray-600">Arama kriterlerinize uygun koleksiyon parçası bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Koleksiyon Hakkında Sık Sorulan Sorular"
        subtitle="Koleksiyonlarımız hakkında merak edilenler"
        items={faqItems}
      />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Ürün Detayı</h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="aspect-square overflow-hidden rounded-2xl relative">
                    <Image 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    {selectedProduct.isFeatured && (
                      <div className="absolute top-4 right-4 bg-white text-amber-600 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Öne Çıkan
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-lg text-sm font-medium border border-gray-200">
                      {selectedProduct.category}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{selectedProduct.name}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dönem</label>
                      <p className="text-gray-900 font-semibold">{selectedProduct.period}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <p className="text-gray-900 font-semibold">{selectedProduct.category}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Malzeme</label>
                      <p className="text-gray-900 font-semibold">{selectedProduct.material}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teknik</label>
                      <p className="text-gray-900 font-semibold">{selectedProduct.technique}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tarihi Bilgi</label>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedProduct.historicalInfo}</p>
                    </div>
                  </div>
                  
                
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
