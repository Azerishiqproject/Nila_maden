'use client';

import { useState } from 'react';
import { Menu, X} from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Altın Fiyatları', href: '/altin-fiyatlari' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'Blog', href: '/blog' },
  { name: 'Koleksiyonlarımız', href: '/koleksiyonlarimiz' },
  { name: 'İletişim', href: '/iletisim' },

];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Navbar */}
        <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-full sm:rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white font-bold text-sm sm:text-base md:text-lg">KM</span>
              </div>
              <span className="text-white font-bold text-base sm:text-lg md:text-xl hidden sm:inline">Kıymetli Maden</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 sm:mt-4">
            <div className="bg-black/70 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
              <div className="flex flex-col space-y-2 sm:space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 font-medium py-2 sm:py-2.5 px-4 rounded-lg hover:bg-white/10 text-sm sm:text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
              
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
