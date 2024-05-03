import { useState, useEffect, useRef } from 'react';

export function useResponsiveDimensions() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { ref, dimensions };
}
