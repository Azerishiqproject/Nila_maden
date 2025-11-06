'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, RefreshCw } from 'lucide-react';

// Types
interface GoldPriceItem {
  Alış?: string;
  Satış?: string;
  Değişim?: string;
}

interface PriceData {
  [key: string]: GoldPriceItem | string;
  Update_Date: string;
}

interface GoldItem {
  id: number;
  name: string;
  currentPrice: number;
  change: number; // price delta in TRY
  changePercent: number; // percent delta
  trend: "up" | "down" | "neutral";
  lastUpdate: string;
  category: string;
}

type Language = 'tr' | 'en';

// Helper function to parse Turkish number format
const parseTurkishNumber = (value: string): number => {
  if (!value) return 0;
  // Remove all non-numeric characters except dots and commas
  const cleaned = value.replace(/[^\d,.-]/g, '');
  // Replace dots (thousands separators) with empty string, then replace comma (decimal separator) with dot
  const normalized = cleaned.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized) || 0;
};

// Dil çevirileri
const translations: Record<Language, Record<string, string>> = {
  tr: {
    liveTracking: "CANLI TAKİP",
    liveGoldPrices: "Canlı Altın Fiyatları",
    description: "Güncel altın fiyatlarını takip edin ve en uygun zamanda yatırım kararlarınızı alın",
    goldType: "Altın Türü",
    category: "Kategori",
    currentPrice: "Güncel Fiyat",
    change: "Değişim",
    trend: "Trend",
    update: "Güncelleme",
    pricesUpdateEveryMinute: "Fiyatlar her dakika güncellenmektedir",
    loading: "Veriler yükleniyor...",
    error: "Veri alınamadı",
    retry: "Tekrar Dene",
    gramGold: "Gram Altın",
    quarterGold: "Çeyrek Altın",
    halfGold: "Yarım Altın",
    fullGold: "Tam Altın",
    republicGold: "Cumhuriyet Altını",
    ataGold: "Ata Altın",
    gold14k: "14 Ayar Altın",
    gold18k: "18 Ayar Altın",
    gold22k: "22 Ayar Bilezik",
    fiveGold: "Beşli Altın",
    jewelryGold: "Ziynet 2.5 Altın",
    gremseGold: "Gremse Altın",
    resatGold: "Reşat Altın",
    hamitGold: "Hamit Altın",
    investment: "Yatırım",
    collection: "Koleksiyon",
    jewelry: "Takı"
  },
  en: {
    liveTracking: "LIVE TRACKING",
    liveGoldPrices: "Live Gold Prices",
    description: "Track current gold prices and make your investment decisions at the right time",
    goldType: "Gold Type",
    category: "Category",
    currentPrice: "Current Price",
    change: "Change",
    trend: "Trend",
    update: "Update",
    pricesUpdateEveryMinute: "Prices are updated every minute",
    loading: "Loading data...",
    error: "Failed to load data",
    retry: "Retry",
    gramGold: "Gram Gold",
    quarterGold: "Quarter Gold",
    halfGold: "Half Gold",
    fullGold: "Full Gold",
    republicGold: "Republic Gold",
    ataGold: "Ata Gold",
    gold14k: "14 Carat Gold",
    gold18k: "18 Carat Gold",
    gold22k: "22 Carat Bracelet",
    fiveGold: "Five Gold",
    jewelryGold: "Jewelry 2.5 Gold",
    gremseGold: "Gremse Gold",
    resatGold: "Resat Gold",
    hamitGold: "Hamit Gold",
    investment: "Investment",
    collection: "Collection",
    jewelry: "Jewelry"
  }
};

// Altın türleri ve kategorileri - Sadece API'de mevcut olanlar
const goldTypes = [
  { key: 'gram-altin', name: 'gramGold', category: 'investment' },
  { key: 'ceyrek-altin', name: 'quarterGold', category: 'investment' },
  { key: 'yarim-altin', name: 'halfGold', category: 'investment' },
  { key: 'tam-altin', name: 'fullGold', category: 'investment' },
  { key: 'cumhuriyet-altini', name: 'republicGold', category: 'collection' },
  { key: 'ata-altin', name: 'ataGold', category: 'collection' },
  { key: '14-ayar-altin', name: 'gold14k', category: 'jewelry' },
  { key: '18-ayar-altin', name: 'gold18k', category: 'jewelry' },
  { key: '22-ayar-bilezik', name: 'gold22k', category: 'jewelry' },
  { key: 'besli-altin', name: 'fiveGold', category: 'investment' },
  { key: 'ikibucuk-altin', name: 'jewelryGold', category: 'jewelry' },
  { key: 'gremse-altin', name: 'gremseGold', category: 'collection' },
  { key: 'resat-altin', name: 'resatGold', category: 'collection' },
  { key: 'hamit-altin', name: 'hamitGold', category: 'collection' }
];

