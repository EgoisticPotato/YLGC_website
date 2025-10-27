import { useEffect, useState, useRef } from 'react';

export function useOnScreen(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, stop observing (animation triggers once)
        if (options.once !== false) {
          observer.disconnect();
        }
      } else if (options.once === false) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, isVisible];
}