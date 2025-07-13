// 기본형과 함수형 툴팁의 공통 스타일 지정
const TooltipContentWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="BG-blueblack Text-white-gray relative z-10 flex items-center gap-2 rounded-lg px-16 py-12 text-xs shadow-lg md:text-md">
    {children}
  </div>
);

export default TooltipContentWrapper;
