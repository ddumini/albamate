import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import ButtonBase from './ButtonBase';

// PrimaryButton 컴포넌트의 props 타입 정의
interface ButtonProps {
  variant: 'solid' | 'outline' | 'cancelSolid' | 'cancelOutline'; // Variant로 버튼 스타일 구분 기본값은 'solid'
  sizeClassName: string; // sizeClassName로 버튼 크기 및 텍스트 사이즈 조정
  label?: string; // 버튼에 표시될 텍스트
  disabled?: boolean; // disabled 상태 여부
  type: 'button' | 'submit' | 'reset';
  iconSrc?: string; // 아이콘 이미지 경로
  responsiveLabel?: boolean; // 반응형 레이블 여부
  onClick?: () => void;
}

const PrimaryButton = ({
  variant = 'solid',
  sizeClassName,
  label,
  disabled,
  type,
  iconSrc,
  responsiveLabel = false,
  onClick,
}: ButtonProps) => {
  // 공통 base 스타일 정의
  const baseStyles =
    'rounded-lg font-semibold transition-colors duration-200 ease-in-out flex items-center justify-center text-center gap-1';

  // variant별 스타일 정의
  const solidStyles = 'bg-mint-300 hover:bg-mint-400 text-gray-50';
  const outlineStyles =
    'border border-mint-300 hover:border-mint-400 text-mint-300 hover:text-mint-400 bg-transparent';
  const cancelSolidStyles = 'bg-gray-100 text-gray-50';
  const cancelOutlineStyles =
    'border border-gray-100 text-gray-100  bg-transparent';

  // variant에 따라 스타일 매핑
  const buttonStyle = {
    solid: solidStyles,
    outline: outlineStyles,
    cancelSolid: cancelSolidStyles,
    cancelOutline: cancelOutlineStyles,
  };

  // disabled 상태에 따라 커서 스타일 변경
  const disabledStyles = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  // 최종으로 적용될 클래스 병합
  const finalStyles = twMerge(
    baseStyles,
    buttonStyle[variant],
    sizeClassName,
    disabledStyles
  );

  // responsiveLabel 여부에 따라 숨김 처리
  const labelStyles = responsiveLabel ? 'hidden' : 'inline-flex';

  return (
    <ButtonBase
      className={finalStyles}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {/* iconSrc 여부에 따라 아이콘 표시 */}
      {iconSrc && (
        <span className="relative inline-flex h-24 w-24 items-center justify-center lg:mr-1 lg:h-36 lg:w-36">
          <Image fill alt="icon" sizes="36px" src={iconSrc} />
        </span>
      )}
      <span className={labelStyles}>{label}</span>
    </ButtonBase>
  );
};

export default PrimaryButton;
