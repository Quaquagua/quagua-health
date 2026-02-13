import { ArrowRight, Sparkles, TrendingUp, Shield, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: '500+', label: '건강 리뷰', icon: TrendingUp },
  { value: '50K+', label: '월간 방문자', icon: Sparkles },
  { value: '100%', label: '전문 검증', icon: Shield },
];

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop',
    alt: '영양제',
    label: '영양제',
    delay: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=800&fit=crop',
    alt: '운동/홈트',
    label: '운동/홈트',
    delay: 100,
  },
  {
    src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=800&fit=crop',
    alt: '다이어트',
    label: '다이어트',
    delay: 200,
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop',
    alt: '뷰티',
    label: '뷰티',
    delay: 300,
  },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(15 85% 55% / 0.15) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(35 95% 50% / 0.12) 0%, transparent 70%)',
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[hsl(15,85%,55%)]" />
                <span className="text-sm font-semibold text-[hsl(220,20%,12%)]">
                  건강한 삶을 위한 가이드
                </span>
              </div>

              {/* Title */}
              <div
                className={`space-y-4 transition-all duration-700 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[hsl(220,20%,12%)] leading-[1.1] tracking-tight">
                  당신의 건강을
                  <br />
                  <span className="text-gradient-coral">전문적으로</span>
                  <br />
                  챙겨드려요
                </h1>
                <p className="text-lg sm:text-xl text-[hsl(220,10%,42%)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  영양제부터 <span className="font-semibold text-[hsl(220,20%,12%)]">운동</span>, 다이어트, 뷰티까지.
                  <br className="hidden sm:block" />
                  검증된 정보로 건강한 라이프스타일을 만들어가세요.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Button
                  size="lg"
                  className="gradient-coral hover:opacity-90 text-white px-8 h-14 text-base font-semibold rounded-xl shadow-coral hover:shadow-coral-lg transition-all hover:-translate-y-0.5"
                >
                  콘텐츠 둘러보기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[hsl(15,85%,55%)]/20 text-[hsl(15,85%,55%)] hover:bg-[hsl(15,85%,55%)]/5 h-14 text-base font-semibold rounded-xl transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  구독하기
                </Button>
              </div>

              {/* Stats */}
              <div
                className={`flex flex-wrap justify-center lg:justify-start gap-8 pt-4 transition-all duration-700 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-[hsl(15,85%,55%)]" />
                      <span className="text-3xl font-black text-[hsl(220,20%,12%)]">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[hsl(220,10%,42%)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 4 Image Grid (A-Style) */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                {heroImages.map((image, index) => (
                  <div
                    key={image.alt}
                    className={`group relative overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-coral-lg ${
                      index === 0 ? 'aspect-[3/4]' : index === 1 ? 'aspect-square mt-8' : index === 2 ? 'aspect-square -mt-8' : 'aspect-[3/4]'
                    }`}
                    style={{
                      animationDelay: `${image.delay}ms`,
                      transform: isLoaded
                        ? `translate(${mousePosition.x * (0.5 + index * 0.1)}px, ${mousePosition.y * (0.5 + index * 0.1)}px)`
                        : undefined,
                      transition: 'transform 0.3s ease-out, box-shadow 0.3s ease, translate 0.3s ease',
                    }}
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 img-warm"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[hsl(220,20%,12%)] shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {image.label}
                      </span>
                    </div>
                    
                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(15,85%,55%)] to-[hsl(35,95%,50%)] opacity-20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(35,95%,50%)] to-[hsl(15,85%,55%)] opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
