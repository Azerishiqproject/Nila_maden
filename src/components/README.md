# Components Directory

Bu dizin, uygulamanın tüm React bileşenlerini içerir. Bileşenler işlevselliklerine göre kategorize edilmiştir.

## 📁 Dizin Yapısı

```
src/components/
├── index.ts                    # Ana export dosyası
├── README.md                   # Bu dokümantasyon
├── layout/                     # Ana sayfa düzeni bileşenleri
│   ├── index.ts               # Layout export
│   ├── Navbar.tsx             # Ana navigasyon menüsü
│   ├── Footer.tsx             # Alt bilgi bölümü
│   └── HeroSlider.tsx         # Ana sayfa hero slider'ı
├── content/                    # Ana sayfa içerik bileşenleri
│   ├── index.ts               # Content export
│   ├── LiveGoldPrices.tsx     # Canlı altın fiyatları
│   ├── StatsSection.tsx       # İstatistik bölümü
│   ├── FeaturedProductsSection.tsx # Öne çıkan ürünler
│   ├── ImageContentSection.tsx # Görsel içerik bölümü
│   ├── ProductCard.tsx        # Ürün kartı
│   └── CTASection.tsx         # Çağrı-to-action bölümü
├── gold-prices/                # Altın fiyatları sayfası özel bileşenleri
│   ├── index.ts               # Gold-prices export
│   ├── MarketSummary.tsx      # Piyasa özeti
│   ├── DetailedGoldPrices.tsx # Detaylı altın fiyatları tablosu
│   ├── PriceAlerts.tsx        # Fiyat alarmları
│   └── MarketAnalysis.tsx     # Piyasa analizi
└── shared/                     # Ortak kullanılan bileşenler
    ├── index.ts               # Shared export
    └── FAQSection.tsx         # Sıkça sorulan sorular
```

## 🚀 Kullanım

### Import Etme
```tsx
// Ana index üzerinden tüm bileşenler
import { Navbar, Footer, MarketSummary } from '@/components';

// Belirli kategoriden import
import { Navbar, Footer } from '@/components/layout';
import { MarketSummary, DetailedGoldPrices } from '@/components/gold-prices';
import { FAQSection } from '@/components/shared';

// Tek tek import (eski yöntem - hala çalışır)
import Navbar from '@/components/layout/Navbar';
```

### Props Interface'leri
Her bileşen TypeScript interface'leri ile tip güvenliği sağlar:

```tsx
interface MarketSummaryProps {
  items: MarketSummaryItem[];
}

interface DetailedGoldPricesProps {
  items: GoldPriceItem[];
}
```

## 🎨 Tasarım Prensipleri

### Stil Tutarlılığı
- Tüm bileşenler Tailwind CSS kullanır
- Renk paleti: Gray tonları + Amber vurgular
- Hover efektleri ve geçişler standart
- Responsive tasarım (mobile-first)

### Component Props
- Gerekli veriler props olarak geçirilir
- Default değerler mümkün olduğunca az
- Interface'ler açık ve anlaşılır

### State Management
- Local state için useState
- Form state'leri component içinde
- Global state gerekli değil

## 📱 Responsive Design

- **Mobile**: 320px+ (sm:)
- **Tablet**: 768px+ (md:)
- **Desktop**: 1024px+ (lg:)
- **Large Desktop**: 1280px+ (xl:)

## 🔧 Geliştirme

### Yeni Bileşen Ekleme
1. Uygun kategori klasörüne bileşeni ekle
2. Kategori index.ts'ine export ekle
3. Ana index.ts otomatik olarak güncellenir
4. README'yi güncelle

### Bileşen Kategorileri
- **Layout**: Sayfa düzeni (Navbar, Footer, Hero)
- **Content**: Ana sayfa içerik (Stats, Products, CTA)
- **Gold-prices**: Altın fiyatları özel bileşenleri
- **Shared**: Birden fazla sayfada kullanılan bileşenler

### Bileşen Güncelleme
- Mevcut props interface'lerini koru
- Breaking change'ler için major version
- Geriye uyumluluk önemli

## 📊 Performance

- Lazy loading için React.lazy kullanılabilir
- Memoization gerekli yerlerde
- Bundle size optimize edilmeli
- Image optimization için Next.js Image component

## 🔄 Migration Guide

### Eski Import'lar (Hala Çalışır)
```tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
```

### Yeni Import'lar (Önerilen)
```tsx
import { Navbar, Footer } from '@/components';
// veya
import { Navbar, Footer } from '@/components/layout';
```

### Avantajlar
- **Daha İyi Organizasyon**: Bileşenler kategorilere ayrıldı
- **Kolay Bulma**: Hangi bileşenin nerede olduğu açık
- **Scalability**: Yeni kategoriler kolayca eklenebilir
- **Maintenance**: Her kategori ayrı ayrı yönetilebilir
