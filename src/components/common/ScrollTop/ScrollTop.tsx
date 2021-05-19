import React, { useEffect, useRef } from 'react';

const ScrollTop = () => {
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const scroll = useRef<HTMLButtonElement | null>(null);

  const scrollToTop = (y: number, duration: number) => {
    const initialY = document.documentElement.scrollTop || document.body.scrollTop;
    const baseY = (initialY + y) * 0.5;
    const difference = initialY - baseY;
    const startTime = performance.now();

    const step = () => {
      let normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) normalizedTime = 1;

      window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
      if (normalizedTime < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  const scrollHandler = () => {
    if (scroll.current) {
      if (window.pageYOffset >= 500) {
        scroll.current.style.transform = 'scale(1)';
      } else {
        scroll.current.style.transform = 'scale(0)';
      }
    }
  }

  return (
    <button
      className="scrolltop button--muted button--icon"
      onClick={() => scrollToTop(0, 400)}
      ref={scroll}
    >
      <i className="fa fa-chevron-up" />
    </button>
  );
};

export default ScrollTop;
