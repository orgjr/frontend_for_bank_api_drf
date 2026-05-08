import { useEffect, useRef } from 'react';

export default function useSmoothSnap() {
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = document.getElementById('scroll-container');

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling.current) return;

      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const height = window.innerHeight;

      container.scrollBy({
        top: direction * height,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);
}
