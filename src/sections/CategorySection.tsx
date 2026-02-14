import { ExternalLink, Pill, Dumbbell, Apple, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

const categories = [
  {
    id: 'supplements',
    title: '영양제',
    subtitle: 'Supplements',
    description: '일상 건강 관리를 위한 필수 영양제 가이드',
    icon: Pill,
    color: 'coral',
    gradient: 'from-[hsl(15,85%,55%)] to-[hsl(25,90%,50%)]',
    bgGradient: 'from-[hsl(15,85%,55%)]/10 to-[hsl(25,90%,50%)]/5',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop',
    items: [
      { name: '오메가3', desc: '혈관 건강 & 뇌 기능' },
      { name: '비타민', desc: '면역력 & 활력' },
      { name: '유산균', desc: '장 건강' },
      { name: '종합비타민', desc: '영양 균형' },
    ],
    articles: 128,
    coupangLink: 'https://link.coupang.com/a/bFND7J',
  },
  {
    id: 'fitness',
    title: '운동/홈트',
    subtitle: 'Fitness',
    description: '효과적인 운동과 홈트레이닝을 위한 추천 제품',
    icon: Dumbbell,
    color: 'amber',
    gradient: 'from-[hsl(35,95%,50%)] to-[hsl(25,85%,55%)]',
    bgGradient: 'from-[hsl(35,95%,50%)]/10 to-[hsl(25,85%,55%)]/5',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    items: [
      { name: '프로틴', desc: '근육 회복 & 성장' },
      { name: '운동기구', desc: '홈트 필수템' },
      { name: '러닝화', desc: '편안한 러닝' },
      { name: '보충제', desc: '운동 효율 UP' },
    ],
    articles: 95,
    coupangLink: 'https://link.coupang.com/a/bFND7K',
  },
  {
    id: 'diet',
    title: '다이어트',
    subtitle: 'Diet',
    description: '건강한 체중 관리를 위한 식단과 제품',
    icon: Apple,
    color: 'rose',
    gradient: 'from-[hsl(350,75%,55%)] to-[hsl(340,70%,60%)]',
    bgGradient: 'from-[hsl(350,75%,55%)]/10 to-[hsl(340,70%,60%)]/5',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    items: [
      { name: '체중계', desc: '정확한 체크' },
      { name: '식품', desc: '저칼로리 식품' },
      { name: '쉐이크', desc: '간편한 식사' },
      { name: '보조제', desc: '체지방 관리' },
    ],
    articles: 87,
    coupangLink: 'https://link.coupang.com/a/bFND7O',
  },
  {
    id: 'beauty',
    title: '뷰티',
    subtitle: 'Beauty',
    description: '피부 건강을 위한 스킨케어와 영양제',
    icon: Sparkles,
    color: 'violet',
    gradient: 'from-[hsl(260,70%,55%)] to-[hsl(280,65%,60%)]',
    bgGradient: 'from-[hsl(260,70%,55%)]/10 to-[hsl(280,65%,60%)]/5',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop',
    items: [
      { name: '콜라겐', desc: '피부 탄력' },
      { name: '선크림', desc: 'UV 차단' },
      { name: '스킨케어', desc: '피부 관리' },
      { name: '이너뷰티', desc: '내면 뷰티' },
    ],
    articles: 76,
    coupangLink: 'https://link.coupang.com/a/bFND7P',
  },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 bg-[hsl(15,85%,55%)]/10 text-[hsl(15,85%,55%)] text-sm font-bold rounded-full mb-6">
            카테고리
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[hsl(220,20%,12%)] mb-6 tracking-tight">
            건강을 위한 모든 것
          </h2>
          <p className="text-lg text-[hsl(220,10%,42%)] max-w-2xl mx-auto leading-relaxed">
            영양제부터 <span className="font-semibold text-[hsl(220,20%,12%)]">운동</span>, 다이어트, 뷰티까지.
            <br className="hidden sm:block" />
            당신의 건강한 라이프스타일을 위한 전문적인 가이드를 제공합니다.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-32">
          {categories.map((category, index) => (
            <div
              key={category.id}
              id={category.id}
              data-index={index}
              className={`pt-11 -mt-11 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center transition-all duration-700 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Content Side */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[hsl(220,10%,42%)] uppercase tracking-wider">
                      {category.subtitle}
                    </span>
                    <h3 className="text-3xl font-black text-[hsl(220,20%,12%)]">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xl text-[hsl(220,10%,42%)] leading-relaxed">
                  {category.description}
                </p>

                {/* Items List */}
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${category.bgGradient} hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 group`}
                      onClick={() => window.open(category.coupangLink, '_blank')}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform`}>
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-[hsl(220,20%,12%)] block">
                          {item.name}
                        </span>
                        <span className="text-xs text-[hsl(220,10%,42%)]">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA - 수익화 최적화: 리뷰 보기 → BEST 제품 보기 + 쿠팡 직링크 */}
                <div className="flex items-center gap-6">
                  <Button
                    className={`bg-gradient-to-r ${category.gradient} text-white hover:opacity-90 rounded-xl h-12 px-6 font-semibold shadow-lg hover:shadow-xl transition-all`}
                    onClick={() => window.open(category.coupangLink, '_blank')}
                  >
                    {category.title} BEST 제품 보기
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <span className="text-sm font-medium text-[hsl(220,10%,42%)]">
                    <span className="text-[hsl(15,85%,55%)] font-bold">{category.articles}</span>개의 리뷰
                  </span>
                </div>
              </div>

              {/* Visual Side - Real Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 rounded-3xl blur-3xl -z-10`}
                />
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                  onClick={() => window.open(category.coupangLink, '_blank')}
                >
                  {/* Main Image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105 img-warm"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Floating Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[hsl(220,10%,42%)] uppercase tracking-wider">
                          인기 {category.title}
                        </span>
                        <h4 className="text-lg font-bold text-[hsl(220,20%,12%)]">
                          {category.items[0].name} 추천 TOP 10
                        </h4>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-2xl`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
