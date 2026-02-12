import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quagua Health - 건강한 삶을 위한 가이드',
  description: '영양제부터 울동, 다이어트, 뷰티까지. 검증된 정볼로 건강한 라이프스타일을 만들어가세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5061121754649972"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
