import Image from 'next/image';
import Link from 'next/link';

interface GnbMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const GnbMenu = ({ isOpen, setIsOpen }: GnbMenuProps) => {
  return (
    <div className="relative">
      {/* 오버레이 클릭 시 닫기 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-220 transform bg-white opacity-95 shadow-lg transition-transform duration-300 ease-in-out md:w-300 dark:bg-black-400 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mt-32 flex flex-col gap-56 p-4">
          <div className="border-b border-gray-500 pb-12">
            {/* 닫기 버튼 (우측 상단 고정) */}
            <button
              aria-label="메뉴 닫기"
              className="absolute top-4 right-4 h-36 w-36 cursor-pointer"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Image fill alt="닫기 버튼" src="/icons/x-thin.svg" />
            </button>
          </div>

          <div className="ml-32 flex flex-col gap-32">
            {/* 마이페이지 */}
            <div
              className="flex cursor-pointer items-center gap-8"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative h-24 w-24">
                <Image fill alt="마이페이지" src="/icons/mypage.svg" />
              </div>
              <Link href="/mypage">마이페이지</Link>
            </div>

            {/* 로그아웃 */}
            <div
              className="flex cursor-pointer items-center gap-8"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative h-24 w-24">
                <Image fill alt="로그아웃" src="/icons/logout.svg" />
              </div>
              <Link href="/logout">로그아웃</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GnbMenu;
