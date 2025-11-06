export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-yellow-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Altın Yatırımında Güvenilir Adres
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
          25 yıllık deneyimimizle altın sektöründe güvenilir hizmet sunuyoruz. 
          Canlı fiyatlar, hızlı teslimat ve müşteri memnuniyeti garantisi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            Hemen Başla
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
            İletişime Geç
          </button>
        </div>
      </div>
    </section>
  );
}

