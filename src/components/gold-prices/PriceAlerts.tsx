'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Clock, TrendingUp, TrendingDown, Edit, CheckCircle, RefreshCw, Plus } from 'lucide-react';

// Types
interface PriceData {
  [key: string]: {
    Alış?: string;
    Satış?: string;
    Değişim?: string;
  } | string;
  Update_Date: string;
}

interface PriceAlertItem {
  id: number;
  product: string;
  targetPrice: number;
  currentPrice: number;
  status: 'active' | 'triggered' | 'expired';
  progress: number;
  daysLeft: number;
  type: 'above' | 'below';
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

export default function PriceAlerts() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [alerts, setAlerts] = useState<PriceAlertItem[]>([]);

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

  // Örnek alarm verilerini hazırlama (gerçek uygulamada bu veriler veritabanından gelecek)
  useEffect(() => {
    if (!priceData) return;

    const sampleAlerts: PriceAlertItem[] = [];

    // Gram Altın
    const gramAltin = priceData['gram-altin'];
    if (gramAltin && typeof gramAltin === 'object') {
      const currentPrice = parseTurkishNumber(gramAltin.Alış || '0');
      if (currentPrice > 0) {
        sampleAlerts.push({
          id: 1,
          product: "Gram Altın",
          targetPrice: 5000.00,
          currentPrice: currentPrice,
          status: "active",
          progress: 0,
          daysLeft: 3,
          type: "above"
        });
      }
    }

    // Çeyrek Altın
    const ceyrekAltin = priceData['ceyrek-altin'];
    if (ceyrekAltin && typeof ceyrekAltin === 'object') {
      const currentPrice = parseTurkishNumber(ceyrekAltin.Alış || '0');
      if (currentPrice > 0) {
        sampleAlerts.push({
          id: 2,
          product: "Çeyrek Altın",
          targetPrice: 8500.00,
          currentPrice: currentPrice,
          status: "active",
          progress: 0,
          daysLeft: 2,
          type: "below"
        });
      }
    }

    // Yarım Altın
    const yarimAltin = priceData['yarim-altin'];
    if (yarimAltin && typeof yarimAltin === 'object') {
      const currentPrice = parseTurkishNumber(yarimAltin.Alış || '0');
      if (currentPrice > 0) {
        sampleAlerts.push({
          id: 3,
          product: "Yarım Altın",
          targetPrice: 17000.00,
          currentPrice: currentPrice,
          status: "active",
          progress: 0,
          daysLeft: 1,
          type: "above"
        });
      }
    }

    // Progress hesaplama
    const updatedAlerts = sampleAlerts.map(alert => {
      const progress = alert.type === 'above' 
        ? Math.min(100, ((alert.currentPrice - (alert.targetPrice - 100)) / 100) * 100)
        : Math.min(100, ((alert.targetPrice - alert.currentPrice) / 100) * 100);
      
      const status = progress >= 100 ? 'triggered' : alert.status;
      
      return {
        ...alert,
        progress: Math.max(0, Math.min(100, progress)),
        status: status as 'active' | 'triggered' | 'expired'
      };
    });

    setAlerts(updatedAlerts);
  }, [priceData]);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'triggered':
        return 'bg-blue-100 text-blue-700';
      case 'expired':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'triggered':
        return 'Tetiklendi';
      case 'expired':
        return 'Süresi Doldu';
      default:
        return 'Bilinmiyor';
    }
  };

  // Loading state
  if (loading && !priceData) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Bell className="w-3 h-3" />
              <span className="text-xs font-medium">FİYAT ALARMLARI</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Fiyat Alarmları</h2>
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
              <Bell className="w-3 h-3" />
              <span className="text-xs font-medium">FİYAT ALARMLARI</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Fiyat Alarmları</h2>
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
              <Bell className="w-3 h-3" />
              <span className="text-xs font-medium">FİYAT ALARMLARI</span>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Fiyat Alarmları</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hedef fiyatlara ulaşıldığında anında bildirim alın</p>
          {lastUpdate && (
            <p className="text-sm text-gray-500 mt-2">
              Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                    {getStatusText(alert.status)}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{alert.product}</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Hedef Fiyat:</span>
                  <span className="text-sm font-medium text-gray-900">{formatPrice(alert.targetPrice)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mevcut Fiyat:</span>
                  <span className="text-sm font-medium text-gray-900">{formatPrice(alert.currentPrice)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tip:</span>
                  <div className="flex items-center gap-1">
                    {alert.type === 'above' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-900">
                      {alert.type === 'above' ? 'Yukarı' : 'Aşağı'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">İlerleme</span>
                  <span className="text-xs text-gray-500">{Math.round(alert.progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      alert.status === 'triggered' ? 'bg-blue-500' : 'bg-gray-800'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, alert.progress))}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{alert.daysLeft} gün kaldı</span>
                </div>
                
                {alert.status === 'triggered' && (
                  <div className="flex items-center gap-1 text-sm text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Tetiklendi</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-all duration-200 shadow-sm">
            <Plus className="w-4 h-4" />
            Yeni Alarm Oluştur
          </button>
        </div>
      </div>
    </section>
  );
}
