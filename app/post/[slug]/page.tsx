import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

// WordPress에서 글 가져오기
async function getPost(slug: string) {
  try {
    const res = await fetch(`https://mediumturquoise-spider-328427.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    });
    const posts = await res.json();
    return posts[0] || null;
  } catch {
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">글을 찾을 수 없습니다</h1>
          <Link href="/" className="text-emerald-600 hover:underline">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-600">Quagua Health</Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/posts" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-6">
          <ArrowLeft className="w-4 h-4" />
          목록으로 돌아가기
        </Link>
        
        <h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('ko-KR')}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5분 읽기</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4" />Quagua Health</span>
        </div>

        <div 
          className="prose prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
}
