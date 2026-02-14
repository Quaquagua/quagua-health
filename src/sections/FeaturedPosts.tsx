import { Clock, Eye, ArrowRight, TrendingUp, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          thumbnail?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
  };
}

const categoryColors: Record<string, string> = {
  '영양제': 'bg-emerald-100 text-emerald-700',
  '운동': 'bg-orange-100 text-orange-700',
  '홈트': 'bg-orange-100 text-orange-700',
  '다이어트': 'bg-rose-100 text-rose-700',
  '뷰티': 'bg-violet-100 text-violet-700',
  'default': 'bg-[hsl(15,85%,55%)]/10 text-[hsl(15,85%,55%)]',
};

const defaultPosts = [
  {
    id: 1,
    title: '2026 오메가3 추천 TOP 10, 가성비부터 프리미엄까지',
    excerpt: '혈관 건강과 뇌 기능에 필수적인 오메가3. EPA/DHA 함량, 순도, 가격대별로 꼼꼼히 비교했습니다.',
    category: '영양제',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop',
    readTime: '8분',
    views: '12.5K',
    isHot: true,
    date: '2026.02.10',
    link: '#',
    slug: 'omega3-top10-2026',
  },
  {
    id: 2,
    title: '러닝화 고르는 법 완벽 가이드 - 2026년 최신판',
    excerpt: '발 모양과 러닝 스타일에 따른 최적의 러닝화 선택 방법. 나이키, 아디다스, 뉴 발란스 인기 모델 비교.',
    category: '운동',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    readTime: '12분',
    views: '8.3K',
    isHot: true,
    date: '2026.02.08',
    link: '#',
    slug: 'running-shoes-guide-2026',
  },
  {
    id: 3,
    title: '유산균 효과 제대로 보는 법, 복용 시간과 주의사항',
    excerpt: '유산균을 언제 먹어야 할까? 공복 vs 식후, 생유산균 vs 사균의 차이점과 올바른 복용법.',
    category: '영양제',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&h=400&fit=crop',
    readTime: '6분',
    views: '15.2K',
    isHot: false,
    date: '2026.02.05',
    link: '#',
    slug: 'probiotics-guide',
  },
  {
    id: 4,
    title: '홈트레이닝 필수템 10가지 - 초보자부터 고수까지',
    excerpt: '집에서도 효과적인 운동을 위한 기구들. 덤벨부터 요가매트, 풀업밴드까지 꼭 필요한 아이템들.',
    category: '홈트',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    readTime: '10분',
    views: '6.7K',
    isHot: false,
    date: '2026.02.03',
    link: '#',
    slug: 'home-training-essentials',
  },
  {
    id: 5,
    title: '콜라겐 효과 있는지 확인하는 3가지 방법',
    excerpt: '피부 탄력과 관절 건강에 도움되는 콜라겐. 분자량, 추출원, 함량으로 효과적인 제품 고르기.',
    category: '뷰티',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    readTime: '7분',
    views: '9.1K',
    isHot: true,
    date: '2026.02.01',
    link: '#',
    slug: 'collagen-effect-check',
  },
  {
    id: 6,
    title: '다이어트 보조제, 정말 효과 있을까? 전문가 의견',
    excerpt: '체지방 감소에 도움되는 성분들의 과학적 근거와 부작용. 가르시니아, 녹차카테킨, CLA 분석.',
    category: '다이어트',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    readTime: '9분',
    views: '11.8K',
    isHot: false,
    date: '2026.01.28',
    link: '#',
    slug: 'diet-supplements-review',
  },
];

export default function FeaturedPosts() {
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://mediumturquoise-spider-328427.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=6&orderby=date&order=desc'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const wpPosts: WordPressPost[] = await response.json();
        
        if (wpPosts.length > 0) {
          const formattedPosts = wpPosts.map((post, index) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
            const imageUrl = featuredImage?.source_url || 
                           featuredImage?.media_details?.sizes?.medium?.source_url ||
                           defaultPosts[index]?.image || defaultPosts[0].image;
            
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || '영양제';
            const date = new Date(post.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).replace(/\. /g, '.');

            return {
              id: post.id,
              title: post.title.rendered.replace(/<[^>]*>/g, ''),
              excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
              category,
              image: imageUrl,
              readTime: `${Math.ceil(post.excerpt.rendered.length / 200)}분`,
              views: `${(Math.random() * 10 + 5).toFixed(1)}K`,
              isHot: index < 2,
              date,
              link: post.link,
              slug: post.slug,
            };
          });
          
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.log('Using default posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 gradient-warm">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <span className="inline-block px-5 py-2 bg-[hsl(15,85%,55%)]/10 text-[hsl(15,85%,55%)] text-sm font-bold rounded-full mb-6">
              최신 리뷰
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[hsl(220,20%,12%)] tracking-tight">
              인기 건강 리뷰
            </h2>
          </div>
          <Button 
            variant="outline" 
            className="w-fit rounded-xl border-2 border-[hsl(15,85%,55%)]/20 text-[hsl(15,85%,55%)] hover:bg-[hsl(15,85%,55%)]/5 font-semibold"
            onClick={() => window.open('https://www.coupang.com', '_blank')}
          >
            쿠팡 베스트 제품 보기
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/post/${post.slug}`)}
              >
                {/* Image Area */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 img-warm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {post.isHot && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[hsl(15,85%,55%)] to-[hsl(25,90%,50%)] text-white text-xs font-bold rounded-full shadow-lg">
                      <TrendingUp className="w-3.5 h-3.5" />
                      HOT
                    </div>
                  )}
                  <Badge
                    className={`absolute top-4 right-4 ${categoryColors[post.category] || categoryColors.default} font-semibold`}
                  >
                    {post.category}
                  </Badge>
                  
                  {/* External Link Icon */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ExternalLink className="w-4 h-4 text-[hsl(220,20%,12%)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[hsl(220,20%,12%)] mb-3 line-clamp-2 group-hover:text-[hsl(15,85%,55%)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[hsl(220,10%,42%)] mb-5 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-[hsl(220,10%,42%)] pt-4 border-t border-[hsl(30,15%,88%)]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views}
                      </span>
                    </div>
                    <span className="font-medium">{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-14">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-12 rounded-xl border-2 border-[hsl(15,85%,55%)]/20 text-[hsl(15,85%,55%)] hover:bg-[hsl(15,85%,55%)]/5 font-semibold h-12"
            onClick={() => window.open('https://link.coupang.com/a/bFND7J', '_blank')}
          >
            쿠팡에서 더 많은 제품 보기
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
