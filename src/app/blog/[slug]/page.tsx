'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowLeft, ArrowRight, Tag, Share2, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchBlogPostBySlug,
  fetchBlogPosts,
  selectCurrentPost,
  selectBlogPosts,
  selectBlogLoading,
  selectBlogError,
} from '@/store/slices/blogSlice';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const allPosts = useAppSelector(selectBlogPosts);
  const loading = useAppSelector(selectBlogLoading);
  const error = useAppSelector(selectBlogError);

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogPostBySlug(slug));
      dispatch(fetchBlogPosts(true)); // Fetch all published posts for recommendations
    }
  }, [slug, dispatch]);

  // Get recommended posts with smart algorithm
  const getRecommendedPosts = () => {
    if (!post) return [];
    
    const availablePosts = allPosts.filter(p => p.id !== post.id && p.isPublished);
    
    // 1. Priority: Same category (up to 3 posts)
    const sameCategoryPosts = availablePosts
      .filter(p => p.category === post.category)
      .sort((a, b) => {
        // Sort by featured first, then by views, then by date
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1;
        if (b.views !== a.views) return b.views - a.views;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3);
    
    if (sameCategoryPosts.length >= 3) {
      return sameCategoryPosts;
    }
    
    // 2. If not enough, add posts with same tags
    const postTags = post.tags || [];
    const sameTagPosts = availablePosts
      .filter(p => {
        if (p.category === post.category) return false; // Already included
        const pTags = p.tags || [];
        return pTags.some(tag => postTags.includes(tag));
      })
      .sort((a, b) => {
        // Count matching tags
        const aTags = a.tags || [];
        const bTags = b.tags || [];
        const aMatchCount = aTags.filter(t => postTags.includes(t)).length;
        const bMatchCount = bTags.filter(t => postTags.includes(t)).length;
        
        if (aMatchCount !== bMatchCount) return bMatchCount - aMatchCount;
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1;
        if (b.views !== a.views) return b.views - a.views;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3 - sameCategoryPosts.length);
    
    const combined = [...sameCategoryPosts, ...sameTagPosts];
    
    if (combined.length >= 3) {
      return combined.slice(0, 3);
    }
    
    // 3. If still not enough, add most popular/recent posts
    const remainingPosts = availablePosts
      .filter(p => {
        const isInCategory = p.category === post.category;
        const pTags = p.tags || [];
        const hasCommonTag = pTags.some(tag => postTags.includes(tag));
        return !isInCategory && !hasCommonTag;
      })
      .sort((a, b) => {
        // Sort by featured first, then by views, then by date
        if (a.isFeatured !== b.isFeatured) return b.isFeatured ? 1 : -1;
        if (b.views !== a.views) return b.views - a.views;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3 - combined.length);
    
    return [...combined, ...remainingPosts].slice(0, 3);
  };

  const recommendedPosts = getRecommendedPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Blog yazısı yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Blog yazısı bulunamadı</h3>
            <p className="text-gray-600 mb-4">{error || 'Aradığınız blog yazısı mevcut değil.'}</p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Blog&apos;a Dön</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Navbar />

      {/* Hero Image */}
      <section className="w-full h-[50vh] sm:h-[60vh] relative overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20">
          <div className="max-w-4xl">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Blog&apos;a Dön</span>
            </Link>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full mb-4 text-sm">
              <Tag className="w-3 h-3" />
              <span>{post.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} görüntülenme</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {/* Excerpt */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CKEditor Content */}
            <div 
              className="blog-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.125rem',
                color: '#374151',
              }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    Son güncelleme: {formatDate(post.updatedAt)}
                  </span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Paylaş</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {recommendedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Diğer Blog Yazıları</h2>
              <p className="text-lg text-gray-600">İlginizi çekebilecek diğer yazılarımız</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedPost.isFeatured && (
                      <div className="absolute top-3 right-3 bg-white text-amber-600 text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                        ÖNE ÇIKAN
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {relatedPost.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(relatedPost.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{relatedPost.views}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{relatedPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 group-hover:gap-2 transition-all">
                        <span className="text-sm font-medium">Oku</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm Blog Yazılarına Dön</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

