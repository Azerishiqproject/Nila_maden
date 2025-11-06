import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 relative z-10">
       

  

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Company Info */}
          <div>
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl sm:text-2xl">KM</span>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Hakkımızda</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
                  Yılların deneyimi ve güvenilir hizmetimizle altın sektöründe öncü olmaya devam ediyoruz.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">SSL Güvenli</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">İletişim</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">+90 (212) 555 0123</span>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base break-all">info@kiymetlimaden.com</span>
              </div>
              <div className="flex items-center gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">Ana Sayfa</a>
          <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">Altın Fiyatları</a>
          <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">Hizmetlerimiz</a>
          <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">İletişim</a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 Kıymetli Maden. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Gizlilik</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Şartlar</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
