import { useState } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

const committees = [
  'UNSC', 'UNGA', 'WHO', 'UNHRC', 'ECOSOC', 'DISEC', 'IAEA', 'NATO', 'AIPPM'
];

const pricingTiers = [
  {
    name: 'Early Bird',
    price: 150,
    deadline: 'Until January 31, 2025',
    features: ['Conference Materials', 'Lunch & Refreshments', 'Certificate', 'Networking Events'],
  },
  {
    name: 'Regular',
    price: 200,
    deadline: 'February 1 - 28, 2025',
    features: ['Conference Materials', 'Lunch & Refreshments', 'Certificate', 'Networking Events'],
    popular: true,
  },
  {
    name: 'Late',
    price: 250,
    deadline: 'After February 28, 2025',
    features: ['Conference Materials', 'Lunch & Refreshments', 'Certificate', 'Networking Events'],
  },
];

export default function Register() {
  const [titleRef, titleVisible] = useOnScreen({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    firstChoice: '',
    secondChoice: '',
    experience: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    alert('Registration submitted successfully! Check your email for confirmation.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      school: '',
      firstChoice: '',
      secondChoice: '',
      experience: '',
      termsAccepted: false,
    });
  };

  return (
    <section id="register" className="section">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-display font-bold">
            Register Now
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Secure your spot at YLGC MUN 2025
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`glass rounded-3xl p-8 relative ${
                tier.popular ? 'ring-2 ring-accent-gold' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-gold text-primary-bg px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{tier.deadline}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-accent-gold">${tier.price}</span>
                <span className="text-gray-400"> USD</span>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-accent-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-display font-bold mb-8 text-center">
            Registration Form
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                  placeholder="John"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* School/Institution */}
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-300 mb-2">
                School/Institution *
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                placeholder="Your school or institution"
              />
            </div>

            {/* Committee Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstChoice" className="block text-sm font-medium text-gray-300 mb-2">
                  First Committee Choice *
                </label>
                <select
                  id="firstChoice"
                  name="firstChoice"
                  value={formData.firstChoice}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                >
                  <option value="">Select a committee</option>
                  {committees.map((committee) => (
                    <option key={committee} value={committee} className="bg-secondary-bg">
                      {committee}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="secondChoice" className="block text-sm font-medium text-gray-300 mb-2">
                  Second Committee Choice *
                </label>
                <select
                  id="secondChoice"
                  name="secondChoice"
                  value={formData.secondChoice}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                >
                  <option value="">Select a committee</option>
                  {committees.map((committee) => (
                    <option key={committee} value={committee} className="bg-secondary-bg">
                      {committee}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                MUN Experience Level *
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
              >
                <option value="">Select your experience level</option>
                <option value="beginner" className="bg-secondary-bg">Beginner (0-1 conferences)</option>
                <option value="intermediate" className="bg-secondary-bg">Intermediate (2-4 conferences)</option>
                <option value="advanced" className="bg-secondary-bg">Advanced (5+ conferences)</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-accent-blue focus:ring-accent-blue"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-300">
                I accept the terms and conditions, and agree to the conference code of conduct. 
                I understand that registration fees are non-refundable.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent-gold text-primary-bg py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}