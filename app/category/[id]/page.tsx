import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Eye } from 'lucide-react';

const categories: Record<string, { name: string; description: string }> = {
  '18': { name: '영양제', description: '일상 건강 관리를 위한 필수 영양제 가이드' },
  '19': { name: '운동/홈트', description: '효과적인 운동과 홈트레이닝을 위한 추천 제품' },
  '20': { name: '다이어트', description: '건강한 체중 관리를 위한 식단과 제품' },
  '21': { name: '뷰티', description: '피부 건강을 위한 스킨케어와 영양제' },
};

const posts = [
  { id: 1, title: '2026 오메가3 추천 TOP 10, 가성비부터 프리미엄까지', category: '영양제', categoryColor: 'bg-emerald-100 text-emerald-700', image: '🐟', readTime: '8분', views: '12.5K', date: '2026.02.10' },
  { id: 2, title: '유산균 효과 제대로 보는 법, 복용 시간과 주의사항', category: '영양제', categoryColor: 'bg-emerald-100 text-emerald-700', image: '🥛', readTime: '6분', views: '15.2K', date: '2026.02.05' },
];

// 정적 경로 생성 (Static Export 필수)
export function generateStaticParams() {
  return [
    { id: '18' },
    { id: '19' },
    { id: '20' },
    { id: '21' },
  ];
}

// 목록 외 ID는 404
export const dynamicParams = false;

// Next.js 15 타입 정의
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = categories[id] || { name: '카테고리', description: '' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-600">Quagua Health</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/category/18" className="text-gray-600 hover:text-emerald-600">영양제</Link>
            <Link href="/category/19" className="text-gray-600 hover:text-emerald-600">운동/홈트</Link>
            <Link href="/category/20" className="text-gray-600 hover:text-emerald-600">다이어트</Link>
            <Link href="/category/21" className="text-gray-600 hover:text-emerald-600">뷰티</Link>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6">
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600">{category.description}</p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">{post.image}</span>
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}>{post.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-xl mb-2">Quagua Health</p>
          <p className="text-sm">© 2026 Quagua Health Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
