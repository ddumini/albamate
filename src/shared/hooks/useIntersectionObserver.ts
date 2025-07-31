import { useEffect, useRef } from 'react';

/**
 * 지정된 DOM 요소가 뷰포트 또는 지정된 루트 요소에 진입(Intersection)할 때 콜백을 실행하는 커스텀 훅입니다.
 * 일반적으로 무한 스크롤 트리거 요소로 사용됩니다.
 *
 * @param {() => void} callback - 요소가 뷰포트에 진입했을 때 실행할 함수
 * @param {Object} [options] - Intersection Observer 옵션
 * @param {number} [options.threshold=0.1] - 요소가 몇 % 이상 보일 때 콜백을 실행할지 설정 (0 ~ 1)
 * @param {string} [options.rootMargin='0px'] - root 경계로부터의 여유 공간 (ex: '100px 0px')
 * @param {Element | null} [options.root=null] - 교차 상태를 관찰할 때 기준이 되는 요소 (기본은 뷰포트)
 *
 * @returns {React.RefObject<HTMLDivElement>} - 관찰할 요소에 연결할 `ref`
 *
 * @example
 * ```tsx
 * const loadMoreRef = useIntersectionObserver(() => {
 *   fetchNextPage(); // 예: React Query의 fetchNextPage
 * });
 *
 * return (
 *   <div>
 *     {items.map(item => (
 *       <Item key={item.id} {...item} />
 *     ))}
 *     <div ref={loadMoreRef} /> // 이 요소가 보이면 콜백 실행
 *   </div>
 * );
 * ```
 */

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export function useIntersectionObserver(
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          callback();
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        root: options.root || null,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [callback, options.threshold, options.rootMargin, options.root]);

  return ref;
}
