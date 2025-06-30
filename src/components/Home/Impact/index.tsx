'use client';
import { useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import StackedCards from '@/components/Home/Impact/StackedCards';
import { BANNER_DATA } from '@/constants/landingPage';

export default function Impact() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main ref={container} className='relative mt-[1vh] w-full'>
      {BANNER_DATA.impactData.map((cardItem, i) => {
        const targetScale = 1 - (BANNER_DATA.impactData.length - i) * 0.05;
        return (
          <StackedCards
            key={`p_${i}`}
            i={i}
            {...cardItem}
            progress={scrollYProgress}
            range={[i * 0.5, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
