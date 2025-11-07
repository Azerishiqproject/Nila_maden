import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RootState } from '../index';

export interface CollectionProduct {
  id: string;
  name: string;
  description: string;
  period: string;
  material: string;
  technique: string;
  image: string;
  category: string;
  historicalInfo: string;
  isFeatured: boolean;
  createdAt: string; // ISO string formatında
  updatedAt: string; // ISO string formatında
}

interface CollectionState {
  products: CollectionProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: CollectionProduct | null;
  filters: {
    category: string;
    searchQuery: string;
  };
}

const initialState: CollectionState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: 'all',
    searchQuery: '',
  },
};

// Fetch products from Firebase
export const fetchCollectionProducts = createAsyncThunk(
  'collection/fetchProducts',
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData: CollectionProduct[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate();
        const updatedAt = data.updatedAt?.toDate();
        productsData.push({
          id: doc.id,
          ...data,
          createdAt: createdAt ? createdAt.toISOString() : new Date().toISOString(),
          updatedAt: updatedAt ? updatedAt.toISOString() : new Date().toISOString(),
        } as CollectionProduct);
      });
      return productsData;
    } catch (error) {
      throw new Error('Ürünler yüklenirken hata oluştu');
    }
  }
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        searchQuery: '',
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchCollectionProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ürünler yüklenemedi';
      });
  },
});

export const {
  setSelectedProduct,
  clearSelectedProduct,
  setCategoryFilter,
  setSearchQuery,
  clearFilters,
  clearError,
} = collectionSlice.actions;

// Selectors
export const selectCollectionProducts = (state: RootState) => state.collection.products;
export const selectCollectionLoading = (state: RootState) => state.collection.loading;
export const selectCollectionError = (state: RootState) => state.collection.error;
export const selectSelectedProduct = (state: RootState) => state.collection.selectedProduct;
export const selectCollectionFilters = (state: RootState) => state.collection.filters;

// Filtered products selector
export const selectFilteredProducts = (state: RootState) => {
  const { products, filters } = state.collection;
  return products.filter((product) => {
    const matchesCategory = filters.category === 'all' || product.category === filters.category;
    const matchesSearch =
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export default collectionSlice.reducer;

