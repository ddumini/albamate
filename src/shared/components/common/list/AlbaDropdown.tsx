'use client';

import { cn } from '@/shared/lib/cn';

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface Props {
  options: DropdownOption[];
}

/**
 * 드롭다운 메뉴 컴포넌트
 *
 * @param {DropdownOption[]} options - 드롭다운에 표시할 옵션 목록
 *   - label: 버튼에 표시될 텍스트
 *   - onClick: 해당 옵션 클릭 시 실행될 함수
 *
 * 사용 예시
 *  <AlbaDropdown options={
 *  { label: '지원하기', onClick: () => alert('지원하기 클릭') },
    { label: '스크랩', onClick: () => alert('스크랩 클릭') },} 
     />
 */
const AlbaDropdown = ({ options }: Props) => {
  return (
    <div className="BG-white absolute top-full right-0 z-30 mt-4 w-90 rounded-md border border-gray-200 p-4 shadow-md lg:w-110">
      {options.map(({ label, onClick }) => (
        <button
          key={label}
          className={cn(
            'relative z-10 inline-block w-full py-8 text-center text-sm transition-all duration-150',
            'hover:scale-[0.98] hover:rounded-lg hover:bg-mint-50 hover:font-medium dark:hover:bg-mint-400'
          )}
          type="button"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AlbaDropdown;
