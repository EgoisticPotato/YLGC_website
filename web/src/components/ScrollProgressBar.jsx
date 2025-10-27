import { useScrollProgress } from '../hooks/useScrollProgress.js';

export default function ScrollProgressBar() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
      <div
        className="h-full bg-gradient-to-r from-accent-blue via-purple-500 to-accent-gold transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}