import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';
import team1 from '../assets/team_1.png';
import team2 from '../assets/team_2.png';
import team3 from '../assets/team_3.png';
import team4 from '../assets/team_4.png';

const team = [
  {
    name: 'Eleanor Vance',
    role: 'Founder & CEO',
    image: team1,
    bio: 'Visionary leader bridging the gap between design and technology. Ex-Apple.'
  },
  {
    name: 'Marcus Chen',
    role: 'Head of Design',
    image: team2,
    bio: 'Award-winning designer obsessed with pixel perfection and typography.'
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Lead Engineer',
    image: team3,
    bio: 'Full-stack wizard turning complex problems into elegant, scalable code.'
  },
  {
    name: 'James Wilson',
    role: 'Strategy Director',
    image: team4,
    bio: 'Data-driven strategist scaling digital brands to their maximum potential.'
  }
];

export default function Team() {
  return (
    <section id="team" className="py-32 px-6 relative bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-7xl font-bold tracking-tight text-text uppercase mb-4"
            >
              The <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--text-primary)' }}>Minds</span><br/>Behind It
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-muted font-body max-w-md text-lg"
            >
              A collective of misfits, perfectionists, and visionaries. We don't just execute plans; we invent futures.
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="btn-mono hidden md:inline-flex"
          >
            <span>Join the Team</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-6 flex items-center justify-center p-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-contain filter dark:invert group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Social links reveal on hover */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-brand/10 backdrop-blur-md border border-brand/20 flex items-center justify-center text-brand hover:bg-brand hover:text-brand-foreground transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-brand/10 backdrop-blur-md border border-brand/20 flex items-center justify-center text-brand hover:bg-brand hover:text-brand-foreground transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-display text-2xl font-bold text-text mb-1">{member.name}</h3>
                <p className="font-body text-sm font-semibold tracking-widest uppercase text-text-muted mb-3">{member.role}</p>
                <p className="font-body text-sm text-text-muted leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="btn-mono mt-12 w-full justify-center md:hidden"
          >
            <span>Join the Team</span>
            <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
      </div>
    </section>
  );
}
