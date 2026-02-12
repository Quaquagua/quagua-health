'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, ShoppingBag, TrendingUp } from 'lucide-react';

// 텍스트 리빌 애니메이션
function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

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
    <span 
      ref={ref}
      className={`inline-block transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {text}
    </span>
  );
}

// 카운터 애니메이션
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomeB() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#FF6B4A] text-white overflow-x-hidden font-sans">
      {/* 커서 효과 */}
      <div 
        className="fixed w-64 h-64 bg-white/10 rounded-full pointer-events-none blur-3xl transition-all duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-3xl lg:text-4xl font-black tracking-tighter">
            QUAGUA
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {['영양제', '울동', '다이어트', '뷰티'].map((item) => (
              <Link 
                key={item} 
                href={`/category/${item}`}
                className="text-lg font-bold hover:underline underline-offset-4 decoration-4"
              >
                {item}
              </Link>
            ))}
          </div>
          <button className="bg-white text-[#FF6B4A] px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            구독하기
          </button>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">50,000+ 구독자와 함께</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                <RevealText text="건강한" delay={0} /><br />
                <RevealText text="삶의" delay={100} /><br />
                <RevealText text="시작" delay={200} />
              </h1>
              
              <p className="text-xl lg:text-2xl font-medium max-w-md opacity-90">
                영양제부터 울동, 다이어트, 뷰티까지. 검증된 정보로 건강한 라이프스타일을 만들어가세요.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#products"
                  className="bg-white text-[#FF6B4A] px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  제품 둘러보기
                </Link>
                <Link 
                  href="#reviews"
                  className="border-4 border-white px-8 py-4 rounded-full font-black text-lg hover:bg-white hover:text-[#FF6B4A] transition-colors"
                >
                  리뷰 보기
                </Link>
              </div>

              {/* 통계 */}
              <div className="flex gap-12 pt-8">
                <div>
                  <p className="text-5xl font-black"><AnimatedCounter end={500} suffix="+" /></p>
                  <p className="text-sm font-bold opacity-70">건강 리뷰</p>
                </div>
                <div>
                  <p className="text-5xl font-black"><AnimatedCounter end={50} suffix="K+" /></p>
                  <p className="text-sm font-bold opacity-70">월간 방문자</p>
                </div>
              </div>
            </div>

            {/* 히어로 이미지 */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-[3rem] rotate-3" />
              <div className="relative bg-white rounded-[3rem] overflow-hidden aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop"
                  alt="Health"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-2xl font-black">2026년 최신 건강 가이드</p>
                  <p className="text-white/80">전문가가 검증한 정보만</p>
                </div>
              </div>
              
              {/* 플로팅 배지 */}
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black p-6 rounded-2xl rotate-[-8deg] shadow-2xl">
                <p className="text-4xl font-black">BEST</p>
                <p className="text-sm font-bold">오메가3 TOP 10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-20 px-6 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-black mb-12 text-center">
            어떤 건강을<br />찾고 있나요?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: '영양제', color: 'bg-emerald-500', count: '128', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=500&fit=crop' },
              { name: '울동/홈트', color: 'bg-orange-500', count: '95', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop' },
              { name: '다이어트', color: 'bg-pink-500', count: '87', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=500&fit=crop' },
              { name: '뷰티', color: 'bg-purple-500', count: '76', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop' },
            ].map((cat, i) => (
              <Link 
                key={cat.name} 
                href={`/category/${cat.name}`}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 ${cat.color} mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-6xl font-black mb-2">{cat.count}</p>
                  <p className="text-2xl font-bold">{cat.name}</p>
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-bold">둘러보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 제품 섹션 */}
      <section id="products" className="py-20 px-6 lg:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-5xl lg:text-7xl font-black">이번 주<br />BEST 제품</h2>
            <Link href="/products" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
              전체 보기
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '닥터스베스트 오메가3', price: '32,900원', original: '45,000원', rating: 4.8, reviews: 2847, tag: 'BEST', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', color: 'bg-yellow-400' },
              { name: '나이키 페가수스 39', price: '129,000원', original: '149,000원', rating: 4.9, reviews: 1523, tag: 'HOT', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', color: 'bg-red-500' },
              { name: '종근당 락토핏', price: '18,500원', original: '25,000원', rating: 4.7, reviews: 5621, tag: '1위', img: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop', color: 'bg-emerald-500' },
              { name: '비타할로 콜라겐', price: '24,900원', original: '35,000원', rating: 4.6, reviews: 1892, tag: 'NEW', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', color: 'bg-blue-500' },
            ].map((product, i) => (
              <div key={product.name} className="group bg-stone-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer">
                <div className="relative aspect-square">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className={`absolute top-4 left-4 ${product.color} text-black px-3 py-1 rounded-full text-sm font-black`}>
                    {product.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews.toLocaleString()})</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#FF6B4A]">{product.price}</span>
                    <span className="text-gray-400 line-through">{product.original}</span>
                  </div>
                  <button className="w-full mt-4 bg-black text-white py-3 rounded-full font-bold hover:bg-[#FF6B4A] transition-colors">
                    쿠팡에서 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 리뷰 섹션 */}
      <section id="reviews" className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-black mb-12">최신 리뷰</h2>
          
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <Link 
                key={i} 
                href="/post/sample"
                className="group block bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 hover:bg-white/20 transition-colors"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="w-full lg:w-48 aspect-video lg:aspect-square bg-stone-200 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={`https://images.unsplash.com/photo-${['1556742049-0cfed4f6a45d', '1571019614242-c5c5dee9f50b', '1512621776951-a57141f2eefd'][i]}?w=400&h=300&fit=crop`}
                      alt="Post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">영양제</span>
                      <span className="text-white/60 text-sm">2026.02.10</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black mb-3 group-hover:underline">
                      2026년 최신 오메가3 추천 TOP 10, 가성비부터 프리미엄까지
                    </h3>
                    <p className="text-white/70 line-clamp-2">
                      혈관 건강과 뇌 기능에 필수적인 오메가3. EPA/DHA 함량, 순도, 가격대별로 꼼꼼히 비교했습니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <span className="font-bold">읽기</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-6 lg:px-12 bg-yellow-400 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl font-black mb-6">매주 건강 정보를<br />받아보세요</h2>
          <p className="text-xl mb-8">5만+ 구독자와 함께하는 건강한 라이프스타일</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="이메일 주소"
              className="flex-1 px-6 py-4 rounded-full text-black placeholder:text-gray-500 focus:outline-none"
            />
            <button className="bg-black text-white px-8 py-4 rounded-full font-black hover:scale-105 transition-transform">
              구독하기
            </button>
          </form>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 px-6 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            <div>
              <p className="text-4xl font-black mb-4">QUAGUA</p>
              <p className="text-white/60">건강한 삶을 위한 전문적인 가이드</p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="font-bold mb-4">카테고리</p>
                <ul className="space-y-2 text-white/60">
                  <li><Link href="#" className="hover:text-white">영양제</Link></li>
                  <li><Link href="#" className="hover:text-white">울동/홈트</Link></li>
                  <li><Link href="#" className="hover:text-white">다이어트</Link></li>
                  <li><Link href="#" className="hover:text-white">뷰티</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-4">정보</p>
                <ul className="space-y-2 text-white/60">
                  <li><Link href="#" className="hover:text-white">소개</Link></li>
                  <li><Link href="#" className="hover:text-white">문의</Link></li>
                  <li><Link href="#" className="hover:text-white">개인정보처리방침</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 text-center text-white/40">
            <p>© 2026 Quagua Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
