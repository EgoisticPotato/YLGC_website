import { useState, useEffect } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.js';

function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration, hasAnimated]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-accent-gold">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    { value: 500, suffix: '+', label: 'Delegates Expected' },
    { value: 9, suffix: '', label: 'Committees' },
    { value: 30, suffix: '+', label: 'Countries Represented' },
    { value: 3, suffix: '', label: 'Days of Diplomacy' },
  ];

  return (
    <section className="section bg-secondary-bg/50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center glass-hover rounded-2xl p-6"
            >
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-300 mt-2 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}