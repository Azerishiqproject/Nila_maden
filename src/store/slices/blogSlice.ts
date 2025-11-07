import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  getDocs, 
  getDoc,
  doc,
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { RootState } from '../index';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // CKEditor HTML content
  excerpt: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string; // ISO string formatında
  updatedAt: string; // ISO string formatında
  publishedAt?: string; // ISO string formatında
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    searchQuery: string;
    publishedOnly: boolean;
  };
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  filters: {
    category: 'all',
    searchQuery: '',
    publishedOnly: true,
  },
};

// Fetch all blog posts
export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (publishedOnly: boolean = true) => {
    try {
      const postsRef = collection(db, 'blogPosts');
      // Always fetch all posts and filter client-side to avoid index requirement
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const postsData: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate();
        const updatedAt = data.updatedAt?.toDate();
        const publishedAt = data.publishedAt?.toDate();
        
        const post = {
          id: doc.id,
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          author: data.author || '',
          image: data.image || '',
          category: data.category || '',
          tags: data.tags || [],
          isPublished: data.isPublished || false,
          isFeatured: data.isFeatured || false,
          views: data.views || 0,
          createdAt: createdAt ? createdAt.toISOString() : new Date().toISOString(),
          updatedAt: updatedAt ? updatedAt.toISOString() : new Date().toISOString(),
          publishedAt: publishedAt ? publishedAt.toISOString() : undefined,
        } as BlogPost;
        
        // Filter published posts client-side if needed
        if (!publishedOnly || post.isPublished) {
          postsData.push(post);
        }
      });
      return postsData;
    } catch (error) {
      console.error('Blog fetch error:', error);
      throw new Error('Blog yazıları yüklenirken hata oluştu');
    }
  }
);

// Fetch single blog post by slug
export const fetchBlogPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug: string) => {
    try {
      const postsRef = collection(db, 'blogPosts');
      // Only filter by slug, check isPublished client-side to avoid index requirement
      const q = query(postsRef, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Blog yazısı bulunamadı');
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      // Check if published
      if (!data.isPublished) {
        throw new Error('Blog yazısı yayınlanmamış');
      }
      
      const createdAt = data.createdAt?.toDate();
      const updatedAt = data.updatedAt?.toDate();
      const publishedAt = data.publishedAt?.toDate();
      
      // Increment views
      await updateDoc(doc.ref, {
        views: (data.views || 0) + 1,
      });
      
      return {
        id: doc.id,
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        image: data.image || '',
        category: data.category || '',
        tags: data.tags || [],
        isPublished: data.isPublished || false,
        isFeatured: data.isFeatured || false,
        views: (data.views || 0) + 1,
        createdAt: createdAt ? createdAt.toISOString() : new Date().toISOString(),
        updatedAt: updatedAt ? updatedAt.toISOString() : new Date().toISOString(),
        publishedAt: publishedAt ? publishedAt.toISOString() : undefined,
      } as BlogPost;
    } catch (error) {
      console.error('Blog post fetch error:', error);
      throw new Error('Blog yazısı yüklenirken hata oluştu');
    }
  }
);

// Add new blog post
export const addBlogPost = createAsyncThunk(
  'blog/addPost',
  async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    try {
      const postData = {
        ...post,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: post.isPublished ? new Date() : null,
      };
      const docRef = await addDoc(collection(db, 'blogPosts'), postData);
      return {
        id: docRef.id,
        ...postData,
        createdAt: postData.createdAt.toISOString(),
        updatedAt: postData.updatedAt.toISOString(),
        publishedAt: postData.publishedAt ? postData.publishedAt.toISOString() : undefined,
      } as BlogPost;
    } catch (error) {
      throw new Error('Blog yazısı eklenirken hata oluştu');
    }
  }
);

// Update blog post
export const updateBlogPost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, ...post }: Partial<BlogPost> & { id: string }) => {
    try {
      const postRef = doc(db, 'blogPosts', id);
      const updateData = {
        ...post,
        updatedAt: new Date(),
        publishedAt: post.isPublished && !post.publishedAt ? new Date() : undefined,
      };
      await updateDoc(postRef, updateData);
      return { id, ...updateData } as BlogPost;
    } catch (error) {
      throw new Error('Blog yazısı güncellenirken hata oluştu');
    }
  }
);

// Delete blog post
export const deleteBlogPost = createAsyncThunk(
  'blog/deletePost',
  async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', id));
      return id;
    } catch (error) {
      throw new Error('Blog yazısı silinirken hata oluştu');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setPublishedOnly: (state, action) => {
      state.filters.publishedOnly = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        searchQuery: '',
        publishedOnly: true,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Blog yazıları yüklenemedi';
      })
      .addCase(fetchBlogPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
        // Update the post in the list if it exists
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Blog yazısı yüklenemedi';
      })
      .addCase(addBlogPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload as BlogPost;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload as BlogPost;
        }
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      });
  },
});

export const {
  setCurrentPost,
  clearCurrentPost,
  setCategoryFilter,
  setSearchQuery,
  setPublishedOnly,
  clearFilters,
  clearError,
} = blogSlice.actions;

// Selectors
export const selectBlogPosts = (state: RootState) => state.blog.posts;
export const selectCurrentPost = (state: RootState) => state.blog.currentPost;
export const selectBlogLoading = (state: RootState) => state.blog.loading;
export const selectBlogError = (state: RootState) => state.blog.error;
export const selectBlogFilters = (state: RootState) => state.blog.filters;

// Filtered posts selector
export const selectFilteredBlogPosts = (state: RootState) => {
  const { posts, filters } = state.blog;
  return posts.filter((post) => {
    const matchesCategory = filters.category === 'all' || post.category === filters.category;
    const matchesSearch =
      post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesPublished = !filters.publishedOnly || post.isPublished;
    return matchesCategory && matchesSearch && matchesPublished;
  });
};

export default blogSlice.reducer;

