import { 
  HeroSlider, 
  StatsSection, 
  Navbar, 
  LiveGoldPrices, 
  FeaturedProductsSection, 
  ImageContentSection, 
  Footer 
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section - Tam Ekran */}
      <section className="pt-0">
        <HeroSlider />
      </section>

      {/* Live Gold Prices Section */}
      <LiveGoldPrices />

      {/* Image Content Section */}
      <ImageContentSection />

      {/* Featured Products Section */}
      <FeaturedProductsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
