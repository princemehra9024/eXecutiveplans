import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Send, Sparkles, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // TODO: Replace with your Web3Forms access key

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormState('success');
        e.currentTarget.reset();
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        console.error("Form submission failed", data);
        setFormState('idle');
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setFormState('idle');
      alert("An error occurred. Please try again.");
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto relative">
      <SEO 
        title="Contact Us | Executive Plans" 
        description="Ready to disrupt your industry? Drop us a line and let's build the future together." 
      />
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Hero Section */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="relative z-10 mb-20 md:mb-32"
      >
        <motion.div variants={itemFadeUp} className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-brand" />
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">Start a Project</span>
        </motion.div>
        <motion.h1 
          variants={itemFadeUp}
          className="font-display text-5xl md:text-[7rem] leading-[0.85] uppercase tracking-tighter text-text mb-8"
        >
          Let's Build <br />
          <span className="text-text-muted" style={{ WebkitTextStroke: '1px var(--border-color)', color: 'transparent' }}>
            The Future
          </span>
        </motion.h1>
        <motion.p 
          variants={itemFadeUp}
          className="max-w-xl font-body text-text-muted text-lg leading-relaxed"
        >
          Whether you have a massive vision or a complex problem to solve, we're ready. Drop us a line and let's disrupt your industry.
        </motion.p>
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-5/12 flex flex-col gap-10"
        >
          {/* WhatsApp Direct Connect */}
          <a 
            href="https://wa.me/919024546041?text=Hi%20there!%20I%27d%20like%20to%20discuss%20a%20project%20with%20Executive%20Plans." 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-6 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#25D366]/20 hover:z-20"
            style={{ background: '#050505', border: '1.5px solid #25D366' }}
          >
            {/* Background Hover Tint */}
            <div className="absolute inset-0 bg-[#25D366]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* White Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"
                 style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
            
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110" style={{ background: '#25D366', color: '#000' }}>
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-[0.65rem] font-bold uppercase tracking-widest text-[#25D366]">WhatsApp Us</span>
                <span className="font-display text-xl md:text-2xl text-white tracking-wide">+91 9024546041</span>
              </div>
            </div>

            <ArrowUpRight className="w-6 h-6 text-[#25D366] opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10 hidden sm:block" />
          </a>

          {/* Direct Email */}
          <div className="group relative p-8 rounded-[32px] overflow-hidden bg-bg/50 backdrop-blur-md border border-border/50 hover:border-brand/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6 text-brand">
              <Mail className="w-6 h-6" />
              <h3 className="font-display text-xl uppercase tracking-widest">Email Us</h3>
            </div>
            <a href="mailto:executiveplans.in@gmail.com" className="font-display text-2xl md:text-3xl text-text hover:text-brand transition-colors break-all">
              executiveplans.in@gmail.com
            </a>
          </div>


          {/* Location */}
          <div className="group relative p-8 rounded-[32px] overflow-hidden bg-bg/50 backdrop-blur-md border border-border/50 hover:border-brand/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6 text-brand">
              <MapPin className="w-6 h-6" />
              <h3 className="font-display text-xl uppercase tracking-widest">Location</h3>
            </div>
            <p className="font-body text-text-muted text-lg leading-relaxed">
              Based in Kota, India. <br/>
              Working with visionaries globally.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-4">
              Socials
              <div className="h-px flex-1 bg-border/50" />
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Instagram', 'Twitter / X', 'LinkedIn', 'Awwwards'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="font-body text-[0.65rem] font-bold uppercase tracking-widest px-6 py-3 rounded-full border border-border/50 hover:border-brand hover:text-brand hover:-translate-y-1 transition-all duration-300"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full lg:w-7/12"
        >
          <form onSubmit={handleSubmit} className="bg-bg/40 backdrop-blur-md border border-border/50 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            {/* Subtle Inner Glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-text-muted ml-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe" 
                  className="bg-bg/50 border border-border/60 rounded-2xl px-6 py-4 font-body text-text outline-none focus:border-brand/60 focus:bg-brand/5 transition-all w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-text-muted ml-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@company.com" 
                  className="bg-bg/50 border border-border/60 rounded-2xl px-6 py-4 font-body text-text outline-none focus:border-brand/60 focus:bg-brand/5 transition-all w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-text-muted ml-2">Company</label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Your Agency / Startup" 
                  className="bg-bg/50 border border-border/60 rounded-2xl px-6 py-4 font-body text-text outline-none focus:border-brand/60 focus:bg-brand/5 transition-all w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-text-muted ml-2">Budget</label>
                <select name="budget" defaultValue="" className="bg-bg/50 border border-border/60 rounded-2xl px-6 py-4 font-body text-text outline-none focus:border-brand/60 focus:bg-brand/5 transition-all w-full appearance-none">
                  <option value="" disabled>Select a range</option>
                  <option value="15k">$15k - $25k</option>
                  <option value="25k">$25k - $50k</option>
                  <option value="50k">$50k+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label className="font-body text-xs font-bold uppercase tracking-widest text-text-muted ml-2">Project Details</label>
              <textarea 
                name="message"
                required
                rows={5}
                placeholder="Tell us about your goals, timeline, and what you're looking to achieve..." 
                className="bg-bg/50 border border-border/60 rounded-3xl px-6 py-5 font-body text-text outline-none focus:border-brand/60 focus:bg-brand/5 transition-all w-full resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={formState !== 'idle'}
              className="group relative w-full overflow-hidden rounded-full py-5 font-body font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: 'var(--color-brand)', color: 'var(--color-brand-foreground)' }}
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                {formState === 'idle' && <>Submit Request <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>}
                {formState === 'submitting' && 'Sending...'}
                {formState === 'success' && 'Request Received!'}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
