import Image from 'next/image';
import { Shield, Truck, Clock, Award, Users, TrendingUp } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  description: string;
  image: string;
  icon: 'shield' | 'truck' | 'clock' | 'award' | 'users' | 'trending';
  isPopular?: boolean;
  features: string[];
}

const iconMap = {
  shield: Shield,
  truck: Truck,
  clock: Clock,
  award: Award,
  users: Users,
  trending: TrendingUp
};

export default function ServiceCard({
  name,
  description,
  image,
  icon,
  isPopular = false,
  features
}: ServiceCardProps) {
  const IconComponent = iconMap[icon];
  
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image 
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isPopular && (
          <div className="absolute top-3 right-3 bg-white text-amber-600 text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
            POPÜLER
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">{name}</h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Features */}
        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
       
        
       
      </div>
    </div>
  );
}
