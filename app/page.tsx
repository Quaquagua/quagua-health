import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Shield, Clock, Eye } from 'lucide-react';

// WordPress API에서 글 가져오기
async function getPosts() {
  try {
    const res = await fetch('https://mediumturquoise-spider-328427.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=6', {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const stats = [
  { value: '500+', label: '건강 리뷰', icon: TrendingUp },
  { value: '50K+', label: '월간 방문자', icon: Sparkles },
  { value: '100%', label: '전문 검증', icon: Shield },
];

const categories = [
  { title: '영양제', subtitle: '오메가3 · 비타민 · 유산균', icon: '🌿', href: '/category/1', color: 'from-emerald-500/20 to-teal-500/20' },
  { title: '울동/홈트', subtitle: '프로틴 · 기구 · 러닝화', icon: '💪', href: '/category/2', color: 'from-orange-500/20 to-amber-500/20' },
  { title: '다이어트', subtitle: '체중계 · 식품 · 쉐이크', icon: '🥗', href: '/category/3', color: 'from-rose-500/20 to-pink-500/20' },
  { title: '뷰티', subtitle: '콜라겐 · 선크림 · 스킨케어', icon: '✨', href: '/category/4', color: 'from-violet-500/20 to-purple-500/20' },
];

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white text-xl">🌿</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Quagua</span>
                <span className="text-xs text-gray-500 block">Health Blog</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/category/1" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">영양제</Link>
              <Link href="/category/2" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">울동/홈트</Link>
              <Link href="/category/3" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">다이어트</Link>
              <Link href="/category/4" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">뷰티</Link>
            </nav>
            <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              구독하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">건강한 삶을 위한 가이드</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  당신의 건강을<br />
                  <span className="text-emerald-600">전문적으로</span> 챙겨드려요
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                  영양제부터 울동, 다이어트, 뷰티까지. 검증된 정볼로 건강한 라이프스타일을 만들어가세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="#posts" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-lg font-medium">
                    콘텐츠 둘러보기
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 border border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-medium">
                    구독하기
                  </button>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <stat.icon className="w-4 h-4 text-emerald-600" />
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      </div>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((card) => (
                  <Link key={card.title} href={card.href} className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <span className="text-4xl mb-4 block">{card.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                      <p className="text-xs text-gray-500">{card.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts - WordPress에서 가져온 글! (클릭 가능!) */}
      <section id="posts" className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">최신 리뷰</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">인기 건강 리뷰</h2>
            </div>
            <Link href="/posts" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium">
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all block">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform">🌿</span>
                  </div>
                  <div className="p-6">
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-sm text-gray-500 line-clamp-2 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5분</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />1.2K</span>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">아직 포스팅된 글이 없습니다.</p>
              <p className="text-gray-400 mt-2">n8n 자동화를 설정하면 여기에 글이 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">건강한 소식을 매주 받아보세요</h2>
            <p className="text-white/80 text-lg mb-8">5만+ 구독자와 함께하는 건강 정보. 검증된 리뷰와 전문가 팁을 놓치지 마세요.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 h-12 px-4 rounded-lg text-gray-900" />
              <button type="submit" className="h-12 px-6 bg-gray-900 text-white rounded-lg font-medium">구독하기</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xl">🌿</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Quagua</span>
                  <span className="text-xs text-gray-500 block">Health Blog</span>
                </div>
              </Link>
              <p className="text-sm text-gray-500">건강한 삶을 위한 전문적인 가이드.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">카테고리</h4>
              <ul className="space-y-2">
                <li><Link href="/category/1" className="text-sm hover:text-white">영양제</Link></li>
                <li><Link href="/category/2" className="text-sm hover:text-white">울동/홈트</Link></li>
                <li><Link href="/category/3" className="text-sm hover:text-white">다이어트</Link></li>
                <li><Link href="/category/4" className="text-sm hover:text-white">뷰티</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-600">© 2026 Quagua Health Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
