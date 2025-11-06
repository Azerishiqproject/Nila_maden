'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, Calendar, RefreshCw } from 'lucide-react';
import { getContactSubmissions, updateContactStatus, ContactSubmission } from '../../lib/contactService';

export default function Contact() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts from Firestore
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getContactSubmissions();
      setContacts(data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('İletişim mesajları yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => 
    filter === 'all' ? true : contact.status === filter
  );

  const handleUpdateStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      await updateContactStatus(id, status);
      // Update local state
      setContacts(prev => prev.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
      
      // Update selected contact if it's the same one
      if (selectedContact?.id === id) {
        setSelectedContact(prev => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Durum güncellenirken hata oluştu');
    }
  };

  const getStatusColor = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-amber-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'read': return 'Okundu';
      case 'replied': return 'Yanıtlandı';
      default: return 'Bilinmiyor';
    }
  };

  const formatDate = (date: Date | { toDate: () => Date } | null) => {
    if (!date) return 'Tarih bilgisi yok';
    
    try {
      const dateObj = date instanceof Date ? date : date.toDate();
      return dateObj.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Tarih bilgisi yok';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-gray-300">İletişim mesajları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 text-red-300 rounded-2xl p-6 backdrop-blur-sm">
        <div className="text-center">
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchContacts}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-2xl p-6 border border-amber-400/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">İletişim Mesajları</h2>
              <p className="text-gray-300">Müşterilerden gelen mesajları yönetin ve yanıtlayın</p>
            </div>
          </div>
          <button
            onClick={fetchContacts}
            className="p-2 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
            title="Yenile"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Toplam Mesaj</p>
              <p className="text-2xl font-bold text-white">{contacts.length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Yeni Mesajlar</p>
              <p className="text-2xl font-bold text-amber-400">
                {contacts.filter(c => c.status === 'new').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Okunan</p>
              <p className="text-2xl font-bold text-yellow-400">
                {contacts.filter(c => c.status === 'read').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Yanıtlanan</p>
              <p className="text-2xl font-bold text-green-400">
                {contacts.filter(c => c.status === 'replied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Content */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
        {/* Filter Tabs */}
        <div className="border-b border-white/20 px-6">
          <div className="flex space-x-8">
            {[
              { key: 'all', label: 'Tümü', count: contacts.length },
              { key: 'new', label: 'Yeni', count: contacts.filter(c => c.status === 'new').length },
              { key: 'read', label: 'Okunan', count: contacts.filter(c => c.status === 'read').length },
              { key: 'replied', label: 'Yanıtlanan', count: contacts.filter(c => c.status === 'replied').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key as 'all' | 'new' | 'read' | 'replied')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === key
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                {label}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  filter === key ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="divide-y divide-white/20">
          {filteredContacts.length === 0 ? (
            <div className="p-12 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Henüz mesaj yok</h3>
              <p className="text-gray-400">Müşterilerden gelen mesajlar burada görünecek</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 hover:bg-white/5 transition-colors cursor-pointer ${
                  selectedContact?.id === contact.id ? 'bg-amber-400/10' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {contact.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                    
                    <p className="text-white font-medium mb-1">{contact.subject}</p>
                    <p className="text-gray-300 text-sm line-clamp-2">{contact.message}</p>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    <div className="flex space-x-2">
                      {contact.status === 'new' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatus(contact.id!, 'read');
                          }}
                          className="p-2 text-amber-400 hover:bg-amber-400/20 rounded-lg transition-colors"
                          title="Okundu olarak işaretle"
                        >
                          <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
                        </button>
                      )}
                      {contact.status === 'read' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatus(contact.id!, 'replied');
                          }}
                          className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                          title="Yanıtlandı olarak işaretle"
                        >
                          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-2xl rounded-2xl bg-gray-800/95 backdrop-blur-xl border-white/20">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Mesaj Detayı
                </h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Ad Soyad</label>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">E-posta</label>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Telefon</label>
                    <p className="text-white">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tarih</label>
                    <p className="text-white">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Konu</label>
                  <p className="text-white font-medium">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Mesaj</label>
                  <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    {selectedContact.status === 'new' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedContact.id!, 'read')}
                        className="px-4 py-2 text-sm font-medium text-amber-400 bg-amber-400/20 hover:bg-amber-400/30 rounded-lg transition-colors border border-amber-400/30"
                      >
                        Okundu Olarak İşaretle
                      </button>
                    )}
                    {selectedContact.status === 'read' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedContact.id!, 'replied')}
                        className="px-4 py-2 text-sm font-medium text-green-400 bg-green-400/20 hover:bg-green-400/30 rounded-lg transition-colors border border-green-400/30"
                      >
                        Yanıtlandı Olarak İşaretle
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
