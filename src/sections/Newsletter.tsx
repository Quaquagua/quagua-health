import { Mail, Send, CheckCircle, Bell, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const benefits = [
  { icon: Bell, text: '매주 건강 리뷰 업데이트' },
  { icon: Gift, text: '회원 전용 할인 정보' },
  { icon: Star, text: '전문가 건강 팁' },
  { icon: Mail, text: '신제품 소식' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 lg:py-32 gradient-coral relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 border-2 border-white/20 rounded-full" />
      <div className="absolute bottom-20 left-20 w-32 h-32 border-2 border-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/30 rounded-full" />

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <span className="text-white/90 font-bold text-lg">
                  뉴스레터 구독
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                건강한 소식을
                <br />
                매주 받아보세요
              </h2>

              <p className="text-white/80 text-lg leading-relaxed">
                5만+ 구독자와 함께하는 건강 정보.
                <br className="hidden sm:block" />
                검증된 리뷰와 전문가 팁을 놓치지 마세요.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <benefit.icon className="w-5 h-5 text-white/80" />
                    <span className="text-sm text-white/90 font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12 animate-in fade-in">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(15,85%,55%)] to-[hsl(25,90%,50%)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-coral">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-[hsl(220,20%,12%)] mb-3">
                    구독 완료!
                  </h3>
                  <p className="text-[hsl(220,10%,42%)]">
                    건강한 소식을 곧 만나보세요.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[hsl(220,20%,12%)] mb-3">
                      이메일 주소
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-xl border-2 border-[hsl(30,15%,88%)] focus:border-[hsl(15,85%,55%)] text-base"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 gradient-coral hover:opacity-90 text-white rounded-xl font-bold text-base shadow-coral hover:shadow-coral-lg transition-all"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    구독하기 (묣음)
                  </Button>

                  <p className="text-xs text-[hsl(220,10%,42%)] text-center leading-relaxed">
                    구독은 언제든 해지할 수 있습니다.
                    <br />
                    개인정보는 안전하게 보호됩니다.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
