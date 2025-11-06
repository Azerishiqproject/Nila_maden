
'use client';

import { 
  Navbar, 
  Footer, 
  FAQSection, 
  MarketSummary, 
  LiveGoldPrices, 
  PriceAlerts
} from '@/components';
import { 
  goldPriceFAQ 
} from '@/data/goldPricesData';

export default function AltinFiyatlariPage() {
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
              backgroundImage: `url('https://thumbs.dreamstime.com/b/gold-jewelry-beautiful-woman-model-posing-glamorous-black-background-32764285.jpg')`
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight tracking-tight drop-shadow-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
              Altın Fiyatları
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white font-medium drop-shadow-lg max-w-2xl leading-relaxed">
              Güncel altın fiyatlarını takip edin ve en uygun zamanda yatırım kararlarınızı alın
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-6"></div>
          </div>
        </div>
      </section>

      {/* Market Summary Section */}
      <MarketSummary />

      {/* Live Gold Prices Section */}
      <LiveGoldPrices />

      {/* Price Alerts Section */}
      <PriceAlerts />

      {/* FAQ Section */}
      <FAQSection 
        title="Altın Fiyatları Hakkında Sıkça Sorulan Sorular"
        subtitle="Altın yatırımı ve fiyatları hakkında merak edilen konular"
        items={goldPriceFAQ}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Altın Yatırımına Başlayın
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimiz size en uygun yatırım stratejilerini sunar ve 
            piyasa gelişmelerini anlık olarak takip eder.
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
