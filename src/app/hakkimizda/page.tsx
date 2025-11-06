import { Users, Award, Shield, Clock, MapPin, Phone, Mail, Star, TrendingUp, Target, Heart, Globe } from 'lucide-react';
import { Navbar, Footer } from '@/components';

// Company stats
const companyStats = [
  {
    icon: Users,
    number: "50K+",
    label: "Mutlu Müşteri",
    description: "Türkiye genelinde güvenilir hizmet"
  },
  {
    icon: Award,
    number: "25+",
    label: "Yıllık Deneyim",
    description: "Altın sektöründe uzmanlık"
  },
  {
    icon: Shield,
    number: "100%",
    label: "Güvenlik Garantisi",
    description: "SSL korumalı güvenli platform"
  },
  {
    icon: Star,
    number: "4.9",
    label: "Müşteri Memnuniyeti",
    description: "En yüksek kalite standartları"
  }
];

// Company values
const companyValues = [
  {
    icon: Heart,
    title: "Müşteri Odaklılık",
    description: "Müşterilerimizin ihtiyaçlarını en iyi şekilde karşılamak için sürekli kendimizi geliştiriyoruz.",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "25 yıllık deneyimimizle müşterilerimize en güvenilir hizmeti sunuyoruz.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Target,
    title: "Kalite",
    description: "En yüksek kalite standartlarında ürün ve hizmet sunmaya devam ediyoruz.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Globe,
    title: "İnovasyon",
    description: "Teknolojik gelişmeleri takip ederek hizmetlerimizi sürekli iyileştiriyoruz.",
    color: "bg-purple-50 text-purple-600"
  }
];


// Company timeline
const companyTimeline = [
  {
    year: "1998",
    title: "Şirket Kuruluşu",
    description: "İstanbul&apos;da küçük bir kuyumcu dükkanı olarak başladık."
  },
  {
    year: "2005",
    title: "İlk Mağaza Açılışı",
    description: "Beyoğlu&apos;nda ilk büyük mağazamızı açtık."
  },
  {
    year: "2010",
    title: "Online Platform",
    description: "E-ticaret platformumuzu hayata geçirdik."
  },
  {
    year: "2015",
    title: "Yatırım Danışmanlığı",
    description: "Altın yatırım danışmanlığı hizmetini başlattık."
  },
  {
    year: "2020",
    title: "Teknoloji Merkezi",
    description: "İstanbul&apos;da teknoloji merkezimizi kurduk."
  },
  {
    year: "2024",
    title: "Gelecek Vizyonu",
    description: "Yapay zeka destekli yatırım platformu geliştiriyoruz."
  }
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://img.freepik.com/free-photo/jewelry-maker-working-alone-atelier_23-2149025952.jpg?semt=ais_hybrid&w=740&q=80')`
            }}
          ></div>
          
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        
        {/* Text Content - Sol taraftan başlıyor */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="text-left text-white max-w-4xl w-full z-10">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Hakkımızda
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
              25 yıllık deneyimimizle altın sektöründe güvenilir ve kaliteli hizmet sunuyoruz
            </p>
            
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-4 sm:mb-6"></div>
            
            <p className="hidden sm:block text-sm md:text-base lg:text-lg xl:text-xl text-white/85 font-light drop-shadow-md max-w-3xl leading-relaxed">
              1998 yılından bu yana müşterilerimize en kaliteli altın ürünleri ve güvenilir yatırım 
              danışmanlığı hizmeti sunmaya devam ediyoruz. Deneyimli ekibimiz ve modern teknolojimizle 
              sizlere en iyi hizmeti vermek için çalışıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">ŞİRKET İSTATİSTİKLERİ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Başarılarımız</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">25 yıllık yolculuğumuzda elde ettiğimiz başarılar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-5 sm:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-gray-900">{stat.number}</div>
                <div className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Target className="w-3 h-3" />
              <span className="text-xs font-medium">DEĞERLERİMİZ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Şirket Değerlerimiz</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">Çalışma prensiplerimizi ve değerlerimizi keşfedin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${value.color} rounded-full flex items-center justify-center`}>
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">ŞİRKET TARİHÇESİ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Yolculuğumuz</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">1998 den günümüze uzanan başarı hikayemiz</p>
          </div>
          {/* Desktop timeline */}
          <div className="relative hidden md:block">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
            <div className="space-y-8">
              {companyTimeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg"></div>
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="text-2xl font-bold text-amber-600 mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden relative">
            {/* Vertical line on the left */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            <div className="space-y-6">
              {companyTimeline.map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-4 top-2 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow"></div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-xl font-bold text-amber-600 mb-1">{item.year}</div>
                    <h3 className="text-base font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Contact Info Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-medium">İLETİŞİM BİLGİLERİ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Bize Ulaşın</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">Sorularınız için bizimle iletişime geçin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-5 sm:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Adres</h3>
              <p className="text-gray-600 text-sm sm:text-base">Beyoğlu, İstanbul<br />Türkiye</p>
            </div>
            
            <div className="bg-white rounded-xl p-5 sm:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Telefon</h3>
              <p className="text-gray-600 text-sm sm:text-base">+90 (212) 555 0123<br />+90 (212) 555 0124</p>
            </div>
            
            <div className="bg-white rounded-xl p-5 sm:p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">E-posta</h3>
              <p className="text-gray-600 text-sm sm:text-base break-all">info@altinmaden.com<br />destek@altinmaden.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Bizimle Çalışmaya Başlayın
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            25 yıllık deneyimimiz ve uzman ekibimizle sizlere en iyi hizmeti sunmaya hazırız.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm">
              İletişime Geçin
            </button>
            <button className="bg-transparent text-white border border-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-200">
              Kariyer Fırsatları
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
