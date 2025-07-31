import { Slide } from '@/shared/components/common/imageCarousel/carousel';

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
  // 1. 유효한(비어있지 않은) URL만 필터링합니다.
  const validUrls = imageUrls.filter(
    url => typeof url === 'string' && url.trim() !== ''
  );

  // 2. 만약 필터링 후 유효한 URL이 하나도 없다면, 기본 이미지 URL을 사용합니다.
  // (이미 외부에서 images = ['/images/list-default.png'] 처리를 했지만,
  // 이 함수가 다른 곳에서도 사용될 수 있고 혹시 모를 상황에 대비하여 안전장치를 두는 것이 좋습니다.)
  if (validUrls.length === 0) {
    return [{ id: 0, image: '/images/list-default.png', alt: '기본 이미지' }];
  }

  return imageUrls.map((url, index) => ({
    id: index + 1,
    image: url,
    alt: `이미지 ${index + 1}`,
  }));
};
