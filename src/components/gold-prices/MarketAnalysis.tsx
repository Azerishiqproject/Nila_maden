'use client';

import { TrendingUp, BarChart3, Info, AlertTriangle, PieChart } from 'lucide-react';

interface MarketAnalysisProps {
  goldTrend: string;
  marketSentiment: string;
  volatility: string;
  recommendation: string;
}

export default function MarketAnalysis({ goldTrend, marketSentiment, volatility, recommendation }: MarketAnalysisProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'pozitif':
        return 'bg-emerald-100 text-emerald-700';
      case 'negatif':
        return 'bg-red-100 text-red-700';
      case 'nötr':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getVolatilityColor = (vol: string) => {
    switch (vol.toLowerCase()) {
      case 'düşük':
        return 'bg-green-100 text-green-700';
      case 'orta':
        return 'bg-yellow-100 text-yellow-700';
      case 'yüksek':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec.toLowerCase()) {
      case 'alım':
        return 'bg-emerald-100 text-emerald-700';
      case 'satış':
        return 'bg-red-100 text-red-700';
      case 'bekle':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
            <BarChart3 className="w-3 h-3" />
            <span className="text-xs font-medium">PİYASA ANALİZİ</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Piyasa Analizi</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Uzman analistlerimizin güncel piyasa değerlendirmesi</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Market Overview */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Piyasa Genel Görünümü</h3>
                <p className="text-sm text-gray-600">Güncel durum ve trendler</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Altın Trendi:</span>
                <span className="text-sm font-medium text-gray-900">{goldTrend}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Piyasa Duyarlılığı:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSentimentColor(marketSentiment)}`}>
                  {marketSentiment}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Volatilite:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getVolatilityColor(volatility)}`}>
                  {volatility}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Öneri:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRecommendationColor(recommendation)}`}>
                  {recommendation}
                </span>
              </div>
            </div>
            
            <div className="mt-5 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm">Analiz Sonucu</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Gram altın güçlü bir yükseliş trendinde. RSI değeri aşırı alım bölgesinde değil, 
                    MACD pozitif sinyal veriyor. Kısa vadede ₺2,180 direnç seviyesini test edebilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Sentiment */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <PieChart className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Piyasa Duyarlılığı</h3>
                <p className="text-sm text-gray-600">Yatırımcı görüşleri</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Alım</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="font-medium text-emerald-600 text-sm">65%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Satış</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="font-medium text-red-600 text-sm">25%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Beklemede</span>
                <div className="flex items-center gap-2">
                  <div className="w-28 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <span className="font-medium text-gray-600 text-sm">10%</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1 text-sm">Uzman Görüşü</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    Piyasa genel olarak pozitif görünüyor. Yatırımcıların %65&apos;i alım yönünde, 
                    bu da güçlü bir yükseliş sinyali veriyor. Ancak risk yönetimi önemli.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
