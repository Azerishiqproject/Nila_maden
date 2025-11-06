import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3, DollarSign, Shield, Star, Info, AlertTriangle, Award, Target, PieChart } from 'lucide-react';
import { Navbar, Footer, FAQSection } from '@/components';
import { config } from '@/lib/config';

// FAQ data for investment
const investmentFAQ = [
  {
    question: "Altın yatırımında minimum tutar nedir?",
    answer: `Altın yatırımında minimum tutar ${config.investment.etfMin} TL'dir. Bu tutarla gram altın alabilir ve yatırımınıza başlayabilirsiniz.`
  },
  {
    question: "Yatırım danışmanlığı hizmeti ücretli mi?",
    answer: "İlk danışmanlık seansı ücretsizdir. Devam eden danışmanlık hizmetleri için aylık paket ücretleri bulunmaktadır."
  },
  {
    question: "Altın ETF nedir ve nasıl alınır?",
    answer: "Altın ETF, altın fiyatlarına endeksli borsa yatırım fonudur. Borsa hesabınızdan kolayca alım-satım yapabilirsiniz."
  },
  {
    question: "Vadeli işlemlerde risk yönetimi nasıl yapılır?",
    answer: "Vadeli işlemlerde stop-loss emirleri kullanarak risk yönetimi yapılır. Ayrıca pozisyon büyüklüğü toplam portföyün %10'unu geçmemelidir."
  },
  {
    question: "Altın yatırımında vergi var mı?",
    answer: "Altın yatırımında elde edilen kazançlar için %10 oranında stopaj vergisi alınmaktadır. Bu vergi otomatik olarak kesintilir."
  }
];

// Investment data
const investmentProducts = [
  {
    id: 1,
    name: "Gram Altın Yatırımı",
    currentPrice: 2150.50,
    change: 12.75,
    changePercent: 0.60,
    trend: "up",
    risk: "Düşük",
    return: "8-12%",
    minAmount: config.investment.gramGoldMin,
    category: "Altın",
    description: "En güvenli altın yatırım aracı"
  },
  {
    id: 2,
    name: "Altın ETF",
    currentPrice: 185.30,
    change: -2.15,
    changePercent: -1.15,
    trend: "down",
    risk: "Orta",
    return: "10-15%",
    minAmount: config.investment.etfMin,
    category: "ETF",
    description: "Borsada işlem gören altın fonu"
  },
  {
    id: 3,
    name: "Altın Madeni Hisse",
    currentPrice: 45.80,
    change: 1.25,
    changePercent: 2.80,
    trend: "up",
    risk: "Yüksek",
    return: "15-25%",
    minAmount: config.investment.stockMin,
    category: "Hisse",
    description: "Altın madeni şirketleri hisseleri"
  },
  {
    id: 4,
    name: "Altın Vadeli İşlem",
    currentPrice: 2180.00,
    change: 18.50,
    changePercent: 0.85,
    trend: "up",
    risk: "Çok Yüksek",
    return: "20-40%",
    minAmount: config.investment.minAmount,
    category: "Vadeli",
    description: "Yüksek riskli vadeli işlemler"
  }
];

// Investment strategies
const investmentStrategies = [
  {
    id: 1,
    name: "Konservatif Strateji",
    risk: "Düşük",
    return: "5-8%",
    description: "Güvenli altın yatırımı odaklı",
    features: ["Gram altın", "Altın ETF", "Düşük risk"],
    icon: Shield
  },
  {
    id: 2,
    name: "Dengeli Strateji",
    risk: "Orta",
    return: "8-15%",
    description: "Risk ve getiri dengesi",
    features: ["Altın ETF", "Hisse senedi", "Orta risk"],
    icon: Target
  },
  {
    id: 3,
    name: "Agresif Strateji",
    risk: "Yüksek",
    return: "15-30%",
    description: "Yüksek getiri odaklı",
    features: ["Vadeli işlemler", "Maden hisseleri", "Yüksek risk"],
    icon: TrendingUp
  }
];

// Market analysis
const marketAnalysis = {
  goldTrend: "Yükseliş",
  marketSentiment: "Pozitif",
  volatility: "Orta",
  recommendation: "Alım"
};

