import { useOnScreen } from '../hooks/useOnScreen';

const secretariat = [
  { name: 'Sarah Johnson', position: 'Secretary General', avatar: 'SJ' },
  { name: 'Michael Chen', position: 'Director General', avatar: 'MC' },
  { name: 'Emily Rodriguez', position: 'Under Secretary General', avatar: 'ER' },
  { name: 'David Kim', position: 'Deputy Secretary General', avatar: 'DK' },
];

const facultyAdvisors = [
  { name: 'Prof. James Wilson', department: 'Political Science', avatar: 'JW' },
  { name: 'Dr. Lisa Anderson', department: 'International Relations', avatar: 'LA' },
];

function PersonCard({ person, index, delay = 0 }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`glass-hover rounded-2xl p-6 text-center transform transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${(delay + index * 100)}ms` }}
    >
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{person.avatar}</span>
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
      
      {/* Position/Department */}
      <p className="text-accent-gold text-sm">
        {person.position || person.department}
      </p>
    </div>
  );
}

export default function About() {
  const [titleRef, titleVisible] = useOnScreen({ threshold: 0.1 });
  const [patronRef, patronVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold">
            About Us
          </h2>
        </div>

        {/* Patron Section */}
        <div ref={patronRef} className={`mb-16 transition-all duration-700 ${
          patronVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-gold to-orange-600 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">AP</span>
            </div>
            <h3 className="text-3xl font-display font-bold mb-2 text-white">
              Dr. Amanda Peterson
            </h3>
            <p className="text-accent-gold text-lg mb-4">Conference Patron</p>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Chancellor of Young Leaders Global College with over 20 years of experience 
              in international education and diplomacy. Dr. Peterson has been instrumental 
              in shaping future global leaders through innovative educational programs.
            </p>
          </div>
        </div>

        {/* Secretariat Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-display font-bold text-center mb-8 text-white">
            Secretariat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secretariat.map((member, index) => (
              <PersonCard key={member.name} person={member} index={index} />
            ))}
          </div>
        </div>

        {/* Faculty Advisors Section */}
        <div>
          <h3 className="text-3xl font-display font-bold text-center mb-8 text-white">
            Faculty Advisors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {facultyAdvisors.map((advisor, index) => (
              <PersonCard key={advisor.name} person={advisor} index={index} delay={200} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}