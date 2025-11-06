// Market Summary Data
export const marketSummaryData = [
  {
    title: "Gram Altın",
    value: "₺2,150.50",
    change: "+12.75",
    changePercent: "+0.60%",
    trend: "up" as const,
    icon: "TrendingUp",
    description: "Günlük değişim"
  },
  {
    title: "Çeyrek Altın",
    value: "₺3,450.00",
    change: "-8.25",
    changePercent: "-0.24%",
    trend: "down" as const,
    icon: "DollarSign",
    description: "Günlük değişim"
  },
  {
    title: "Dolar Kuru",
    value: "₺31.85",
    change: "+0.15",
    changePercent: "+0.47%",
    trend: "up" as const,
    icon: "BarChart3",
    description: "Günlük değişim"
  },
  {
    title: "Altın Ons",
    value: "$2,180.50",
    change: "+18.75",
    changePercent: "+0.87%",
    trend: "up" as const,
    icon: "Clock",
    description: "Günlük değişim"
  }
];

// Enhanced Gold Price Data
export const enhancedGoldPrices = [
  {
    id: 1,
    name: "Gram Altın",
    currentPrice: 2150.50,
    change: 12.75,
    changePercent: 0.60,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Yatırım",
    high24h: 2180.00,
    low24h: 2120.00,
    volume: "2.5M",
    purity: "995/1000",
    description: "En popüler yatırım aracı, 1 gram ağırlığında"
  },
  {
    id: 2,
    name: "Çeyrek Altın",
    currentPrice: 3450.00,
    change: -8.25,
    changePercent: -0.24,
    trend: "down" as const,
    lastUpdate: "11:35",
    category: "Yatırım",
    high24h: 3480.00,
    low24h: 3420.00,
    volume: "1.8M",
    purity: "916/1000",
    description: "1.75 gram ağırlığında, geleneksel yatırım aracı"
  },
  {
    id: 3,
    name: "Yarım Altın",
    currentPrice: 6900.00,
    change: 25.50,
    changePercent: 0.37,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Yatırım",
    high24h: 6950.00,
    low24h: 6850.00,
    volume: "1.2M",
    purity: "916/1000",
    description: "3.5 gram ağırlığında, orta vadeli yatırım için ideal"
  },
  {
    id: 4,
    name: "Tam Altın",
    currentPrice: 13800.00,
    change: 45.00,
    changePercent: 0.33,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Yatırım",
    high24h: 13900.00,
    low24h: 13700.00,
    volume: "950K",
    purity: "916/1000",
    description: "7 gram ağırlığında, uzun vadeli yatırım aracı"
  },
  {
    id: 5,
    name: "Cumhuriyet Altını",
    currentPrice: 14250.00,
    change: 32.80,
    changePercent: 0.23,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Koleksiyon",
    high24h: 14300.00,
    low24h: 14150.00,
    volume: "750K",
    purity: "916/1000",
    description: "7.2 gram ağırlığında, koleksiyon değeri yüksek"
  },
  {
    id: 6,
    name: "Ata Altın",
    currentPrice: 14500.00,
    change: 28.50,
    changePercent: 0.20,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Koleksiyon",
    high24h: 14550.00,
    low24h: 14400.00,
    volume: "680K",
    purity: "916/1000",
    description: "7.2 gram ağırlığında, özel koleksiyon parçası"
  },
  {
    id: 7,
    name: "14 Ayar Altın",
    currentPrice: 1250.00,
    change: 8.75,
    changePercent: 0.70,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Takı",
    high24h: 1260.00,
    low24h: 1240.00,
    volume: "1.5M",
    purity: "585/1000",
    description: "Takı yapımında kullanılan altın"
  },
  {
    id: 8,
    name: "18 Ayar Altın",
    currentPrice: 1600.00,
    change: 12.50,
    changePercent: 0.79,
    trend: "up" as const,
    lastUpdate: "11:35",
    category: "Takı",
    high24h: 1610.00,
    low24h: 1590.00,
    volume: "1.1M",
    purity: "750/1000",
    description: "Yüksek kaliteli takı altını"
  }
];

// Price Alerts Data
export const priceAlertsData = [
  {
    id: 1,
    product: "Gram Altın",
    targetPrice: 2200.00,
    currentPrice: 2150.50,
    status: "active" as const,
    progress: 75,
    daysLeft: 3,
    type: "above" as const
  },
  {
    id: 2,
    product: "Çeyrek Altın",
    targetPrice: 3400.00,
    currentPrice: 3450.00,
    status: "triggered" as const,
    progress: 100,
    daysLeft: 0,
    type: "below" as const
  },
  {
    id: 3,
    product: "Yarım Altın",
    targetPrice: 7000.00,
    currentPrice: 6900.00,
    status: "active" as const,
    progress: 85,
    daysLeft: 2,
    type: "above" as const
  },
  {
    id: 4,
    product: "Tam Altın",
    targetPrice: 14000.00,
    currentPrice: 13800.00,
    status: "active" as const,
    progress: 90,
    daysLeft: 1,
    type: "above" as const
  },
  {
    id: 5,
    product: "Cumhuriyet Altını",
    targetPrice: 14500.00,
    currentPrice: 14250.00,
    status: "expired" as const,
    progress: 0,
    daysLeft: 0,
    type: "above" as const
  },
  {
    id: 6,
    product: "14 Ayar Altın",
    targetPrice: 1300.00,
    currentPrice: 1250.00,
    status: "active" as const,
    progress: 60,
    daysLeft: 5,
    type: "above" as const
  }
];

// Market Analysis Data
export const marketAnalysisData = {
  goldTrend: "Yükseliş",
  marketSentiment: "Pozitif",
  volatility: "Orta",
  recommendation: "Alım"
};

// FAQ Data
export const goldPriceFAQ = [
  {
    question: "Altın fiyatları ne sıklıkla güncelleniyor?",
    answer: "Altın fiyatlarımız piyasa koşullarına göre gerçek zamanlı olarak güncellenmektedir. Genellikle 5-10 dakika aralıklarla fiyat güncellemeleri yapılmaktadır."
  },
  {
    question: "Gram altın ve çeyrek altın arasındaki fark nedir?",
    answer: "Gram altın 1 gram ağırlığında ve 995/1000 saflıkta, çeyrek altın ise 1.75 gram ağırlığında ve 916/1000 saflıkta üretilmektedir. Gram altın daha saf, çeyrek altın ise daha dayanıklıdır."
  },
  {
    question: "Altın alım-satım işlemlerinde komisyon alıyor musunuz?",
    answer: "Evet, işlem başına %0.5 komisyon almaktayız. Bu komisyon hem alım hem de satım işlemlerinde geçerlidir."
  },
  {
    question: "Altın fiyatları neden sürekli değişiyor?",
    answer: "Altın fiyatları dolar kuru, enflasyon, jeopolitik riskler, merkez bankası politikaları ve piyasa talebi gibi birçok faktöre bağlı olarak değişmektedir."
  },
  {
    question: "Online altın alım-satımı güvenli mi?",
    answer: "Evet, tüm işlemlerimiz SSL sertifikası ile korunmaktadır. Ayrıca 7/24 güvenlik izleme sistemi ve sigorta kapsamında hizmet veriyoruz."
  }
];
