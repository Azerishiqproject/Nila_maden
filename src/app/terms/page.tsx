'use client';

import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Shield, Users } from 'lucide-react';
import { Navbar, Footer } from '@/components';

const termsSections = [
  {
    icon: FileText,
    title: 'Genel Hükümler',
    content: 'Bu kullanım şartları, Kıymetli Maden web sitesini kullanımınızı ve hizmetlerimizden yararlanmanızı düzenlemektedir. Siteyi kullanarak bu şartları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen siteden ayrılın.'
  },
  {
    icon: Users,
    title: 'Kullanıcı Yükümlülükleri',
    content: 'Siteyi kullanırken, yasalara ve ahlak kurallarına uygun davranmakla yükümlüsünüz. Yanıltıcı bilgi vermek, başkalarının haklarını ihlal etmek, zararlı içerik paylaşmak veya sistemi kötüye kullanmak yasaktır. Bu tür davranışlar durumunda hesabınız askıya alınabilir veya kapatılabilir.'
  },
  {
    icon: Shield,
    title: 'Hizmet Kapsamı',
    content: 'Kıymetli Maden olarak altın alım-satım, yatırım danışmanlığı ve koleksiyon ürünleri hizmetleri sunmaktayız. Hizmetlerimiz, mevcut stok ve piyasa koşullarına göre değişiklik gösterebilir. Fiyatlar ve ürün bilgileri önceden haber verilmeksizin güncellenebilir.'
  },
  {
    icon: Scale,
    title: 'Ödeme ve İade',
    content: 'Ödemeler güvenli ödeme sistemleri üzerinden yapılmaktadır. İade ve iptal koşulları, ürün türüne göre değişiklik gösterebilir. İade talepleriniz, satın alma tarihinden itibaren 14 gün içinde yapılmalıdır. Ürünlerin orijinal ambalajında ve hasarsız olması gerekmektedir.'
  },
  {
    icon: AlertTriangle,
    title: 'Sorumluluk Sınırlamaları',
    content: 'Kıymetli Maden, web sitesinde yer alan bilgilerin doğruluğunu sağlamak için çaba gösterse de, hatalar veya eksiklikler olabilir. Sitede yer alan bilgilerden kaynaklanan zararlardan sorumlu tutulamayız. Yatırım kararlarınızı verirken mutlaka profesyonel danışmanlık almanızı öneririz.'
  },
  {
    icon: CheckCircle,
    title: 'Fikri Mülkiyet',
    content: 'Web sitesinde yer alan tüm içerikler (metin, görsel, logo, tasarım vb.) Kıymetli Maden\'e aittir ve telif hakları ile korunmaktadır. İçeriklerin izinsiz kopyalanması, dağıtılması veya kullanılması yasaktır.'
  }
];

const importantPoints = [
  {
    icon: CheckCircle,
    text: 'Sitede yer alan fiyatlar bilgilendirme amaçlıdır ve değişiklik gösterebilir',
    color: 'text-green-600 bg-green-50'
  },
  {
    icon: AlertTriangle,
    text: 'Yatırım kararlarınızı verirken riskleri değerlendirmeniz önemlidir',
    color: 'text-amber-600 bg-amber-50'
  },
  {
    icon: XCircle,
    text: '18 yaş altı kullanıcıların siteyi kullanması yasaktır',
    color: 'text-red-600 bg-red-50'
  },
  {
    icon: Shield,
    text: 'Tüm işlemleriniz SSL sertifikası ile korunmaktadır',
    color: 'text-blue-600 bg-blue-50'
  }
];

export default function SartlarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full h-[50vh] sm:h-[60vh] relative overflow-hidden">
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop')`
            }}
          ></div>
          
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="text-left text-white max-w-4xl w-full z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <FileText className="w-4 h-4" />
              <span className="text-sm">KULLANIM ŞARTLARI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Kullanım Şartları
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              Web sitemizi kullanmadan önce lütfen şartları okuyun
            </p>
            
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Kullanım Şartları</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kıymetli Maden web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. 
                  Bu şartlar, sizin ve bizim hak ve yükümlülüklerimizi düzenlemektedir.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Lütfen bu sayfayı düzenli olarak kontrol edin çünkü şartlar zaman zaman güncellenebilir. 
                  Önemli değişiklikler durumunda size bildirimde bulunacağız.
                </p>
                <p className="text-sm text-gray-600 mt-4 italic">
                  Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Points */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs font-medium">ÖNEMLİ BİLGİLER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Dikkat Edilmesi Gerekenler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {importantPoints.map((point, index) => (
              <div key={index} className={`${point.color} rounded-xl p-4 flex items-start gap-3`}>
                <point.icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="font-medium">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <FileText className="w-3 h-3" />
              <span className="text-xs font-medium">ŞART DETAYLARI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Kullanım Şartlarının Detayları</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hak ve yükümlülüklerinizi öğrenin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {termsSections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ek Hükümler</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Değişiklik Hakkı</h4>
                <p className="text-gray-600 leading-relaxed">
                  Kıymetli Maden, bu kullanım şartlarını herhangi bir zamanda değiştirme hakkını saklı tutar. 
                  Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer. Önemli değişiklikler durumunda 
                  kullanıcılara bildirim yapılır.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Uygulanacak Hukuk</h4>
                <p className="text-gray-600 leading-relaxed">
                  Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir uyuşmazlık durumunda 
                  İstanbul Mahkemeleri yetkilidir.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">İletişim</h4>
                <p className="text-gray-600 leading-relaxed">
                  Kullanım şartları hakkında sorularınız için bizimle{' '}
                  <a href="/iletisim" className="text-amber-600 hover:text-amber-700 underline">iletişim</a> sayfamızdan 
                  veya <strong className="text-gray-900">info@kiymetlimaden.com</strong> e-posta adresinden bize ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Sorularınız mı var?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz.
          </p>
          <a 
            href="/iletisim"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            İletişime Geçin
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

