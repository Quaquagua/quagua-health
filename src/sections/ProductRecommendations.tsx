import { Star, Check, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';

// 실제 쿠팡 파트너스 링크 (예시 - 실제 사용시 쿠팡 파트너스에서 생성한 링크로 교체)
const coupangLinks = {
  omega3: 'https://link.coupang.com/a/bFND7J',
  running: 'https://link.coupang.com/a/bFND7K',
  lactofit: 'https://link.coupang.com/a/bFND7L',
  collagen: 'https://link.coupang.com/a/bFND7M',
  protein: 'https://link.coupang.com/a/bFND7N',
  scale: 'https://link.coupang.com/a/bFND7O',
  sunscreen: 'https://link.coupang.com/a/bFND7P',
  vitamin: 'https://link.coupang.com/a/bFND7Q',
};

const products = [
  {
    id: 1,
    name: '닥터스베스트 오메가3',
    category: '영양제',
    rating: 4.8,
    reviews: 2847,
    price: '32,900원',
    originalPrice: '45,000원',
    discount: '27%',
    tags: ['EPA/DHA 고함량', 'IFOS 인증'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    isBest: true,
    link: coupangLinks.omega3,
    description: '혈관 건강과 뇌 기능에 필수적인 오메가3',
  },
  {
    id: 2,
    name: '나이키 에어 줌 페가수스 39',
    category: '운동',
    rating: 4.9,
    reviews: 1523,
    price: '129,000원',
    originalPrice: '149,000원',
    discount: '13%',
    tags: ['러닝화 1위', '쿠셔닝 우수'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    isBest: true,
    link: coupangLinks.running,
    description: '편안한 쿠셔닝의 베스트셀러 러닝화',
  },
  {
    id: 3,
    name: '종근당건강 락토핏 생유산균',
    category: '영양제',
    rating: 4.7,
    reviews: 5621,
    price: '18,500원',
    originalPrice: '25,000원',
    discount: '26%',
    tags: ['1위 유산균', '100억 CFU'],
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
    isBest: false,
    link: coupangLinks.lactofit,
    description: '장 건강을 위한 국민 유산균',
  },
  {
    id: 4,
    name: '비타할로 프리미엄 콜라겐',
    category: '뷰티',
    rating: 4.6,
    reviews: 1892,
    price: '24,900원',
    originalPrice: '35,000원',
    discount: '29%',
    tags: ['저분자 콜라겐', '피부 탄력'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
    isBest: false,
    link: coupangLinks.collagen,
    description: '피부 탄력을 위한 저분자 콜라겐',
  },
];

export default function ProductRecommendations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProductClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} id="hot-deals" className="py-24 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-[hsl(15,85%,55%)] to-[hsl(25,90%,50%)] text-white text-sm font-bold rounded-full mb-6 shadow-coral">
            🔥 오늘의 핫딜
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[hsl(220,20%,12%)] mb-6 tracking-tight">
            이번 주 베스트 제품
          </h2>
          <p className="text-lg text-[hsl(220,10%,42%)] max-w-2xl mx-auto leading-relaxed">
            검증된 리뷰와 전문가 분석을 바탕으로 선정한 추천 제품들입니다.
            <br className="hidden sm:block" />
            쿠팡 파트너스 링크를 통해 구매시 수수료를 받을 수 있습니다.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-white rounded-2xl border-2 border-[hsl(30,15%,88%)] hover:border-[hsl(15,85%,55%)]/30 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => handleProductClick(product.link)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 img-warm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-[hsl(350,75%,55%)] to-[hsl(340,70%,60%)] text-white text-xs font-bold rounded-full shadow-lg">
                  {product.discount} 할인
                </div>
                
                {product.isBest && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-[hsl(15,85%,55%)] to-[hsl(25,90%,50%)] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    BEST
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[hsl(15,85%,55%)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ExternalLink className="w-6 h-6 text-[hsl(15,85%,55%)]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Category */}
                <Badge variant="secondary" className="mb-3 text-xs font-medium">
                  {product.category}
                </Badge>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-[hsl(220,20%,12%)]">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-[hsl(220,10%,42%)]">
                    ({product.reviews.toLocaleString()}개 리뷰)
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-bold text-[hsl(220,20%,12%)] mb-2 line-clamp-2 group-hover:text-[hsl(15,85%,55%)] transition-colors leading-snug">
                  {product.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-[hsl(220,10%,42%)] mb-4 line-clamp-1">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-[hsl(15,85%,55%)]/10 text-[hsl(15,85%,55%)] rounded-lg font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-black text-[hsl(350,75%,55%)]">
                    {product.price}
                  </span>
                  <span className="text-sm text-[hsl(220,10%,42%)] line-through">
                    {product.originalPrice}
                  </span>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-gradient-to-r group-hover:from-[hsl(15,85%,55%)] group-hover:to-[hsl(25,90%,50%)] group-hover:text-white group-hover:border-transparent transition-all duration-300 rounded-xl font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.link);
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  쿠팡에서 보기
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-14">
          <Button 
            className="gradient-coral text-white hover:opacity-90 rounded-xl h-12 px-8 font-semibold shadow-coral hover:shadow-coral-lg transition-all"
            onClick={() => window.open('https://www.coupang.com', '_blank')}
          >
            전체 제품 둘러보기
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-center text-xs text-[hsl(220,10%,42%)] mt-6">
          * 본 페이지는 쿠팡 파트너스 활동의 일환으로 수수료를 받을 수 있습니다.
        </p>
      </div>
    </section>
  );
}
