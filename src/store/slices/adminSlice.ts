import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt: string; // ISO string formatında
  updatedAt: string; // ISO string formatında
}

export interface GoldPrice {
  id?: string;
  type: string;
  buyPrice: number;
  sellPrice: number;
  date: string; // ISO string formatında
  updatedAt: string; // ISO string formatında
}

interface AdminState {
  products: Product[];
  goldPrices: GoldPrice[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  products: [],
  goldPrices: [],
  loading: false,
  error: null,
};

// Products
export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async () => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
    })) as Product[];
    return products;
  }
);

export const addProduct = createAsyncThunk(
  'admin/addProduct',
  async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const productData = {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'products'), productData);
    return { id: docRef.id, ...productData };
  }
);

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ id, ...product }: Partial<Product> & { id: string }) => {
    const productRef = doc(db, 'products', id);
    const updateData = {
      ...product,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(productRef, updateData);
    return { id, ...updateData };
  }
);

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
    return id;
  }
);

// Gold Prices
export const fetchGoldPrices = createAsyncThunk(
  'admin/fetchGoldPrices',
  async () => {
    const pricesRef = collection(db, 'goldPrices');
    const q = query(pricesRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const prices = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as GoldPrice[];
    return prices;
  }
);

export const addGoldPrice = createAsyncThunk(
  'admin/addGoldPrice',
  async (price: Omit<GoldPrice, 'id' | 'updatedAt'>) => {
    const priceData = {
      ...price,
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'goldPrices'), priceData);
    return { id: docRef.id, ...priceData };
  }
);

export const updateGoldPrice = createAsyncThunk(
  'admin/updateGoldPrice',
  async ({ id, ...price }: Partial<GoldPrice> & { id: string }) => {
    const priceRef = doc(db, 'goldPrices', id);
    const updateData = {
      ...price,
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(priceRef, updateData);
    return { id, ...updateData };
  }
);

export const deleteGoldPrice = createAsyncThunk(
  'admin/deleteGoldPrice',
  async (id: string) => {
    await deleteDoc(doc(db, 'goldPrices', id));
    return id;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ürünler yüklenemedi';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload as Product;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      // Gold Prices
      .addCase(fetchGoldPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoldPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.goldPrices = action.payload;
      })
      .addCase(fetchGoldPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Altın fiyatları yüklenemedi';
      })
      .addCase(addGoldPrice.fulfilled, (state, action) => {
        state.goldPrices.unshift(action.payload);
      })
      .addCase(updateGoldPrice.fulfilled, (state, action) => {
        const index = state.goldPrices.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.goldPrices[index] = action.payload as GoldPrice;
        }
      })
      .addCase(deleteGoldPrice.fulfilled, (state, action) => {
        state.goldPrices = state.goldPrices.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
