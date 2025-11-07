import Image from 'next/image';
import { ArrowRight, Star, Shield, Award, Users, Clock } from 'lucide-react';

export default function ImageContentSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md lg:max-w-none overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
              <Image 
                src="https://www.shopdorsey.com/cdn/shop/products/Untitled_1080x1920px_1080x1080px_1080x1920px_1080x1080px_908x1200px_350x500px_908x1200px_350x500px_908x1200px_1200x.png?v=1699294808"
                alt="Premium Altın Koleksiyonu"
                width={400}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2">
            {/* Main Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Premium Altın
                <span className="block text-gray-700">Koleksiyonu</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                En kaliteli altın ürünlerimizi keşfedin. Özel tasarım ve premium kalite ile 
                değerli yatırımlarınız için güvenilir çözümler sunuyoruz.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Premium Kalite</h3>
                <p className="text-xs sm:text-sm text-gray-600">En yüksek standartlarda üretim</p>
              </div>
              
              <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Güvenli Alışveriş</h3>
                <p className="text-xs sm:text-sm text-gray-600">SSL korumalı ödeme sistemi</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a 
                href="/koleksiyonlarimiz"
                className="inline-flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-colors duration-200 shadow-sm w-full sm:w-auto"
              >
                Ürünleri İncele
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Bottom Info */}
            <div className="text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>1000+ Müşteri</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Hızlı Teslimat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>5.0 Puan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
