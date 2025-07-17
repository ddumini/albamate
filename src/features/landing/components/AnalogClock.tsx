import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AnalogClock = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // 초침: 0.5초에 한 바퀴 (360도)
      const seconds = (elapsed / 5000) * 60; // 0~무한 증가

      // 분침: 30초에 한 바퀴 (빠른 모션)
      const minutes = (elapsed / 600) % 60;

      // 시침: 30분에 한 바퀴 (빠른 모션)
      const hours = (elapsed / 10000) % 12;

      setTime({ hours, minutes, seconds });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const roundToNearest = (value: number, precision: number = 2): number => {
    return (
      Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
    );
  };

  // 시침, 분침, 초침 각도 계산 (360도 기준)
  const secondDeg = (time.seconds / 60) * 360;
  const minuteDeg = (time.minutes / 60) * 360;
  const hourDeg = (time.hours / 12) * 360;

  return (
    <div className="flex items-center justify-center">
      <svg
        aria-label="아날로그 시계"
        className="drop-shadow-lg"
        height={560}
        viewBox="0 0 560 560"
        width={560}
      >
        {/* 시계 배경 */}
        <circle cx="280" cy="280" fill="#15388E" r="280" />

        {/* 시계 눈금 12개 */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const x1 = roundToNearest(280 + Math.sin(angle) * 230);
          const y1 = roundToNearest(280 - Math.cos(angle) * 230);
          const x2 = roundToNearest(280 + Math.sin(angle) * 260);
          const y2 = roundToNearest(280 - Math.cos(angle) * 260);

          return (
            <line
              key={uuidv4()}
              stroke="#1B53DF"
              strokeWidth={i % 3 === 0 ? 8 : 3}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
            />
          );
        })}

        {/* 시침 */}
        <line
          stroke="#34CEFF"
          strokeWidth="14"
          style={{
            transform: `rotate(${hourDeg}deg)`,
            transformOrigin: '280px 280px',
          }}
          x1="280"
          x2="280"
          y1="280"
          y2="160"
        />

        {/* 분침 */}
        <line
          stroke="#34CEFF"
          strokeWidth="11"
          style={{
            transform: `rotate(${minuteDeg}deg)`,
            transformOrigin: '280px 280px',
          }}
          x1="280"
          x2="280"
          y1="280"
          y2="100"
        />

        <line
          stroke="#FCFCFC"
          strokeWidth="4"
          style={{
            transform: `rotate(${secondDeg}deg)`,
            transformOrigin: '280px 280px',
          }}
          x1="280"
          x2="280"
          y1="280"
          y2="80"
        />

        {/* 중심 원 */}
        <circle cx="280" cy="280" fill="#34CEFF" r="15" />
      </svg>
    </div>
  );
};

export default AnalogClock;
