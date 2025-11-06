'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star, 
  Crown,
  Search,
  Grid,
  List,
  Award,
} from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Product {
  id?: string;
  name: string;
  description: string;
  period: string;
  material: string;
  technique: string;
  image: string;
  category: string;
  historicalInfo: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categories = ['Premium', 'Antik', 'Modern', 'El İşi'];
const periods = ['16. Yüzyıl', '19. Yüzyıl', '1920\'ler', 'Bizans Dönemi', '21. Yüzyıl', 'Günümüz'];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    period: '',
    material: '',
    technique: '',
    image: '',
    category: '',
    historicalInfo: '',
    isFeatured: false
  });

  // Firebase'den ürünleri çek
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Product);
      });
      setProducts(productsData);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Component mount olduğunda ürünleri çek
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddProduct = () => {
    setFormData({
      name: '',
      description: '',
      period: '',
      material: '',
      technique: '',
      image: '',
      category: '',
      historicalInfo: '',
      isFeatured: false
    });
    setShowAddModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      period: product.period,
      material: product.material,
      technique: product.technique,
      image: product.image,
      category: product.category,
      historicalInfo: product.historicalInfo,
      isFeatured: product.isFeatured
    });
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Ürün silinirken hata:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showAddModal) {
      try {
        const newProductData = {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const docRef = await addDoc(collection(db, 'products'), newProductData);
        const newProduct: Product = {
          ...newProductData,
          id: docRef.id
        };
        
        setProducts(prev => [newProduct, ...prev]);
        setShowAddModal(false);
      } catch (error) {
        console.error('Ürün eklenirken hata:', error);
      }
    } else if (showEditModal && selectedProduct) {
      try {
        const updatedProductData = {
          ...formData,
          updatedAt: new Date()
        };
        
        await updateDoc(doc(db, 'products', selectedProduct.id!), updatedProductData);
        
        const updatedProduct: Product = {
          ...selectedProduct,
          ...updatedProductData
        };
        
        setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
        setShowEditModal(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error('Ürün güncellenirken hata:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const stats = [
    {
      icon: Package,
      number: products.length.toString(),
      label: "Toplam Ürün",
      description: "Koleksiyon parçası"
    },
    {
      icon: Star,
      number: products.filter(p => p.isFeatured).length.toString(),
      label: "Öne Çıkan",
      description: "Özel ürünler"
    },
    {
      icon: Crown,
      number: products.filter(p => p.category === 'Premium').length.toString(),
      label: "Premium",
      description: "Lüks parçalar"
    },
    {
      icon: Award,
      number: products.filter(p => p.category === 'Antik').length.toString(),
      label: "Antik",
      description: "Tarihi eserler"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-2xl p-6 border border-amber-400/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ürün Yönetimi</h2>
              <p className="text-gray-300">Koleksiyon ürünlerini ekleyin, düzenleyin ve yönetin</p>
            </div>
          </div>
          <button
            onClick={handleAddProduct}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-xl font-medium hover:from-amber-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün Ekle
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.number}</p>
                </div>
                <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent backdrop-blur-sm"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex border border-white/20 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-amber-400 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-amber-400 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Ürünler yükleniyor...</h3>
            <p className="text-gray-400">Lütfen bekleyin.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Henüz ürün yok</h3>
            <p className="text-gray-400">İlk ürünü ekleyerek başlayın</p>
          </div>
        ) : (
          <div className={`grid gap-6 p-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className={`${viewMode === 'list' ? 'w-48' : 'w-full'} aspect-square overflow-hidden rounded-t-2xl ${viewMode === 'list' ? 'rounded-l-2xl rounded-t-none' : ''} relative`}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Öne Çıkan
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                    {product.category}
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                      {product.period}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="p-2 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id!)}
                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-300">Malzeme:</span>
                      <span className="text-gray-400">{product.material}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-300">Teknik:</span>
                      <span className="text-gray-400">{product.technique}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    Güncellenme: {product.updatedAt.toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-2xl rounded-2xl bg-gray-800/95 backdrop-blur-xl border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {showAddModal ? 'Yeni Ürün Ekle' : 'Ürün Düzenle'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Ürün Adı *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Ürün adını girin"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Kategori *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Kategori seçin</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Dönem *
                    </label>
                    <select
                      name="period"
                      required
                      value={formData.period}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Dönem seçin</option>
                      {periods.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Malzeme *
                    </label>
                    <input
                      type="text"
                      name="material"
                      required
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Örn: 18 Ayar Altın"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Teknik *
                    </label>
                    <input
                      type="text"
                      name="technique"
                      required
                      value={formData.technique}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="Örn: El İşçiliği"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Resim URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Açıklama *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Ürün açıklamasını girin"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Tarihi Bilgi
                  </label>
                  <textarea
                    name="historicalInfo"
                    rows={4}
                    value={formData.historicalInfo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Ürünün tarihi ve kültürel bilgilerini girin"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-amber-400 bg-white/10 border-white/20 rounded focus:ring-amber-400 focus:ring-2"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-gray-300">
                    Öne çıkan ürün olarak işaretle
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {showAddModal ? 'Ürün Ekle' : 'Güncelle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-2xl rounded-2xl bg-gray-800/95 backdrop-blur-xl border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Ürün Detayı
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
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
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Öne Çıkan
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                      {selectedProduct.category}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Dönem</label>
                      <p className="text-white">{selectedProduct.period}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Kategori</label>
                      <p className="text-white">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Malzeme</label>
                      <p className="text-white">{selectedProduct.material}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Teknik</label>
                      <p className="text-white">{selectedProduct.technique}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tarihi Bilgi</label>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <p className="text-white leading-relaxed">{selectedProduct.historicalInfo}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleEditProduct(selectedProduct);
                      }}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Edit className="w-4 h-4 mr-2 inline" />
                      Düzenle
                    </button>
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 border border-white/20"
                    >
                      Kapat
                    </button>
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
