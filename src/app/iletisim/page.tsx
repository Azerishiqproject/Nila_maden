'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle, Building, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Navbar, Footer, FAQSection } from '@/components';
import { addContactSubmission } from '@/lib/contactService';
import { config } from '@/lib/config';



// Office locations
const officeLocations = [
  {
    city: "İstanbul",
    address: "Beyoğlu, İstanbul",
    phone: "+90 (212) 555 0123",
    email: "istanbul@altinmaden.com",
    description: "Ana merkez ofisimiz",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop"
  },
  {
    city: "Ankara",
    address: "Kızılay, Ankara",
    phone: "+90 (312) 555 0123",
    email: "ankara@altinmaden.com",
    description: "Başkent temsilciliği",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=300&fit=crop"
  },
  {
    city: "İzmir",
    address: "Alsancak, İzmir",
    phone: "+90 (232) 555 0123",
    email: "izmir@altinmaden.com",
    description: "Ege bölgesi temsilciliği",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  }
];

// FAQ items
const faqItems = [
  {
    question: "Altın alım-satım işlemleriniz nasıl yapılıyor?",
    answer: "Altın alım-satım işlemlerimiz hem online platformumuz üzerinden hem de şubelerimizde güvenli bir şekilde gerçekleştirilmektedir. Tüm işlemler SSL korumalı ve 7/24 takip edilebilir."
  },
  {
    question: "Yatırım danışmanlığı hizmeti veriyor musunuz?",
    answer: "Evet, uzman ekibimizle birlikte kişisel yatırım danışmanlığı hizmeti sunuyoruz. Risk profilinize uygun yatırım stratejileri geliştiriyoruz."
  },
  {
    question: "Altın teslimatı ne kadar sürede yapılıyor?",
    answer: "Altın teslimatı genellikle 1-3 iş günü içerisinde tamamlanmaktadır. Özel siparişler için süre değişiklik gösterebilir."
  },
  {
    question: "Güvenlik önlemleriniz nelerdir?",
    answer: "Tüm işlemlerimiz SSL sertifikası ile korunmaktadır. Ayrıca 7/24 güvenlik izleme sistemi ve sigorta kapsamında hizmet veriyoruz."
  },
  {
    question: "Müşteri hizmetleri hangi saatlerde aktif?",
    answer: "Müşteri hizmetlerimiz hafta içi 09:00-18:00, cumartesi 09:00-14:00 saatleri arasında hizmet vermektedir. Acil durumlar için 7/24 telefon desteği mevcuttur."
  }
];

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), config.contact.timeout);
      return;
    }
    
    setFormStatus('sending');
    
    try {
      // Save to Firestore
      await addContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim()
      });
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), config.contact.timeout);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => setFormStatus('idle'), config.contact.errorTimeout);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://thumbs.dreamstime.com/b/gold-awareness-ribbon-support-neutral-white-background-378983221.jpg')`
            }}
          ></div>
          
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </div>
        
        {/* Text Content - Sol taraftan başlıyor */}
        <div className="absolute inset-0 flex items-center">
          <div className="text-left text-white max-w-4xl px-12 md:px-16 lg:px-20 z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">BİZE ULAŞIN</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              İletişim
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              Sorularınız için bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız
            </p>
            
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full mb-6"></div>
            
            <p className="text-sm md:text-lg lg:text-xl text-white/85 font-light drop-shadow-md max-w-3xl leading-relaxed">
              7/24 müşteri hizmetleri ekibimiz ve uzman danışmanlarımızla her zaman yanınızdayız. 
              Altın yatırımı, koleksiyon ürünleri veya genel sorularınız için bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-medium">İLETİŞİM BİLGİLERİ</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Bize Ulaşın</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Sorularınız için bizimle iletişime geçin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adres</h3>
              <p className="text-gray-600">Beyoğlu, İstanbul<br />Türkiye</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefon</h3>
              <p className="text-gray-600">+90 (212) 555 0123<br />+90 (212) 555 0124</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">E-posta</h3>
              <p className="text-gray-600">info@altinmaden.com<br />destek@altinmaden.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Send className="w-3 h-3" />
              <span className="text-xs font-medium">İLETİŞİM FORMU</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mesaj Gönderin</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Formu doldurun, en kısa sürede size dönelim</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="+90 (5XX) XXX XX XX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="altin-alim-satim">Altın Alım-Satım</option>
                      <option value="yatirim-danismanligi">Yatırım Danışmanlığı</option>
                      <option value="koleksiyon-urunleri">Koleksiyon Ürünleri</option>
                      <option value="genel-sorular">Genel Sorular</option>
                      <option value="sikayet-oneri">Şikayet/Öneri</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="bg-gray-800 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-700 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Mesaj Gönder
                      </>
                    )}
                  </button>
                </div>
                
                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>Mesajınız başarıyla gönderildi! En kısa sürede size döneceğiz.</span>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>Bir hata oluştu. Lütfen tekrar deneyiniz.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=700&fit=crop&crop=center" 
                  alt="İletişim ve Destek"
                  width={600}
                  height={700}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Info Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold  text-gray-800">7/24 Destek</h3>
                      <p className="text-sm text-gray-600">Her zaman yanınızdayız</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Anlık yanıt süresi: 2-5 dakika</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Uzman danışmanlık hizmeti</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Güvenli ve şifreli iletişim</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Building className="w-3 h-3" />
              <span className="text-xs font-medium">OFİS LOKASYONLARI</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Şubelerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Türkiye genelinde hizmet veren ofislerimiz</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <Image 
                    src={office.image} 
                    alt={`${office.city} ofis`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{office.city}</h3>
                  <p className="text-gray-600 mb-4">{office.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{office.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection items={faqItems} />

      {/* CTA Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen İletişime Geçin
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Uzman ekibimiz size yardımcı olmaya hazır. Altın yatırımı ve koleksiyon ürünleri hakkında 
            tüm sorularınızı yanıtlayalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-200 shadow-sm">
              Hemen Ara
            </button>
            <button className="bg-transparent text-white border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-200">
              WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
