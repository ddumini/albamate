import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface LandingHeroTextProps {
  isWhite?: boolean;
}

const LandingHeroText = ({ isWhite = false }: LandingHeroTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colors =
    isWhite === true
      ? {
          from: 'linear-gradient(90deg, #ffffff 0%, #ffffff 0%, #303030 0%)',
          to: 'linear-gradient(90deg, #ffffff 0%, #ffffff 100%, #303030 100%)',
        }
      : {
          from: 'linear-gradient(90deg, #000000 0%, #000000 0%, #9CA3AF 0%)',
          to: 'linear-gradient(90deg, #000000 0%, #000000 100%, #9CA3AF 100%)',
        };

  const getAnimationProps = (delay: number = 0) => ({
    animate: isInView
      ? {
          background: colors.to,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
      : {
          background: colors.from,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
    initial: {
      background: colors.from,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    transition: { duration: 0.8, ease: 'easeInOut', delay },
  });

  return (
    <motion.div ref={ref} className="text-center text-5xl leading-68 font-bold">
      <motion.p className="relative" {...getAnimationProps()}>
        한 곳에서 관리하는
      </motion.p>
      <motion.p className="relative" {...getAnimationProps(0.6)}>
        알바 구인 플랫폼
      </motion.p>
    </motion.div>
  );
};

export default LandingHeroText;
