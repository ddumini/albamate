import { Slide } from '@/shared/types/carousel';

/**
 * 이미지 URL 배열을 슬라이드 데이터로 변환
 * @example
 * ```typescript
 * const { data } = useQuery('/api/images');
 * const slides = createSlidesFromUrls(data.imageUrls);
 * return <ImageCarousel slides={slides} />;
 * ```
 */
export const createSlidesFromUrls = (imageUrls: string[]): Slide[] => {
  return imageUrls.map((url, index) => ({
    id: index + 1,
    image: url,
    alt: `이미지 ${index + 1}`,
  }));
};
