interface CoupangBannerProps {
  link: string;
  imageUrl?: string;
  width?: number;
  height?: number;
}

export default function CoupangBanner({ 
  link, 
  imageUrl = 'https://image10.coupangcdn.com/image/affiliate/banner/1c3e0e7c8f9b2a4d5e6f7a8b9c0d1e2f.jpg',
  width = 728,
  height = 90 
}: CoupangBannerProps) {
  return (
    <div className="my-8 text-center">
      <p className="text-xs text-gray-400 mb-2">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img 
          src={imageUrl} 
          alt="쿠팡 파트너스" 
          width={width} 
          height={height}
          className="mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
        />
      </a>
    </div>
  );
}
