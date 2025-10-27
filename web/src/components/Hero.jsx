import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="max-w-7xl mx-auto text-center z-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: Math.max(1 - scrollY / 500, 0),
        }}
      >
        {/* Conference Date Badge */}
        <div className="inline-block glass rounded-full px-8 py-3 mb-8 animate-fade-in">
          <p className="text-accent-gold font-semibold">March 15-17, 2025</p>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 animate-slide-up">
          YLGC MUN
          <span className="block text-5xl md:text-6xl lg:text-7xl text-accent-blue mt-4">
            2025
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in">
          Empowering Tomorrow's Leaders Through Diplomacy and Debate
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
          <button
            onClick={() => scrollToSection('register')}
            className="bg-accent-gold text-primary-bg px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
          >
            Register Now
          </button>
          <button
            onClick={() => scrollToSection('committees')}
            className="glass-hover px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
          >
            View Committees
          </button>
        </div>

        {/* About YLGC Card */}
        <div className="max-w-2xl mx-auto glass rounded-2xl p-8 animate-fade-in">
          <h3 className="text-2xl font-display font-bold mb-4 text-accent-blue">
            About YLGC
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Young Leaders Global Conference is a premier Model United Nations conference 
            bringing together passionate students from around the world to engage in 
            meaningful debate, develop leadership skills, and build lasting connections.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <svg
            className="w-6 h-6 text-accent-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}