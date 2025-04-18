// components/Stars.tsx
import { useEffect, useRef } from 'react';

export default function Stars() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    
    const starCount = 180;
    const starsContainer = starsRef.current;
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random positioning
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 2.5;
      
      // Random twinkle delay
      const delay = Math.random() * 4;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      
      starsContainer.appendChild(star);
    }
  }, []);

  return <div ref={starsRef} className="stars fixed inset-0 pointer-events-none -z-10"></div>;
}
