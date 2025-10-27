import { useOnScreen } from '../hooks/useOnScreen.js';

const committees = [
  {
    id: 1,
    abbr: 'UNSC',
    name: 'United Nations Security Council',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    abbr: 'UNGA',
    name: 'United Nations General Assembly',
    gradient: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 3,
    abbr: 'WHO',
    name: 'World Health Organization',
    gradient: 'from-green-500 to-green-700',
  },
  {
    id: 4,
    abbr: 'UNHRC',
    name: 'United Nations Human Rights Council',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    id: 5,
    abbr: 'ECOSOC',
    name: 'Economic and Social Council',
    gradient: 'from-orange-500 to-orange-700',
  },
  {
    id: 6,
    abbr: 'DISEC',
    name: 'Disarmament and International Security Committee',
    gradient: 'from-red-500 to-red-700',
  },
  {
    id: 7,
    abbr: 'IAEA',
    name: 'International Atomic Energy Agency',
    gradient: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 8,
    abbr: 'NATO',
    name: 'North Atlantic Treaty Organization',
    gradient: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 9,
    abbr: 'AIPPM',
    name: 'All India Political Parties Meet',
    gradient: 'from-pink-500 to-pink-700',
  },
];

function CommitteeCard({ committee, index }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-hover card-tilt rounded-2xl p-6 transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient Icon */}
      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${committee.gradient} mb-4 flex items-center justify-center`}>
        <span className="text-2xl font-bold text-white">{committee.abbr[0]}</span>
      </div>

      {/* Committee Name */}
      <h3 className="text-xl font-bold mb-2 text-white">{committee.abbr}</h3>
      <p className="text-gray-300 text-sm mb-4">{committee.name}</p>

      {/* Learn More Button */}
      <button className="text-accent-blue hover:text-accent-gold transition-colors font-semibold text-sm flex items-center gap-2 group">
        Learn More
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function Committees() {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="committees" className="section bg-secondary-bg/30">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Our Committees
          </h2>
          <div className="glass inline-block rounded-full px-6 py-3 mt-4">
            <p className="text-accent-gold font-semibold">
              Conference Theme: Bridging Divides: Unity in Diversity
            </p>
          </div>
        </div>

        {/* Committee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {committees.map((committee, index) => (
            <CommitteeCard key={committee.id} committee={committee} index={index} />
          ))}
        </div>

        {/* Register CTA */}
        <div className="text-center">
          <button
            onClick={scrollToRegister}
            className="bg-accent-gold text-primary-bg px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
          >
            Register for Your Committee
          </button>
        </div>
      </div>
    </section>
  );
}