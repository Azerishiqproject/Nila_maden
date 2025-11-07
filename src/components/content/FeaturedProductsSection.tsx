import ServiceCard from './ProductCard';
import { ArrowRight } from 'lucide-react';

// Featured services data
const featuredServices = [
  {
    id: "1",
    name: "Altın Yatırım Danışmanlığı",
    description: "Uzman danışmanlarımızla altın yatırımlarınızı planlayın.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=400&fit=crop&crop=center",
    icon: "trending" as const,
    rating: 4.9,
    reviewCount: 1247,
    isPopular: true,
    features: ["Kişisel plan", "Piyasa analizi", "Risk yönetimi"]
  },
  {
    id: "2",
    name: "Güvenli Altın Alım-Satım",
    description: "SSL korumalı platformumuzda güvenle işlem yapın.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop&crop=center",
    icon: "shield" as const,
    rating: 4.8,
    reviewCount: 892,
    features: ["SSL güvenlik", "Anlık fiyatlar", "Hızlı işlem"]
  },
  {
    id: "3",
    name: "Altın Depolama Hizmeti",
    description: "Profesyonel tesislerimizde altınlarınızı güvenle saklayın.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center",
    icon: "award" as const,
    rating: 4.7,
    reviewCount: 567,
    features: ["Sigortalı depolama", "24/7 güvenlik", "Online takip"]
  },
  {
    id: "4",
    name: "Altın Koleksiyon Yönetimi",
    description: "Koleksiyonunuzu profesyonel ekibimizle yönetin.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=400&fit=crop&crop=center",
    icon: "award" as const,
    rating: 4.9,
    reviewCount: 423,
    features: ["Değerleme", "Restorasyon", "Sigorta"]
  },
  {
    id: "5",
    name: "Altın Takı Tasarım",
    description: "Özel tasarım takılarınızı uzman kuyumcularımızla yapın.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop&crop=center",
    icon: "award" as const,
    rating: 4.8,
    reviewCount: 678,
    features: ["Özel tasarım", "Kalite garantisi", "Hızlı üretim"]
  },
  {
    id: "6",
    name: "Altın Eğitim Programları",
    description: "Altın yatırımı hakkında kapsamlı eğitim alın.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&crop=center",
    icon: "users" as const,
    rating: 4.9,
    reviewCount: 345,
    features: ["Online kurslar", "Uzman eğitmenler", "Sertifika"]
  }
];

export default function FeaturedProductsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Premium
            <span className="block text-gray-700">Hizmetlerimiz</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Altın sektöründe uzman ekibimizle sunduğumuz profesyonel hizmetler. 
            Güvenilir, kaliteli ve müşteri odaklı çözümler.
          </p>
        </div>

       

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </div>

       

        {/* Bottom Info */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>7/24 destek</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Uzman danışmanlık</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Güvenli platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
