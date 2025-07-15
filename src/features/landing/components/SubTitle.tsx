import { motion } from 'framer-motion';

import { cn } from '@/shared/lib/cn';

const SubTitle = ({
  subTitles,
  className,
}: {
  subTitles: string[];
  className?: string;
}) => {
  return (
    <>
      {subTitles.map((item, index) => (
        <p key={item} className="h-46 overflow-hidden">
          <motion.span
            className={cn('block text-2xl leading-46 font-semibold', className)}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: index * 0.1,
            }}
            viewport={{ once: true, amount: 0.1 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {item}
          </motion.span>
        </p>
      ))}
    </>
  );
};

export default SubTitle;
