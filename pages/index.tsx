import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <h1>Quagua Health</h1>
      <p>pages router로 임시 홈 생성 성공</p>
      <p>
        <Link href="/category/1">영양제</Link>
      </p>
    </div>
  );
}
