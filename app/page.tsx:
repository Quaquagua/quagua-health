export const dynamic = 'force-static'

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-600">Quagua Health</Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/category/1" className="text-gray-600 hover:text-emerald-600">영양제</Link>
            <Link href="/category/2" className="text-gray-600 hover:text-emerald-600">울동/홈트</Link>
            <Link href="/category/3" className="text-gray-600 hover:text-emerald-600">다이어트</Link>
            <Link href="/category/4" className="text-gray-600 hover:text-emerald-600">뷰티</Link>
          </nav>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            당신의 건강을 <span className="text-emerald-600">전문적으로</span> 챙겨드려요
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            영양제부터 울동, 다이어트, 뷰티까지. 검증된 정볼로 건강한 라이프스타일을 만들어가세요.
          </p>
          <Link href="/posts" className="gradient-health text-white px-6 py-3 rounded-lg font-medium inline-block">
            콘텐츠 둘러보기
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">카테고리</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: '영양제', href: '/category/1', emoji: '🌿' },
              { name: '울동/홈트', href: '/category/2', emoji: '💪' },
              { name: '다이어트', href: '/category/3', emoji: '🥗' },
              { name: '뷰티', href: '/category/4', emoji: '✨' },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
                <span className="text-4xl mb-2 block">{cat.emoji}</span>
                <span className="font-medium text-gray-900">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-xl mb-2">Quagua Health</p>
          <p className="text-sm">© 2026 Quagua Health Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
