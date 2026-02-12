'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

// 마퀴(흐르는 텍스트) 컴포넌트
function Marquee({ text, speed = 20 }: { text: string; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#1a1a1a] text-white py-3">
      <div 
        className="inline-block animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-sm tracking-widest uppercase">{text}</span>
        ))}
      </div>
    </div>
  );
}

// 애니메이션 카드 컴포넌트
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

export default function HomeA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#1a1a1a] font-sans">
      {/* 마퀴 배너 */}
      <Marquee text="✦ 건강한 삶을 위한 가이드 ✦ 매주 새로운 리뷰 업데이트 ✦ 전문가 검증 정보" speed={30} />

      {/* 헤더 */}
      <header className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 100 ? 'bg-[#f5f3ef]/95 backdrop-blur-md' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-light tracking-tight">
              Quagua<span className="font-medium">Health</span>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-10">
              {['영양제', '울동/홈트', '다이어트', '뷰티'].map((item) => (
                <Link 
                  key={item} 
                  href={`/category/${item}`}
                  className="text-sm tracking-wide hover:opacity-60 transition-opacity relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <button className="hidden lg:block text-sm tracking-wide border border-black px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                구독하기
              </button>
              <button 
                className="lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-[#f5f3ef] border-b border-black/10 transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="px-6 py-8 space-y-4">
            {['영양제', '울동/홈트', '다이어트', '뷰티'].map((item) => (
              <Link 
                key={item} 
                href={`/category/${item}`}
                className="block text-2xl font-light py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-sm tracking-[0.3em] uppercase text-black/50">Health & Wellness Guide</p>
              <h1 className="text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                당신의 건강을<br />
                <span className="italic font-serif">전문적으로</span><br />
                챙겨드려요
              </h1>
              <p className="text-lg text-black/60 max-w-md leading-relaxed">
                영양제부터 울동, 다이어트, 뷰티까지. 검증된 정보로 건강한 라이프스타일을 만들어가세요.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link 
                  href="#posts" 
                  className="group flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full hover:bg-black/80 transition-all"
                >
                  <span className="text-sm tracking-wide">콘텐츠 둘러보기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* 히어로 이미지 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop" 
                    alt="Health"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop" 
                    alt="Fitness"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-50 rounded-2xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop" 
                    alt="Diet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-violet-100 to-purple-50 rounded-2xl overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=800&fit=crop" 
                    alt="Beauty"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-20 px-6 lg:px-12 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Categories</p>
            <h2 className="text-4xl lg:text-5xl font-light mb-16">카테고리별 리뷰</h2>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '영양제', count: '128', color: 'from-emerald-50 to-teal-50', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=500&fit=crop' },
              { name: '울동/홈트', count: '95', color: 'from-orange-50 to-amber-50', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop' },
              { name: '다이어트', count: '87', color: 'from-rose-50 to-pink-50', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=500&fit=crop' },
              { name: '뷰티', count: '76', color: 'from-violet-50 to-purple-50', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop' },
            ].map((cat, i) => (
              <AnimatedCard key={cat.name} delay={i * 100}>
                <Link href={`/category/${cat.name}`} className="group block">
                  <div className={`aspect-[4/5] bg-gradient-to-br ${cat.color} rounded-2xl overflow-hidden mb-4 relative`}>
                    <img 
                      src={cat.img} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-light group-hover:italic transition-all">{cat.name}</h3>
                    <span className="text-sm text-black/50">{cat.count}개 리뷰</span>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 제품 섹션 */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Recommended</p>
                <h2 className="text-4xl lg:text-5xl font-light">이번 주 추천 제품</h2>
              </div>
              <Link href="/products" className="hidden lg:flex items-center gap-2 text-sm hover:opacity-60 transition-opacity">
                전체 보기 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: '닥터스베스트 오메가3', price: '32,900원', original: '45,000원', tag: 'BEST', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop' },
              { name: '나이키 페가수스 39', price: '129,000원', original: '149,000원', tag: 'HOT', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
              { name: '종근당 락토핏', price: '18,500원', original: '25,000원', tag: '1위', img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop' },
              { name: '비타할로 콜라겐', price: '24,900원', original: '35,000원', tag: 'NEW', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
            ].map((product, i) => (
              <AnimatedCard key={product.name} delay={i * 100}>
                <div className="group cursor-pointer">
                  <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-wide">{product.tag}</span>
                  </div>
                  <h3 className="font-medium mb-2 group-hover:italic transition-all">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">{product.price}</span>
                    <span className="text-sm text-black/40 line-through">{product.original}</span>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 리뷰 섹션 */}
      <section id="posts" className="py-20 px-6 lg:px-12 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-black/50 mb-4">Latest Reviews</p>
                <h2 className="text-4xl lg:text-5xl font-light">최신 건강 리뷰</h2>
              </div>
              <Link href="/posts" className="hidden lg:flex items-center gap-2 text-sm hover:opacity-60 transition-opacity">
                전체 보기 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <AnimatedCard key={i} delay={i * 150}>
                <Link href="/post/sample" className="group block">
                  <div className="aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden mb-5">
                    <img 
                      src={`https://images.unsplash.com/photo-${['1556742049-0cfed4f6a45d', '1571019614242-c5c5dee9f50b', '1512621776951-a57141f2eefd'][i]}?w=600&h=400&fit=crop`}
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] uppercase text-black/40 mb-3">영양제</p>
                  <h3 className="text-xl font-light mb-3 group-hover:italic transition-all line-clamp-2">
                    2026년 최신 오메가3 추천 TOP 10, 가성비부터 프리미엄까지
                  </h3>
                  <p className="text-sm text-black/50 line-clamp-2 mb-4">
                    혈관 건강과 뇌 기능에 필수적인 오메가3. EPA/DHA 함량, 순도, 가격대별로 꼼꼼히 비교했습니다.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-black/40">
                    <span>2026.02.10</span>
                    <span>5분 읽기</span>
                  </div>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스레터 섹션 */}
      <section className="py-20 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedCard>
            <p className="text-sm tracking-[0.3em] uppercase text-white/50 mb-6">Newsletter</p>
            <h2 className="text-4xl lg:text-5xl font-light mb-6">건강한 소식을 받아보세요</h2>
            <p className="text-white/60 mb-10">매주 건강 리뷰와 전문가 팁을 놓치지 마세요.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors">
                구독하기
              </button>
            </form>
          </AnimatedCard>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-16 px-6 lg:px-12 bg-[#f5f3ef] border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="text-2xl font-light tracking-tight mb-4 block">
                Quagua<span className="font-medium">Health</span>
              </Link>
              <p className="text-black/50 max-w-sm">건강한 삶을 위한 전문적인 가이드. 영양제부터 울동, 다이어트, 뷰티까지.</p>
            </div>
            <div>
              <p className="text-sm tracking-wide uppercase text-black/40 mb-4">카테고리</p>
              <ul className="space-y-3">
                {['영양제', '울동/홈트', '다이어트', '뷰티'].map((item) => (
                  <li key={item}>
                    <Link href={`/category/${item}`} className="text-black/70 hover:text-black transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm tracking-wide uppercase text-black/40 mb-4">정보</p>
              <ul className="space-y-3">
                <li><Link href="#" className="text-black/70 hover:text-black transition-colors">소개</Link></li>
                <li><Link href="#" className="text-black/70 hover:text-black transition-colors">문의</Link></li>
                <li><Link href="#" className="text-black/70 hover:text-black transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black/40">© 2026 Quagua Health. All rights reserved.</p>
            <p className="text-sm text-black/40">Made with care for your health</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}