export default function LiveGoldPrices() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('tr');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // API'den veri çekme
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/gold/today');
        if (!response.ok) {
          throw new Error('Veri alınamadı');
        }
        const data = await response.json();
        setPriceData(data);
        setLastUpdate(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
    
    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchPriceData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Dil değiştirme
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  // Veri yenileme
  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/gold/today');
      if (!response.ok) {
        throw new Error('Veri alınamadı');
      }
      const data = await response.json();
      setPriceData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  // Altın verilerini hazırlama
  const prepareGoldData = (): GoldItem[] => {
    if (!priceData) return [];

    return goldTypes.map((goldType, index) => {
      const data = priceData[goldType.key];
      if (!data || typeof data === 'string') return null;

      const buyingPrice = parseTurkishNumber(data.Alış || '0');
      const changeText = data.Değişim || '0%';
      const changePercent = parseTurkishNumber(changeText); // e.g. 0.85
      const priceDelta = (buyingPrice * changePercent) / 100;
      const trend: "up" | "down" | "neutral" = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

      return {
        id: index + 1,
        name: translations[language][goldType.name] || goldType.name,
        currentPrice: buyingPrice,
        change: Math.abs(priceDelta),
        changePercent: Math.abs(changePercent),
        trend,
        lastUpdate: lastUpdate ? lastUpdate.toLocaleTimeString('tr-TR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }) : "N/A",
        category: translations[language][goldType.category] || goldType.category
      };
    }).filter((item): item is GoldItem => item !== null);
  };

  const liveGoldPrices = prepareGoldData();
  // Loading state
  if (loading && !priceData) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">{translations[language].liveTracking}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {translations[language].liveGoldPrices}
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>{translations[language].loading}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">{translations[language].liveTracking}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {translations[language].liveGoldPrices}
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{translations[language].error}</p>
              <button
                onClick={refreshData}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                {translations[language].retry}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-2 sm:px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-medium">{translations[language].liveTracking}</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-2 sm:px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors duration-200"
            >
              <span className="text-xs font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
            </button>
            <button
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-2 sm:px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-xs font-medium hidden sm:inline">Yenile</span>
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {translations[language].liveGoldPrices}
          </h2>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {translations[language].description}
          </p>
        </div>

        {/* Modern Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="grid grid-cols-6 gap-4 text-white font-medium text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                {translations[language].goldType}
              </div>
              <div className="text-center">{translations[language].category}</div>
              <div className="text-center">{translations[language].currentPrice}</div>
              <div className="text-center">{translations[language].change}</div>
              <div className="text-center">{translations[language].trend}</div>
              <div className="text-center">{translations[language].update}</div>
            </div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {liveGoldPrices.map((item) => (
              <div 
                key={item.id} 
                className="px-6 py-4 hover:bg-amber-50/50 transition-colors duration-200 group"
              >
                <div className="grid grid-cols-6 gap-4 items-center">
                  {/* Gold Type */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.category === translations[language].investment ? 'bg-emerald-500' : 
                      item.category === translations[language].collection ? 'bg-amber-500' : 'bg-purple-500'
                    }`}></div>
                    <div className="font-medium text-gray-800 group-hover:text-amber-700 transition-colors duration-200">
                      {item.name}
                    </div>
                  </div>
                  
                  {/* Category */}
                  <div className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === translations[language].investment ? 'bg-gray-100 text-gray-700' :
                      item.category === translations[language].collection ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Current Price */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      ₺{item.currentPrice.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Change */}
                  <div className="text-center">
                    <div className={`flex flex-col items-center gap-1 ${
                      item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-1">
                        {item.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                        {item.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                        {item.trend === 'neutral' && <Minus className="w-4 h-4" />}
                        <span className="font-medium text-sm">
                          {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.change.toFixed(2)} ₺
                        </span>
                      </div>
                      <span className="text-xs opacity-80">
                        ({item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Trend Visual */}
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto bg-gray-100`}>
                      {item.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-600" />}
                      {item.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-600" />}
                      {item.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-600" />}
                    </div>
                  </div>
                  
                  {/* Last Update */}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4">
          {liveGoldPrices.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.category === translations[language].investment ? 'bg-emerald-500' : 
                    item.category === translations[language].collection ? 'bg-amber-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <div className="font-semibold text-gray-900 text-base mb-1">
                      {item.name}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.category === translations[language].investment ? 'bg-gray-100 text-gray-700' :
                      item.category === translations[language].collection ? 'bg-gray-100 text-gray-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100`}>
                  {item.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-600" />}
                  {item.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-600" />}
                  {item.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-600" />}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{translations[language].currentPrice}</div>
                  <div className="text-lg font-bold text-gray-900">
                    ₺{item.currentPrice.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{translations[language].change}</div>
                  <div className={`flex items-center gap-1 ${
                    item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {item.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                    {item.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                    {item.trend === 'neutral' && <Minus className="w-4 h-4" />}
                    <span className="font-semibold text-sm">
                      {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.change.toFixed(2)} ₺
                    </span>
                  </div>
                  <div className={`text-xs mt-0.5 ${
                    item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    ({item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{translations[language].update}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{item.lastUpdate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Live Update Indicator */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span>{translations[language].pricesUpdateEveryMinute}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
