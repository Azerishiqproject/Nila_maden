'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: "Premium Altın Koleksiyonu",
    subtitle: "En kaliteli altın ürünler, en uygun fiyatlarla",
    image: "https://wallpapers.com/images/hd/jewellery-background-1920-x-1080-pxqa1q7pb1owttao.jpg"
  },
  {
    id: 2,
    title: "Özel Tasarım Altın Takılar",
    subtitle: "Benzersiz tasarımlar, unutulmaz anlar",
    image: "https://a.storyblok.com/f/185004/1920x1080/e07b8a647f/brillant-w_collier-wahre-liebe_1920-x-1080.png"
  },
  {
    id: 3,
    title: "Yatırımlık Altın",
    subtitle: "Güvenli yatırım, parlak gelecek",
    image: "https://guldviva.com/en/cdn/shop/files/Namnlos_1920_x_1080_px_16_ec03a2c0-b2ed-41e1-aadb-f803993753ac.jpg?v=1694421266&width=1500"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          </div>
          
          {/* Text Content - Sol taraftan başlıyor */}
          <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
            <div className="text-left text-white max-w-4xl w-full z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-white font-medium drop-shadow-lg max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-4 sm:mb-6"></div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/85 font-light drop-shadow-md max-w-3xl leading-relaxed hidden sm:block">
                Premium kalite, uygun fiyatlar ve güvenilir hizmet garantisi ile altın sektöründe öncü olmaya devam ediyoruz.
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 sm:space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
            }`}
          />
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-500 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
