'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store';
import { 
  addGoldPrice, 
  updateGoldPrice, 
  deleteGoldPrice, 
  GoldPrice 
} from '../../store/slices/adminSlice';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function GoldPriceManagement() {
  const dispatch = useAppDispatch();
  const { goldPrices } = useAppSelector((state: RootState) => state.admin as { goldPrices: GoldPrice[] });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<GoldPrice | null>(null);
  const [viewingPrice, setViewingPrice] = useState<GoldPrice | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    buyPrice: '',
    sellPrice: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceData = {
      type: formData.type,
      buyPrice: parseFloat(formData.buyPrice),
      sellPrice: parseFloat(formData.sellPrice),
      date: new Date(formData.date).toISOString()
    };

    if (editingPrice) {
      dispatch(updateGoldPrice({ id: editingPrice.id!, ...priceData }));
    } else {
      dispatch(addGoldPrice(priceData));
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (price: GoldPrice) => {
    setEditingPrice(price);
    setFormData({
      type: price.type,
      buyPrice: price.buyPrice.toString(),
      sellPrice: price.sellPrice.toString(),
      date: typeof price.date === 'string' ? price.date.split('T')[0] : new Date(price.date).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu fiyat kaydını silmek istediğinizden emin misiniz?')) {
      dispatch(deleteGoldPrice(id));
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      buyPrice: '',
      sellPrice: '',
      date: new Date().toISOString().split('T')[0]
    });
    setEditingPrice(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getGoldTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      '24k': '24 Ayar Altın',
      '22k': '22 Ayar Altın',
      '18k': '18 Ayar Altın',
      '14k': '14 Ayar Altın',
      'coin': 'Altın Sikke',
      'bar': 'Altın Külçe',
      'jewelry': 'Altın Takı'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Altın Fiyatları Yönetimi</h2>
        <button
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Fiyat Ekle
        </button>
      </div>

      {/* Gold Prices Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Altın Türü
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alış Fiyatı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Satış Fiyatı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {goldPrices.map((price: GoldPrice) => (
              <tr key={price.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {getGoldTypeLabel(price.type)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {price.type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₺{price.buyPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₺{price.sellPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(price.date).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => setViewingPrice(price)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(price)}
                    className="text-yellow-600 hover:text-yellow-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(price.id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingPrice ? 'Fiyat Düzenle' : 'Yeni Fiyat Ekle'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altın Türü
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="">Seçiniz</option>
                    <option value="24k">24 Ayar Altın</option>
                    <option value="22k">22 Ayar Altın</option>
                    <option value="18k">18 Ayar Altın</option>
                    <option value="14k">14 Ayar Altın</option>
                    <option value="coin">Altın Sikke</option>
                    <option value="bar">Altın Külçe</option>
                    <option value="jewelry">Altın Takı</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alış Fiyatı (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Satış Fiyatı (₺)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.sellPrice}
                    onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tarih
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md transition-colors"
                  >
                    {editingPrice ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Price Modal */}
      {viewingPrice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Fiyat Detayları</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Altın Türü</label>
                  <p className="text-sm text-gray-900">{getGoldTypeLabel(viewingPrice.type)}</p>
                  <p className="text-xs text-gray-500">{viewingPrice.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alış Fiyatı</label>
                  <p className="text-sm text-gray-900">₺{viewingPrice.buyPrice.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Satış Fiyatı</label>
                  <p className="text-sm text-gray-900">₺{viewingPrice.sellPrice.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tarih</label>
                  <p className="text-sm text-gray-900">
                    {new Date(viewingPrice.date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Güncelleme Tarihi</label>
                  <p className="text-sm text-gray-900">
                    {new Date(viewingPrice.updatedAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setViewingPrice(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
