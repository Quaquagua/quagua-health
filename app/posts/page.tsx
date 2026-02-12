import Link from 'next/link';
import { ArrowLeft, Clock, Eye } from 'lucide-react';

// WordPress API에서 글 가져오기
async function getPosts() {
  try {
    const res = await fetch('https://mediumturquoise-spider-328427.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=12', {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6">
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">전체 글</h1>
          <p className="text-lg text-gray-600">영양제부터 울동, 다이어트, 뷰티까지 모든 건강 리뷰를 확인해보세요.</p>
        </div>
      </section>

      {/* Posts Grid - WordPress에서 가져옴! */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all block">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform">🌿</span>
                  </div>
                  <div className="p-6">
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-sm text-gray-500 line-clamp-2 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5분</span>
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />1.2K</span>
                      </div>
                      <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">아직 포스팅된 글이 없습니다.</p>
              <p className="text-gray-400 mt-2">n8n 자동화를 설정하면 여기에 글이 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-bold text-xl mb-2">Quagua Health</p>
          <p className="text-sm">© 2026 Quagua Health Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