export default function YatirimPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.paisabazaar.com/wp-content/uploads/2018/08/Gold-Investments.jpg')`
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
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">YATIRIM STRATEJİLERİ</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Altın Yatırımı
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Uzman danışmanlığı ile güvenli ve karlı altın yatırımları yapın
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-6"></div>
            
            <p className="text-sm md:text-lg lg:text-xl text-white/85 font-light drop-shadow-md max-w-3xl leading-relaxed">
              Profesyonel ekibimizle birlikte en uygun yatırım stratejilerini belirleyin, 
              risk yönetimi yapın ve hedeflerinize ulaşın.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <PieChart className="w-3 h-3" />
              <span className="text-xs font-medium">YATIRIM ÖZETİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Yatırım Seçenekleri</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Farklı risk profillerine uygun altın yatırım araçları</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-900">₺2,150</div>
              <div className="text-gray-600">Gram Altın</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-900">₺185</div>
              <div className="text-gray-600">Altın ETF</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-900">₺45.8</div>
              <div className="text-gray-600">Maden Hisse</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-900">₺2,180</div>
              <div className="text-gray-600">Vadeli İşlem</div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Target className="w-3 h-3" />
              <span className="text-xs font-medium">YATIRIM ARAÇLARI</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Detaylı Yatırım Ürünleri</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Risk profilinize uygun yatırım seçeneklerini inceleyin</p>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-800 px-6 py-4">
              <div className="grid grid-cols-8 gap-4 text-white font-medium text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Ürün Adı</span>
                </div>
                <div className="text-center text-sm">Kategori</div>
                <div className="text-center text-sm">Güncel Fiyat</div>
                <div className="text-center text-sm">Risk</div>
                <div className="text-center text-sm">Beklenen Getiri</div>
                <div className="text-center text-sm">Min. Tutar</div>
                <div className="text-center text-sm">Trend</div>
                <div className="text-center text-sm">Değişim</div>
              </div>
            </div>
            {/* Table Body */}
            <div className="divide-y divide-gray-50">
              {investmentProducts.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`px-6 py-4 hover:bg-gray-50/50 transition-all duration-200 group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}`}
                >
                  <div className="grid grid-cols-8 gap-4 items-center">
                    {/* Product Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      </div>
                    </div>
                    {/* Category */}
                    <div className="text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{item.category}</span>
                    </div>
                    {/* Current Price */}
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">₺{item.currentPrice.toLocaleString()}</div>
                    </div>
                    {/* Risk Level */}
                    <div className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.risk === 'Düşük' ? 'bg-emerald-100 text-emerald-700' : item.risk === 'Orta' ? 'bg-amber-100 text-amber-700' : item.risk === 'Yüksek' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{item.risk}</span>
                    </div>
                    {/* Expected Return */}
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">{item.return}</div>
                    </div>
                    {/* Min Amount */}
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">₺{item.minAmount.toLocaleString()}</div>
                    </div>
                    {/* Trend */}
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto bg-gray-100`}>
                        {item.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                    {/* Change */}
                    <div className="text-center">
                      <div className={`flex flex-col items-center gap-1 ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        <div className="flex items-center gap-1">
                          {item.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span className="font-medium text-sm">{item.trend === 'up' ? '+' : ''}{item.change.toFixed(2)} ₺</span>
                        </div>
                        <span className="text-xs opacity-80">({item.trend === 'up' ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {investmentProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-base mb-1">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Kategori</div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{item.category}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Güncel Fiyat</div>
                    <div className="text-lg font-bold text-gray-900">₺{item.currentPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Risk</div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.risk === 'Düşük' ? 'bg-emerald-100 text-emerald-700' : item.risk === 'Orta' ? 'bg-amber-100 text-amber-700' : item.risk === 'Yüksek' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>{item.risk}</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Getiri</div>
                    <div className="text-sm font-semibold text-gray-900">{item.return}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Min. Tutar</div>
                    <div className="text-sm font-semibold text-gray-900">₺{item.minAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Değişim</div>
                    <div className={`flex items-center gap-1 ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      <span className="font-semibold text-sm">{item.trend === 'up' ? '+' : ''}{item.change.toFixed(2)} ₺</span>
                    </div>
                    <div className={`text-xs ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>({item.trend === 'up' ? '+' : ''}{item.changePercent.toFixed(2)}%)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <BarChart3 className="w-3 h-3" />
              <span className="text-xs font-medium">STRATEJİLER</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Yatırım Stratejileri</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Risk toleransınıza uygun yatırım stratejileri</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {investmentStrategies.map((strategy) => (
              <div key={strategy.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <strategy.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{strategy.name}</h3>
                    <p className="text-sm text-gray-600">{strategy.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Risk Seviyesi:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strategy.risk === 'Düşük' ? 'bg-emerald-100 text-emerald-700' :
                      strategy.risk === 'Orta' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {strategy.risk}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Beklenen Getiri:</span>
                    <span className="font-medium text-gray-900">{strategy.return}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-5">
                  {strategy.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-sm">
                  Stratejiyi İncele
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">PİYASA ANALİZİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Piyasa Analizi</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Güncel piyasa durumu ve uzman önerileri</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Piyasa Genel Durumu</h3>
                  <p className="text-sm text-gray-600">Günlük analiz raporu</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Altın Trendi</span>
                  <span className="font-medium text-emerald-600">{marketAnalysis.goldTrend}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Piyasa Duyarlılığı</span>
                  <span className="font-medium text-emerald-600">{marketAnalysis.marketSentiment}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Volatilite</span>
                  <span className="font-medium text-gray-900">{marketAnalysis.volatility}</span>
                </div>
                <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Öneri</span>
                  <span className="font-medium text-emerald-600">{marketAnalysis.recommendation}</span>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1 text-sm">Analiz Sonucu</h4>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      Altın piyasası güçlü bir yükseliş trendinde. Düşük risk profili olan yatırımcılar 
                      için gram altın, orta risk profili olanlar için ETF önerilir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Investment Tips */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Yatırım İpuçları</h3>
                  <p className="text-sm text-gray-600">Uzman önerileri</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Portföy Çeşitlendirmesi</h4>
                    <p className="text-gray-600 text-xs">Farklı altın yatırım araçlarını birleştirin</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Risk Yönetimi</h4>
                    <p className="text-gray-600 text-xs">Toplam portföyünüzün %10-20&apos;sini altına yatırın</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">Uzun Vadeli Düşünün</h4>
                    <p className="text-gray-600 text-xs">Altın yatırımında en az 3-5 yıl bekleyin</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1 text-sm">Önemli Not</h4>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      Yatırım kararlarınızı vermeden önce profesyonel danışmanlık almanızı öneririz. 
                      Geçmiş performans gelecekteki sonuçların garantisi değildir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Yatırım Hakkında Sıkça Sorulan Sorular"
        subtitle="Altın yatırımı ve stratejileri hakkında merak edilen konular"
        items={investmentFAQ}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Yatırım Yolculuğunuza Başlayın
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimizle birlikte en uygun yatırım stratejilerini belirleyin ve 
            finansal hedeflerinize ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm">
              Ücretsiz Danışmanlık
            </button>
            <button className="bg-transparent text-white border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-200">
              Demo Hesap Aç
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
