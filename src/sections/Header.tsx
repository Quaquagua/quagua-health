import { useState, useEffect } from 'react';
import { Menu, X, Search, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: '영양제', href: '#supplements', icon: '🌿' },
  { name: '운동/홈트', href: '#fitness', icon: '💪' },
  { name: '다이어트', href: '#diet', icon: '🥗' },
  { name: '뷰티', href: '#beauty', icon: '✨' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl gradient-coral flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-coral">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[hsl(220,20%,12%)] leading-tight tracking-tight">
                Quagua
              </span>
              <span className="text-xs font-medium text-[hsl(220,10%,42%)] leading-tight">
                Health Blog
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="px-4 py-2.5 text-sm font-semibold text-[hsl(220,20%,12%)]/80 hover:text-[hsl(15,85%,55%)] hover:bg-[hsl(15,85%,55%)]/5 rounded-xl transition-all duration-300"
              >
                {category.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                  <Input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="w-48 h-10 rounded-xl border-[hsl(15,85%,55%)]/20 focus:border-[hsl(15,85%,55%)]"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-[hsl(15,85%,55%)]/5 hover:text-[hsl(15,85%,55%)]"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Subscribe Button */}
            <Button
              className="hidden sm:flex items-center gap-2 gradient-coral hover:opacity-90 text-white rounded-xl shadow-coral hover:shadow-coral-lg transition-all"
              size="sm"
            >
              <Heart className="w-4 h-4" />
              구독하기
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl hover:bg-[hsl(15,85%,55%)]/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[hsl(30,15%,88%)] animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 rounded-xl"
              />
              <Button size="icon" variant="ghost" className="rounded-xl">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Categories */}
            <nav className="space-y-1">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-3 px-3 py-3 text-[hsl(220,20%,12%)] hover:bg-[hsl(15,85%,55%)]/5 rounded-xl transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </a>
              ))}
            </nav>

            {/* Mobile Subscribe */}
            <Button className="w-full gradient-coral text-white rounded-xl">
              <Heart className="w-4 h-4 mr-2" />
              구독하기
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
