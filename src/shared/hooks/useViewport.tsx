import { useEffect, useState } from "react";

// 현재 창의 너비를 반환하는 커스텀 훅
const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return {
    width,
    isMobile: width < 768, // 768px 미만이면 모바일로 간주
    isTablet: width >= 768 && width < 1024, // 768px 이상 1024px 미만이면 태블릿으로 간주
    isDesktop: width >= 1024, // 1024px 이상이면 데스크탑으로 간주
  };
};

export default useViewport;
