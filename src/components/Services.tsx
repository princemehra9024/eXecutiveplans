import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Smartphone, BarChart3, Layers, Code2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  {
    id: "websites",
    num: "01",
    title: "Websites",
    subtitle: "Awwwards-winning Experiences",
    desc: "Fast, accessible, and stunning digital platforms built with Next.js, React, and WebGL. We build platforms that convert.",
    Icon: Globe,
    tools: ["React", "Next.js", "Three.js", "TailwindCSS"],
    color: "#00C896"
  },
  {
    id: "applications",
    num: "02",
    title: "Custom App Solutions",
    subtitle: "Native & Cross-Platform",
    desc: "Complex, high-performance applications that your users will actually want to keep on their home screen.",
    Icon: Smartphone,
    tools: ["React Native", "Swift", "Kotlin", "Node.js"],
    color: "#7C6FFF"
  },
  {
    id: "marketing",
    num: "03",
    title: "Content Creation Solutions",
    subtitle: "Data-driven Growth",
    desc: "Growth strategies tailored for the modern consumer. We don't just run ads, we engineer viral communities and SEO dominance.",
    Icon: BarChart3,
    tools: ["SEO", "Analytics", "CRO", "Content"],
    color: "#FF6B35"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-12 max-w-[1500px] mx-auto relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-24 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 mb-6">
             <div className="w-10 h-[2px] bg-brand" />
             <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-text-muted">Our Capabilities</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter w-full max-w-3xl leading-[0.9] text-text">
            What we <br/> <span style={{ WebkitTextStroke: '2px var(--text-primary)', color: 'transparent' }}>actually</span> do
          </h2>
        </div>
        <p className="text-text-muted font-body max-w-sm md:pb-4 text-base leading-relaxed">
          Full-stack execution from initial concept to viral launch. We are your technical co-founders. Click a service to view specialized plans and architectures.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {services.map((service, i) => {
          const { Icon } = service;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link 
                to={`/services/${service.id}`}
                className="group flex flex-col h-full bg-card-bg rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                style={{ 
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                {/* Hover Glow */}
                <div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ background: service.color }}
                />

                {/* Top Section */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <Icon className="w-7 h-7 text-text-muted group-hover:text-text transition-colors duration-500" />
                  </div>
                  
                  <div className="font-display text-4xl font-bold opacity-10 group-hover:opacity-100 transition-all duration-500" style={{ color: service.color }}>
                    {service.num}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="mt-auto relative z-10">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight mb-2 text-text group-hover:text-brand transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: service.color }}>
                    {service.subtitle}
                  </p>
                  
                  <p className="font-body text-text-muted text-sm leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {service.tools.map(tool => (
                      <span key={tool} className="text-[0.6rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-border text-text-muted bg-bg-secondary">
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  {/* Bottom Action */}
                  <div className="flex items-center gap-3 pt-6 border-t border-border mt-auto">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-text text-bg-primary group-hover:scale-110"
                      style={{ background: service.color, color: '#fff', boxShadow: `0 4px 14px ${service.color}40` }}
                    >
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-45" />
                    </div>
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-text">Explore Plans</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
