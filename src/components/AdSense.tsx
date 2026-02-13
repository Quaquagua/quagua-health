'use client';

interface AdSenseProps {
  slot: string;
  style?: React.CSSProperties;
}

export default function AdSense({ slot, style }: AdSenseProps) {
  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
