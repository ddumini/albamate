import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TitleProps) => {
  return (
    <motion.h2
      className={cn(
        'mb-10 text-xl font-bold md:mb-20 md:text-2xl lg:mb-40 lg:text-5xl',
        className
      )}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.7 }}
      whileInView={{ opacity: 1 }}
    >
      {children}
    </motion.h2>
  );
};

export default Title;
