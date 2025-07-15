'use client';

import { motion } from 'framer-motion';

const AnywhereSection = () => {
  return (
    <section className="relative z-10 flex h-screen flex-col justify-center overflow-hidden bg-transparent">
      <div className="mx-auto w-640">
        <motion.span
          className="absolute right-0 bottom-0 -z-10 h-[120vw] w-[120vw] translate-x-1/2 translate-y-1/2 rounded-full bg-[rgb(220,230,255)]"
          initial={{ scale: 0, originX: 1, originY: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: 'easeInOut',
          }}
          viewport={{ amount: 0.5 }}
          whileInView={{ scale: 3 }}
        />

        <motion.h2
          className="text-5xl font-bold text-[#3A5497]"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.7 }}
          whileInView={{ opacity: 1 }}
        >
          어디서든 지원받으세요
        </motion.h2>
        <div className="mt-40 flex flex-col gap-2">
          {[
            '다양한 사이트, SNS, 문자까지',
            '언제 어디서든 알바생을 구해보세요.',
          ].map((text, idx) => (
            <p key={text} className="overflow-hidden">
              <motion.span
                className="block text-2xl font-semibold text-[#8C9ECC]"
                initial={{ y: 40, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                  delay: 0.2 + idx * 0.2,
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ y: 0, opacity: 1 }}
              >
                {text}
              </motion.span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnywhereSection;
