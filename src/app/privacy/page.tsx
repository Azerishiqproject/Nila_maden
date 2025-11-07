'use client';

import { Shield, Lock, Eye, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Navbar, Footer } from '@/components';

const privacySections = [
  {
    icon: FileText,
    title: 'Kişisel Verilerin Toplanması',
    content: 'Kıymetli Maden olarak, hizmetlerimizi sunabilmek için belirli kişisel verilerinizi topluyoruz. Bu veriler arasında ad, soyad, e-posta adresi, telefon numarası, adres bilgileri ve ödeme bilgileri yer almaktadır. Verileriniz yalnızca hizmetlerimizi sunmak ve yasal yükümlülüklerimizi yerine getirmek amacıyla toplanmaktadır.'
  },
  {
    icon: Lock,
    title: 'Verilerinizin Korunması',
    content: 'Kişisel verilerinizin güvenliği bizim için önceliklidir. Tüm verileriniz SSL sertifikası ile şifrelenmiş bağlantılar üzerinden iletilmekte ve güvenli sunucularda saklanmaktadır. Verilerinize yetkisiz erişimi önlemek için en son güvenlik teknolojilerini kullanıyoruz.'
  },
  {
    icon: Eye,
    title: 'Verilerinizin Kullanımı',
    content: 'Toplanan kişisel verileriniz, sipariş işleme, müşteri hizmetleri, yasal yükümlülüklerin yerine getirilmesi ve size özel teklifler sunulması amacıyla kullanılmaktadır. Verileriniz üçüncü taraflarla paylaşılmamakta, yalnızca hizmet sağlayıcılarımızla (ödeme işlemcileri, kargo firmaları) gerekli durumlarda paylaşılmaktadır.'
  },
  {
    icon: Shield,
    title: 'Çerezler (Cookies)',
    content: 'Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Bu çerezler, site tercihlerinizi hatırlamak, analitik veriler toplamak ve size özel içerik sunmak için kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.'
  },
  {
    icon: CheckCircle,
    title: 'Haklarınız',
    content: 'KVKK kapsamında, kişisel verilerinizle ilgili olarak bilgi alma, erişme, düzeltme, silme, itiraz etme ve veri taşınabilirliği haklarınız bulunmaktadır. Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.'
  },
  {
    icon: AlertCircle,
    title: 'Değişiklikler',
    content: 'Gizlilik politikamız zaman zaman güncellenebilir. Önemli değişiklikler durumunda size bildirimde bulunacağız. Güncel gizlilik politikamızı bu sayfadan takip edebilirsiniz.'
  }
];

const dataRights = [
  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
  'İşlenen kişisel verileriniz hakkında bilgi talep etme',
  'Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
  'Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme',
  'Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme',
  'Kişisel verilerinizin silinmesini veya yok edilmesini isteme',
  'Düzeltme, silme, yok etme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
  'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme',
  'Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme'
];

export default function GizlilikPage() {
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
              backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop')`
            }}
          ></div>
          
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="text-left text-white max-w-4xl w-full z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm">GİZLİLİK POLİTİKASI</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Gizlilik Politikası
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              Kişisel verilerinizin korunması bizim için önceliklidir
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gizlilik Taahhüdümüz</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kıymetli Maden olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat hükümlerine tam uyum sağlayarak, 
                  kişisel verilerinizin güvenliğini ve gizliliğini korumak için gerekli tüm teknik ve idari önlemleri almaktayız.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Bu gizlilik politikası, web sitemizi kullandığınızda veya hizmetlerimizden yararlandığınızda toplanan kişisel verilerinizin 
                  nasıl işlendiği, korunduğu ve kullanıldığı hakkında bilgi vermektedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <FileText className="w-3 h-3" />
              <span className="text-xs font-medium">GİZLİLİK DETAYLARI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">Politikamızın Detayları</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kişisel verilerinizin nasıl korunduğunu öğrenin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacySections.map((section, index) => (
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

      {/* Data Rights Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs font-medium">HAKLARINIZ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">KVKK Kapsamındaki Haklarınız</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kişisel verilerinizle ilgili sahip olduğunuz haklar</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
            <ul className="space-y-4">
              {dataRights.map((right, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{right}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Haklarınızı Kullanmak İçin:</strong> Yukarıdaki haklarınızdan herhangi birini kullanmak istediğinizde, 
                bizimle <a href="/iletisim" className="text-amber-600 hover:text-amber-700 underline">iletişim</a> sayfamızdan veya 
                <strong className="text-gray-900"> info@kiymetlimaden.com</strong> e-posta adresinden bize ulaşabilirsiniz.
              </p>
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
            Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
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

