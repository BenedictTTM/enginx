// components/Services.tsx
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaRocket, FaLightbulb, FaCheck } from 'react-icons/fa';

const services = [
  {
    title: 'Full Stack Development',
    description: 'Build scalable, production-ready applications using modern frameworks and best practices.',
    features: ['React, Next.js & TypeScript', 'Node.js & Python backends', 'Cloud deployment & DevOps'],
    icon: <FaLaptopCode size={18} className="text-[#f6ecd4]" />,
  },
  {
    title: 'Mobile Apps',
    description: 'High-quality native and cross-platform mobile apps built for performance and smooth user experience.',
    features: ['iOS & Android', 'React Native', 'API integration & optimization'],
    icon: <FaMobileAlt size={18} className="text-[#f6ecd4]" />,
  },
  {
    title: 'UI/UX Design',
    description: 'Clean, intuitive, and user-focused designs crafted to improve engagement and usability.',
    features: ['Wireframing & prototyping', 'User-centered workflows', 'Design systems & branding'],
    icon: <FaPaintBrush size={18} className="text-[#f6ecd4]" />,
  },
  {
    title: 'Software Optimization',
    description: 'Improve the performance and scalability of your existing systems with expert enhancements.',
    features: ['Speed & performance tuning', 'Cost reduction', 'Scalability improvements'],
    icon: <FaRocket size={18} className="text-[#f6ecd4]" />,
  },
  {
    title: 'Consulting',
    description: 'Technical expertise to guide your product in the right direction and avoid costly mistakes.',
    features: ['System architecture', 'Product strategy', 'Technical roadmapping'],
    icon: <FaLightbulb size={18} className="text-[#f6ecd4]" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-8 bg-[#0F1E46] text-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold mb-2">Our Services</h2>
        <p className="mb-6 text-xs sm:text-sm font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          We offer lots services to help you <span className="font-semibold">build and scale</span> your digital products. From
          initial concept to deployment and beyond.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {services.map((service, idx) => {
            const isHero = idx === 0;
            return (
              <div
                key={idx}
              className={`bg-[#0b2540] p-3 rounded-md shadow hover:shadow-lg transition h-full flex flex-col border border-[#f6ecd4]/20 hover:border-[#f6ecd4]/40 ${isHero ? 'lg:col-span-2 text-left justify-between' : ''}`}
              >
                <div>
                  <div className="mb-2">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-br from-[#f6ecd4]/25 to-transparent">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1">{service.title}</h3>
                  <p className="text-gray-400 mb-2 text-xs sm:text-sm">{service.description}</p>

                  {service.features && (
                    <ul className="space-y-1">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-gray-300 text-sm">
                          <FaCheck className="text-green-400 w-3 h-3 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {isHero && (
                  <div className="mt-3">
                    <button className="inline-block text-amber-100  px-2 py-1 rounded-full shadow-sm hover:shadow-md transition text-xs">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
