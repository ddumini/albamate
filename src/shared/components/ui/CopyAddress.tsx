'use client';
import { useCopy } from '@/shared/hooks/useCopy';

/**
 * CopyAddress 컴포넌트
 *
 * - 카카오주소 복사 기능을 제공합니다.
 *
 * @author sumin
 * @date 2025-07-13
 *
 * @component
 * @example
 * <KakaoMap location="서울특별시 중구 세종대로 110" />
 *
 * @param {Object} props
 * @param {string} props.location - 마커를 표시할 주소 문자열
 * @returns {JSX.Element} 카카오맵과 마커를 렌더링하는 컴포넌트
 */

interface CopyAddressProps {
  location: string;
}

const CopyAddress = ({ location }: CopyAddressProps) => {
  const { copyToClipboard } = useCopy();

  return (
    <div className="mb-16 flex items-center gap-30">
      <span className="line-clamp-2 text-base font-medium" title={location}>
        {location}
      </span>
      <button
        aria-label="주소 복사"
        className="flex-none text-lg font-bold text-mint-300 transition hover:text-mint-400 active:text-mint-400"
        type="button"
        onClick={() => copyToClipboard(location)}
      >
        복사
      </button>
    </div>
  );
};

export default CopyAddress;
