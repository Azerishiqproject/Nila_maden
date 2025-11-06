import { Users, Award, Star, Shield } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "50K+",
    label: "Mutlu Müşteri"
  },
  {
    icon: Award,
    number: "25+",
    label: "Yıllık Deneyim"
  },
  {
    icon: Star,
    number: "99%",
    label: "Müşteri Memnuniyeti"
  },
  {
    icon: Shield,
    number: "100%",
    label: "Güvenlik Garantisi"
  }
];

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Neden Bizi Seçmelisiniz?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Yılların deneyimi ve güvenilir hizmetimizle altın sektöründe öncü olmaya devam ediyoruz
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-600" />
              </div>
              
              {/* Number */}
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-gray-700 transition-colors duration-300">
                {stat.number}
              </div>
              
              {/* Label */}
              <div className="text-xs sm:text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
