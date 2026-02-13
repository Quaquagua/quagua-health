import { Zap, Instagram, Youtube, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  categories: [
    { name: '영양제', href: '#supplements' },
    { name: '운동/홈트', href: '#fitness' },
    { name: '다이어트', href: '#diet' },
    { name: '뷰티', href: '#beauty' },
  ],
  company: [
    { name: '소개', href: '#' },
    { name: '문의하기', href: '#' },
    { name: '광고/제휴', href: '#' },
    { name: '채용', href: '#' },
  ],
  support: [
    { name: '자주 묻는 질문', href: '#' },
    { name: '개인정보처리방침', href: '#' },
    { name: '이용약관', href: '#' },
    { name: '사이트맵', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'KakaoTalk', icon: MessageCircle, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[hsl(220,20%,12%)] text-white/70">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <a href="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center shadow-coral">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white leading-tight tracking-tight">
                    Quagua
                  </span>
                  <span className="text-xs font-medium text-white/50 leading-tight">
                    Health Blog
                  </span>
                </div>
              </a>
              <p className="text-sm text-white/50 mb-8 max-w-xs leading-relaxed">
                건강한 삶을 위한 전문적인 가이드.
                <br />
                영양제부터 <span className="text-white/70">운동</span>, 다이어트, 뷰티까지 검증된 정보로 제공합니다.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Mail className="w-4 h-4" />
                  <span>contact@quagua.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Phone className="w-4 h-4" />
                  <span>02-1234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin className="w-4 h-4" />
                  <span>서울특별시 강남구</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-11 h-11 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-[hsl(15,85%,55%)] hover:to-[hsl(25,90%,50%)] flex items-center justify-center transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">카테고리</h4>
              <ul className="space-y-4">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">회사</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">지원</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © 2026 Quagua Health Blog. All rights reserved.
            </p>
            <p className="text-sm text-white/40">
              건강한 삶을 위한 전문적인 가이드
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
