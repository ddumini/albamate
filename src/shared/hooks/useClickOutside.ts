// shared/hooks/useClickOutside.ts
import { RefObject, useEffect } from 'react';

/**
 * 외부 클릭 시 핸들러 실행 훅
 *
 * @param ref - 감지할 DOM 요소의 ref
 * @param handler - 외부 클릭 시 실행할 함수
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
