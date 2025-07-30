'use client';

import ImageCarousel from '@/shared/components/ui/ImageCarousel';
import { Slide } from '@/shared/types/carousel';
import { createSlidesFromUrls } from '@/shared/utils/carousel';

const images = [
  '/images/landing/albaform-clock.png',
  '/images/landing/apply-girl.png',
  '/images/landing/anywhere-application.png',
];

const sampleSlides: Slide[] = createSlidesFromUrls(images);

const AlbaImageCarousel = () => (
  <ImageCarousel showCounter interval={4000} slides={sampleSlides} />
);

export default AlbaImageCarousel;
