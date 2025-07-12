'use client';
import { useEffect, useState } from 'react';

interface ToastLikePopupProps {
  message: string;
  duration?: number; // 자동 사라짐 시간(ms)
}

const Popup = ({ message, duration = 30000 }: ToastLikePopupProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 rounded-md bg-white px-4 py-3 text-sm shadow-lg">
      {message}
    </div>
  );
};

export default Popup;
