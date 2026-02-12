import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

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
  { value: '500+', label: '건강 리뷰' },
  { value: '50K+', label: '월간 방문자' },
  { value: '100%', label: '전문 검증' },
];

const categories = [
  { name: '영양제', count: '128개 리뷰', href: '/category/1' },
  { name: '울동/홈트', count: '95개 리뷰', href: '/category/2' },
  { name: '다이어트', count: '87개 리뷰', href: '/category/3' },
  { name: '뷰티', count: '76개 리뷰', href: '/category/4' },
];

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header - 미니멀 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D5A4A] flex items-center justify-center">
                <span className="text-white text-lg">Q</span>
              </div>
              <span className="text-xl font-semibold text-stone-800 tracking-tight">Quagua</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/category/1" className="text-sm text-stone-600 hover:text-[#2D5A4A] transition-colors">영양제</Link>
              <Link href="/category/2" className="text-sm text-stone-600 hover:text-[#2D5A4A] transition-colors">울동/홈트</Link>
              <Link href="/category/3" className="text-sm text-stone-600 hover:text-[#2D5A4A] transition-colors">다이어트</Link>
              <Link href="/category/4" className="text-sm text-stone-600 hover:text-[#2D5A4A] transition-colors">뷰티</Link>
            </nav>

            <button className="px-5 py-2.5 bg-[#2D5A4A] text-white text-sm font-medium rounded-full hover:bg-[#234840] transition-colors">
              구독하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero - 큰 타이포그래피 */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm text-[#2D5A4A] font-medium mb-6 tracking-wide uppercase">Health & Wellness Guide</p>
            <h1 className="text-5xl lg:text-7xl font-bold text-stone-900 leading-[1.1] mb-8 tracking-tight">
              당신의 건강을<br />
              <span className="text-[#2D5A4A]">전문적으로</span> 챙겨드려요
            </h1>
            <p className="text-lg lg:text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
              영양제부터 울동, 다이어트, 뷰티까지. 검증된 정볼로 건강한 라이프스타일을 만들어가세요.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#posts" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2D5A4A] text-white font-medium rounded-full hover:bg-[#234840] transition-all">
                콘텐츠 둘러보기
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/posts" className="inline-flex items-center gap-2 px-6 py-3.5 text-stone-700 font-medium hover:text-[#2D5A4A] transition-colors">
                전체 글 보기
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-16 pt-16 border-t border-stone-200">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl lg:text-4xl font-bold text-stone-900 mb-1">{stat.value}</p>
                <p className="text-sm text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - 그리드 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-[#2D5A4A] font-medium mb-2">Categories</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-900">카테고리별 리뷰</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link key={cat.name} href={cat.href} className="group p-6 bg-[#FAFAF8] rounded-2xl hover:bg-[#2D5A4A] transition-all duration-300">
                <p className="text-3xl font-bold text-stone-900 group-hover:text-white mb-2 transition-colors">{cat.name}</p>
                <p className="text-sm text-stone-500 group-hover:text-white/70 transition-colors">{cat.count}</p>
                <div className="mt-4 flex items-center gap-1 text-[#2D5A4A] group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">둘러보기</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - 쿠팡 연동 예정 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-[#E85D4E] font-medium mb-2">Recommended</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-900">이번 주 추천 제품</h2>
            </div>
            <Link href="/products" className="text-sm text-stone-500 hover:text-[#2D5A4A] transition-colors flex items-center gap-1">
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '닥터스베스트 오메가3', price: '32,900원', original: '45,000원', tag: 'BEST', tagColor: 'bg-[#E85D4E]' },
              { name: '나이키 페가수스 39', price: '129,000원', original: '149,000원', tag: 'HOT', tagColor: 'bg-[#F5A623]' },
              { name: '종근당 락토핏', price: '18,500원', original: '25,000원', tag: '1위', tagColor: 'bg-[#2D5A4A]' },
              { name: '비타할로 콜라겐', price: '24,900원', original: '35,000원', tag: 'NEW', tagColor: 'bg-[#4A90D9]' },
            ].map((product) => (
              <div key={product.name} className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-[#2D5A4A]/30 hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-48 bg-stone-100 flex items-center justify-center">
                  <span className="text-5xl text-stone-300 group-hover:scale-110 transition-transform duration-300">📦</span>
                  <span className={`absolute top-4 left-4 px-2.5 py-1 ${product.tagColor} text-white text-xs font-bold rounded-full`}>{product.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-[#2D5A4A] transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#E85D4E]">{product.price}</span>
                    <span className="text-sm text-stone-400 line-through">{product.original}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts - WordPress 연동 */}
      <section id="posts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-[#2D5A4A] font-medium mb-2">Latest Reviews</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-900">최신 건강 리뷰</h2>
            </div>
            <Link href="/posts" className="text-sm text-stone-500 hover:text-[#2D5A4A] transition-colors flex items-center gap-1">
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                
                return (
                  <Link key={post.id} href={`/post/${post.slug}`} className="group">
                    <div className="relative h-56 bg-stone-100 rounded-2xl overflow-hidden mb-5">
                      {featuredImage ? (
                        <img src={featuredImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2D5A4A]/10 to-[#2D5A4A]/5">
                          <span className="text-6xl">🌿</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#2D5A4A] font-medium mb-2 uppercase tracking-wide">
                      {post._embedded?.['wp:term']?.[0]?.[0]?.name || '건강정보'}
                    </p>
                    <h3 
                      className="text-xl font-semibold text-stone-900 mb-3 group-hover:text-[#2D5A4A] transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="text-sm text-stone-500 line-clamp-2 mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <div className="flex items-center gap-4 text-xs text-stone-400">
                      <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                      <span>5분 읽기</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#FAFAF8] rounded-2xl">
              <p className="text-stone-500">아직 포스팅된 글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#2D5A4A] rounded-3xl p-10 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">건강한 소식을 받아보세요</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">매주 건강 리뷰와 전문가 팁을 놓치지 마세요.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 h-12 px-5 rounded-full bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-white/40"
              />
              <button type="submit" className="h-12 px-8 bg-white text-[#2D5A4A] font-semibold rounded-full hover:bg-white/90 transition-colors">
                구독하기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2D5A4A] flex items-center justify-center">
                  <span className="text-white text-lg">Q</span>
                </div>
                <span className="text-xl font-semibold text-stone-800">Quagua</span>
              </Link>
              <p className="text-sm text-stone-500 max-w-xs">건강한 삶을 위한 전문적인 가이드</p>
            </div>
            
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-sm font-semibold text-stone-900 mb-4">카테고리</p>
                <ul className="space-y-2">
                  <li><Link href="/category/1" className="text-sm text-stone-500 hover:text-[#2D5A4A]">영양제</Link></li>
                  <li><Link href="/category/2" className="text-sm text-stone-500 hover:text-[#2D5A4A]">울동/홈트</Link></li>
                  <li><Link href="/category/3" className="text-sm text-stone-500 hover:text-[#2D5A4A]">다이어트</Link></li>
                  <li><Link href="/category/4" className="text-sm text-stone-500 hover:text-[#2D5A4A]">뷰티</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900 mb-4">정보</p>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-sm text-stone-500 hover:text-[#2D5A4A]">소개</Link></li>
                  <li><Link href="#" className="text-sm text-stone-500 hover:text-[#2D5A4A]">문의</Link></li>
                  <li><Link href="#" className="text-sm text-stone-500 hover:text-[#2D5A4A]">개인정보처리방침</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-stone-200 text-center">
            <p className="text-sm text-stone-400">© 2026 Quagua Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
