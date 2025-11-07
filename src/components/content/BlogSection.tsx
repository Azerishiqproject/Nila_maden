'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchBlogPosts,
  selectBlogPosts,
  selectBlogLoading,
} from '@/store/slices/blogSlice';

export default function BlogSection() {
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(selectBlogPosts);
  const loading = useAppSelector(selectBlogLoading);

  useEffect(() => {
    dispatch(fetchBlogPosts(true)); // Fetch only published posts
  }, [dispatch]);

  // Get latest 3 published posts
  const latestPosts = allPosts
    .filter(post => post.isPublished)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || latestPosts.length === 0) {
    return null; // Don't show section if loading or no posts
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10">
          <div className="mb-4 sm:mb-0">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full mb-4">
              <Tag className="w-3 h-3" />
              <span className="text-xs font-medium">BLOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Son Blog Yazıları
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
              Altın, yatırım ve koleksiyon hakkında güncel haberler ve makaleler
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Daha Fazla</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.isFeatured && (
                  <div className="absolute top-3 right-3 bg-white text-amber-600 text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                    ÖNE ÇIKAN
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
                  {post.category}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
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
  );
}

