'use client';

import { Slide } from '@common/imageCarousel/carousel';
import ImageCarousel from '@common/imageCarousel/ImageCarousel';

import { createSlidesFromUrls } from '@/shared/utils/carousel';

interface AlbaImageCarouselProps {
  imageUrls: string[];
}

const AlbaImageCarousel = ({ imageUrls }: AlbaImageCarouselProps) => {
  const safeUrls =
    imageUrls?.length > 0 ? imageUrls : ['/images/list-default.png'];
  const slides: Slide[] = createSlidesFromUrls(safeUrls);

  return <ImageCarousel showCounter interval={4000} slides={slides} />;
};

export default AlbaImageCarousel;
