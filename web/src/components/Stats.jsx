import { useState, useEffect, useRef } from 'react';

function useOnScreen(options) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

function CountUp({ end, suffix = '', isVisible, scrollProgress }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Calculate the current value based on scroll progress
      const currentValue = Math.floor(end * scrollProgress);
      setCount(currentValue);
    }
  }, [isVisible, scrollProgress, end]);

  return (
    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

function FloatingIcon({ icon, delay = 0 }) {
  return (
    <div
      className="absolute opacity-10 text-blue-500"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {icon}
    </div>
  );
}

export default function Stats() {
  const [titleRef, titleVisible] = useOnScreen({ threshold: 0.3 });
  const [statsRef, statsVisible] = useOnScreen({ threshold: 0.1 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;
      
      const rect = statsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position
      // When element enters viewport (bottom), progress = 0
      // When element is centered, progress = 0.5
      // When element leaves viewport (top), progress = 1
      
      if (rect.bottom < 0) {
        // Element is above viewport - keep at 100%
        setScrollProgress(1);
      } else if (rect.top > windowHeight) {
        // Element is below viewport - keep at 0%
        setScrollProgress(0);
      } else {
        // Element is in viewport - calculate progress
        const elementHeight = rect.height;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const progress = visibleHeight / (elementHeight + windowHeight);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsRef]);
  
  const stats = [
    { 
      value: 500, 
      suffix: '+', 
      label: 'Delegates Expected',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
    },
    { 
      value: 9, 
      suffix: '', 
      label: 'Committees',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
    },
    { 
      value: 30, 
      suffix: '+', 
      label: 'Countries Represented',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500',
    },
    { 
      value: 3, 
      suffix: '', 
      label: 'Days of Diplomacy',
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon 
          icon={
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
          }
          delay={0}
        />
        <FloatingIcon 
          icon={
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          }
          delay={1.5}
        />
        <FloatingIcon 
          icon={
            <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          }
          delay={3}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Conference at a Glance
          </h2>
          <p className="text-gray-400 text-lg">
            Join a diverse community of global leaders
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Card */}
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 text-center relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.gradient} p-4 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>

                {/* Number */}
                <div className="relative z-10">
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={statsVisible}
                    scrollProgress={scrollProgress}
                  />
                </div>
                
                {/* Label */}
                <p className="text-gray-300 mt-3 text-sm md:text-base font-medium">
                  {stat.label}
                </p>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white/5 rounded-full px-4 py-2 backdrop-blur-md border border-white/10">
            <p className="text-gray-400 text-sm">
              Scroll Progress: <span className="text-amber-400 font-semibold">{Math.round(scrollProgress * 100)}%</span>
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-6 text-lg">
            Be part of something extraordinary
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('register');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Join Us Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </section>
  );
}