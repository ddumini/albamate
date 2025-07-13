/**
 * ButtonBase 컴포넌트
 *
 * @description
 * HTML `<button>` 요소를 기반으로 하는 기본 버튼 컴포넌트입니다.
 * 상위 컴포넌트(`PrimaryButton` 등)에서 스타일과 로직을 제어한 후,
 * 이 컴포넌트를 통해 버튼을 렌더링합니다.
 *
 * @example
 * ```tsx
 * <ButtonBase
 *   className="px-4 py-2 bg-blue-500 text-white"
 *   type="submit"
 *   onClick={() => console.log('클릭')}
 * >
 *   제출
 * </ButtonBase>
 * ```
 *
 * @param children - 버튼 내부에 렌더링될 내용 (텍스트, 아이콘 등)
 * @param className - Tailwind 또는 사용자 정의 클래스명
 * @param props - HTML `<button>` 요소의 기본 속성 (`type`, `onClick`, `disabled` 등)
 */

interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// 버튼의 렌더링 담당
const ButtonBase = ({ children, className, ...props }: ButtonBaseProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default ButtonBase;
