'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Clock, RefreshCw } from 'lucide-react';

// Types
interface PriceData {
  [key: string]: {
    Alış?: string;
    Satış?: string;
    Değişim?: string;
  } | string;
  Update_Date: string;
}

interface MarketSummaryItem {
  title: string;
  value: string;
  change: string;
  changePercent: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  description: string;
}

// Helper function to parse Turkish number format
const parseTurkishNumber = (value: string): number => {
  if (!value) return 0;
  // Remove all non-numeric characters except dots and commas
  const cleaned = value.replace(/[^\d,.-]/g, '');
  // Replace dots (thousands separators) with empty string, then replace comma (decimal separator) with dot
  const normalized = cleaned.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalized) || 0;
};

export default function MarketSummary() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Market summary verilerini hazırlama
  const prepareMarketSummary = (): MarketSummaryItem[] => {
    if (!priceData) return [];

    const items: MarketSummaryItem[] = [];

    // Gram Altın
    const gramAltin = priceData['gram-altin'];
    if (gramAltin && typeof gramAltin === 'object') {
      const buyingPrice = parseTurkishNumber(gramAltin.Alış || '0');
      const changeText = gramAltin.Değişim || '0%';
      const changePercent = parseTurkishNumber(changeText);
      const priceDelta = (buyingPrice * changePercent) / 100;
      const trend: 'up' | 'down' | 'neutral' = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

      items.push({
        title: "Gram Altın",
        value: `₺${buyingPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
        change: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(priceDelta).toFixed(2)}`,
        changePercent: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(changePercent).toFixed(2)}%`,
        trend,
        icon: "TrendingUp",
        description: "Günlük değişim"
      });
    }

    // Çeyrek Altın
    const ceyrekAltin = priceData['ceyrek-altin'];
    if (ceyrekAltin && typeof ceyrekAltin === 'object') {
      const buyingPrice = parseTurkishNumber(ceyrekAltin.Alış || '0');
      const changeText = ceyrekAltin.Değişim || '0%';
      const changePercent = parseTurkishNumber(changeText);
      const priceDelta = (buyingPrice * changePercent) / 100;
      const trend: 'up' | 'down' | 'neutral' = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

      items.push({
        title: "Çeyrek Altın",
        value: `₺${buyingPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
        change: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(priceDelta).toFixed(2)}`,
        changePercent: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(changePercent).toFixed(2)}%`,
        trend,
        icon: "DollarSign",
        description: "Günlük değişim"
      });
    }

    // Dolar Kuru
    const usd = priceData['USD'];
    if (usd && typeof usd === 'object') {
      const buyingPrice = parseTurkishNumber(usd.Alış || '0');
      const changeText = usd.Değişim || '0%';
      const changePercent = parseTurkishNumber(changeText);
      const priceDelta = (buyingPrice * changePercent) / 100;
      const trend: 'up' | 'down' | 'neutral' = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

      items.push({
        title: "Dolar Kuru",
        value: `₺${buyingPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
        change: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(priceDelta).toFixed(2)}`,
        changePercent: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(changePercent).toFixed(2)}%`,
        trend,
        icon: "BarChart3",
        description: "Günlük değişim"
      });
    }

    // Euro Kuru
    const eur = priceData['EUR'];
    if (eur && typeof eur === 'object') {
      const buyingPrice = parseTurkishNumber(eur.Alış || '0');
      const changeText = eur.Değişim || '0%';
      const changePercent = parseTurkishNumber(changeText);
      const priceDelta = (buyingPrice * changePercent) / 100;
      const trend: 'up' | 'down' | 'neutral' = changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral';

      items.push({
        title: "Euro Kuru",
        value: `₺${buyingPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
        change: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(priceDelta).toFixed(2)}`,
        changePercent: `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(changePercent).toFixed(2)}%`,
        trend,
        icon: "Clock",
        description: "Günlük değişim"
      });
    }

    return items;
  };

  const items = prepareMarketSummary();

  // Loading state
  if (loading && !priceData) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <BarChart3 className="w-3 h-3" />
              <span className="text-xs font-medium">PİYASA ÖZETİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Günlük Piyasa Özeti</h2>
            <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Veriler yükleniyor...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full mb-4">
              <BarChart3 className="w-3 h-3" />
              <span className="text-xs font-medium">PİYASA ÖZETİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Günlük Piyasa Özeti</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">Veri alınamadı</p>
              <button
                onClick={refreshData}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Tekrar Dene
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
            <BarChart3 className="w-3 h-3" />
            <span className="text-xs font-medium">PİYASA ÖZETİ</span>
            </div>
            <button
              onClick={refreshData}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span className="text-xs font-medium">Yenile</span>
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Günlük Piyasa Özeti</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Altın piyasasındaki son gelişmeler ve trend analizi</p>
          {lastUpdate && (
            <p className="text-sm text-gray-500 mt-2">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {item.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-gray-600" />}
                  {item.icon === 'DollarSign' && <DollarSign className="w-5 h-5 text-gray-600" />}
                  {item.icon === 'BarChart3' && <BarChart3 className="w-5 h-5 text-gray-600" />}
                  {item.icon === 'Clock' && <Clock className="w-5 h-5 text-gray-600" />}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-emerald-600' : 
                  item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {item.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {item.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                  {item.trend === 'neutral' && <BarChart3 className="w-4 h-4" />}
                  <span>{item.changePercent}</span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-2">{item.value}</div>
              <div className="text-gray-600 mb-2">{item.title}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
