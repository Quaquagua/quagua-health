import { Clock, Eye, ArrowRight, TrendingUp, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium?: { source_url: string };
          thumbnail?: { source_url: string };
        };
      };
    }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
  };
}

const categoryColors: Record<string, string> = {
  '영양제': 'bg-emerald-100 text-emerald-700',
  '운동': 'bg-orange-100 text-orange-700',
  '홈트': 'bg-orange-100 text-orange-700',
  '다이어트': 'bg-rose-100 text-rose-700',
  '뷰티': 'bg-violet-100 text-violet-700',
  'default': 'bg-[hsl(15,85%,55%)]/10 text-[hsl(15,85%,55%)]',
};

const defaultPosts = [
  {
    id: 1,
    title: '2026 오메가3 추천 TOP 10, 가성비부터 프리미엄까지',
    excerpt: '혈관 건강과 뇌 기능에 필수적인 오메가3. EPA/DHA 함량, 순도, 가격대별로 꼼꼼히 비교했습니다.',
    category: '영양제',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop',
    readTime: '8분',
    views: '12.5K',
    isHot: true,
    date: '2026.02.10',
    link: '#',
    slug: 'omega3-top10-2026',
  },
  {
    id: 2,
    title: '러닝화 고르는 법 완벽 가이드 - 2026년 최신판',
    excerpt: '발 모양과 러닝 스타일에 따른 최적의 러닝화 선택 방법. 나이키, 아디다스, 뉴 발란스 인기 모델 비교.',
    category: '운동',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    readTime: '12분',
    views: '8.3K',
    isHot: true,
    date: '2026.02.08',
    link: '#',
    slug: 'running-shoes-guide-2026',
  },
  {
    id: 3,
    title: '유산균 효과 제대로 보는 법, 복용 시간과 주의사항',
    excerpt: '유산균을 언제 먹어야 할까? 공복 vs 식후, 생유산균 vs 사균의 차이점과 올바른 복용법.',
    category: '영양제',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&h=400&fit=crop',
    readTime: '6분',
    views: '15.2K',
    isHot: false,
    date: '2026.02.05',
    link: '#',
   
