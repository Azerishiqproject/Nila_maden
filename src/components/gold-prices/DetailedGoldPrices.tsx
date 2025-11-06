'use client';

import { ArrowUpRight, ArrowDownRight, Minus, Info } from 'lucide-react';

interface GoldPriceItem {
  id: number;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  lastUpdate: string;
  category: string;
  high24h: number;
  low24h: number;
  volume: string;
  purity: string;
  description: string;
}

interface DetailedGoldPricesProps {
  items: GoldPriceItem[];
}

export default function DetailedGoldPrices({ items }: DetailedGoldPricesProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Yatırım':
        return 'bg-blue-100 text-blue-700';
      case 'Koleksiyon':
        return 'bg-purple-100 text-purple-700';
      case 'Takı':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
            <Info className="w-3 h-3" />
            <span className="text-xs font-medium">DETAYLI FİYATLAR</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Detaylı Altın Fiyatları</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tüm altın türleri için güncel fiyatlar ve detaylı bilgiler</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Değişim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    24s Yüksek/Düşük
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Hacim
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Saflık
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.currentPrice)}
                      </div>
                      <div className="text-xs text-gray-500">Son güncelleme: {item.lastUpdate}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 ${
                        item.trend === 'up' ? 'text-emerald-600' : 
                        item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {item.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                        {item.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                        {item.trend === 'neutral' && <Minus className="w-4 h-4" />}
                        <span className="text-sm font-medium">{formatChange(item.change)}</span>
                        <span className="text-xs">({item.changePercent.toFixed(2)}%)</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="text-emerald-600">{formatPrice(item.high24h)}</div>
                        <div className="text-red-600">{formatPrice(item.low24h)}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.volume}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.purity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
