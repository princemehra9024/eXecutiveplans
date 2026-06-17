import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronDown, Sparkles, Send, Calendar, DollarSign, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FlowingRiver from '../components/FlowingRiver';
import SEO from '../components/SEO';
import { servicesData } from '../data/servicesData';
import epLogo from '../assets/executive-logo copy.png';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activePlanIdx, setActivePlanIdx] = useState<number>(0);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Consultation Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDesc: '',
    selectedPlan: '',
    timeline: '1-2 months'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset page states when switching services
    setActivePlanIdx(0);
    setSelectedAddons({});
    setFaqOpen({});
    setFormSubmitted(false);
  }, [serviceId]);

  const service = serviceId && serviceId in servicesData ? servicesData[serviceId] : null;

  // Set default form plan when service loads
  useEffect(() => {
    if (service) {
      setFormData(prev => ({
        ...prev,
        selectedPlan: service.plans[0]?.name || ''
      }));
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center relative z-0">
        <FlowingRiver />
        <h1 className="font-display text-4xl text-text mb-6">Service not found</h1>
        <Link to="/#services" className="text-brand flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  // Calculate customized total price
  const basePlan = service.plans[activePlanIdx];
  const basePrice = basePlan?.priceRaw[currency] || 0;
  const isCustomPlan = basePlan?.isCustom || false;

  const addonsPrice = service.addons.reduce((sum, addon) => {
    if (selectedAddons[addon.id]) {
      return sum + addon.priceRaw[currency];
    }
    return sum;
  }, 0);

  const totalPrice = basePrice + addonsPrice;
  const isMonthlyService = serviceId === 'marketing';

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const submitData = new FormData(e.currentTarget);
    submitData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // TODO: Replace with your Web3Forms access key
    submitData.append("service_name", service.title);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          // Clear form after delay
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectDesc: '',
            selectedPlan: service.plans[0]?.name || '',
            timeline: '1-2 months'
          });
          setFormSubmitted(false);
        }, 4000);
      } else {
        console.error("Form submission failed", data);
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const formattedTotalPrice = () => {
    if (isCustomPlan) return 'Custom Scope';
    
    const formattedNum = totalPrice.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US');
    if (currency === 'INR') {
      return `₹${formattedNum}${isMonthlyService ? '/mo' : ''}`;
    } else {
      return `$${formattedNum}${isMonthlyService ? '/mo' : ''}`;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative z-0">
      <SEO 
        title={`${service.title} | Executive Plans`} 
        description={service.desc} 
      />
      <FlowingRiver />
      <div className="relative z-10">
        
        {/* Navigation & Header */}
        <Link 
          to="/#services" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-brand transition-colors mb-12 font-body uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home Services
        </Link>

        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <span className="font-body font-semibold text-brand text-xs uppercase tracking-[0.2em] mb-4 block">
              Premium Services & Plans
            </span>
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] text-text mb-6">
              {service.title}
            </h1>
            <p className="font-body text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
              {service.desc}
            </p>
          </div>
          
          {/* Dual Currency Switcher */}
          <div className="lg:col-span-4 lg:flex lg:justify-end mt-4 lg:mt-0">
            <div className="bg-text/5 border border-border/50 p-1.5 rounded-full flex gap-2 w-fit relative shadow-inner">
              <button 
                onClick={() => setCurrency('INR')}
                className={`px-6 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${currency === 'INR' ? 'text-brand-foreground' : 'text-text-muted hover:text-text'}`}
              >
                {currency === 'INR' && (
                  <motion.div 
                    layoutId="activeCurrency"
                    className="absolute inset-0 bg-brand rounded-full -z-10 shadow-lg shadow-brand/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                ₹ INR Pricing
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-6 py-2.5 rounded-full font-body text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${currency === 'USD' ? 'text-brand-foreground' : 'text-text-muted hover:text-text'}`}
              >
                {currency === 'USD' && (
                  <motion.div 
                    layoutId="activeCurrency"
                    className="absolute inset-0 bg-brand rounded-full -z-10 shadow-lg shadow-brand/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                $ USD Pricing
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            PREMIUM PLANS SECTION — Dark Poster Layout
            ══════════════════════════════════════════════ */}
        <div className="mb-32">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* ── Main body: vertical PLANS + content ── */}
            <div className="flex min-h-[640px]">

              {/* ── Left: Giant vertical PLANS text ── */}
              <div
                className="relative flex-shrink-0 flex items-center justify-center"
                style={{ width: 'clamp(60px, 9vw, 120px)', borderRight: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4.5rem, 11vw, 10rem)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    userSelect: 'none',
                    textTransform: 'uppercase',
                    textShadow: '0 0 60px rgba(255,255,255,0.08)',
                    opacity: 0.82,
                  }}
                >
                  PLANS
                </span>
              </div>

              {/* ── Right: Logo + Cards ── */}
              <div className="flex-1 flex flex-col py-10 px-6 md:px-10">

                {/* EP Logo */}
                <div className="flex justify-center mb-8">
                  <img 
                    src={epLogo} 
                    alt="Executive Plans" 
                    className="h-[140px] md:h-[180px] object-contain" 
                    style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))' }} 
                  />
                </div>

                {/* ── Three Pricing Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1">
                  {service.plans.map((plan, idx) => {
                    const active = activePlanIdx === idx;
                    const ctaLabels = ['GET STARTED', 'GROW YOUR BUSINESS', 'GO EXECUTIVE'];
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => {
                          setActivePlanIdx(idx);
                          setFormData(prev => ({ ...prev, selectedPlan: plan.name }));
                        }}
                        whileHover={{ y: -4, scale: 1.015 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                        className="relative flex flex-col cursor-pointer"
                        style={{
                          borderRadius: '12px',
                          border: active
                            ? '2px solid rgba(255,255,255,0.85)'
                            : '1px solid rgba(255,255,255,0.22)',
                          background: active
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(255,255,255,0.02)',
                          overflow: 'hidden',
                          boxShadow: active
                            ? '0 0 40px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)'
                            : 'none',
                        }}
                      >
                        {/* ── Brush-stroke Package Name Header ── */}
                        <div
                          style={{
                            background: 'white',
                            padding: '10px 16px 10px',
                            margin: '12px 12px 0',
                            borderRadius: '6px',
                            position: 'relative',
                            clipPath: 'polygon(0% 5%, 2% 0%, 98% 2%, 100% 0%, 100% 95%, 97% 100%, 3% 98%, 0% 100%)',
                          }}
                        >
                          <h4
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                              fontWeight: 900,
                              color: '#000',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              textAlign: 'center',
                              margin: 0,
                            }}
                          >
                            {plan.name}
                          </h4>
                        </div>

                        {/* ── Price ── */}
                        <div className="px-5 pt-5 pb-2">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currency + plan.price[currency]}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.25 }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                                  fontWeight: 800,
                                  color: 'white',
                                  letterSpacing: '-0.02em',
                                  lineHeight: 1.1,
                                  display: 'block',
                                }}
                              >
                                {plan.price[currency]}
                              </span>
                            </motion.div>
                          </AnimatePresence>
                          {/* Divider dot */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', marginBottom: '4px' }}>
                            <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.15)' }} />
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                            <div style={{ height: '1px', flex: 1, background: 'rgba(255,255,255,0.15)' }} />
                          </div>
                        </div>

                        {/* ── Features ── */}
                        <ul className="flex flex-col gap-2.5 px-5 pb-4 flex-grow">
                          {plan.features.map((feature, fIdx) => (
                            <li
                              key={fIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.7rem, 1.3vw, 0.8rem)',
                                color: 'rgba(255,255,255,0.82)',
                                lineHeight: 1.4,
                              }}
                            >
                              {/* Filled checkmark circle */}
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 16 16"
                                fill="none"
                                style={{ flexShrink: 0, marginTop: '1px' }}
                              >
                                <circle cx="8" cy="8" r="7.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none"/>
                                <path d="M5 8.2L7 10.2L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* ── CTA Button ── */}
                        <div className="px-5 pb-5 mt-auto">
                          <button
                            style={{
                              width: '100%',
                              padding: '11px 16px',
                              borderRadius: '6px',
                              border: '1.5px solid white',
                              background: active ? 'white' : 'transparent',
                              color: active ? '#000' : 'white',
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              cursor: 'pointer',
                              transition: 'all 0.25s ease',
                            }}
                            onMouseEnter={e => {
                              if (!active) {
                                (e.currentTarget as HTMLButtonElement).style.background = 'white';
                                (e.currentTarget as HTMLButtonElement).style.color = '#000';
                              }
                            }}
                            onMouseLeave={e => {
                              if (!active) {
                                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                (e.currentTarget as HTMLButtonElement).style.color = 'white';
                              }
                            }}
                          >
                            {ctaLabels[idx] || 'SELECT PLAN'}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Footer Trust Bar ── */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '0',
                padding: '14px 24px',
              }}
            >
              {['RESPONSIVE DESIGN', 'SEO FRIENDLY', 'FAST LOADING', 'SECURE & RELIABLE', 'DEDICATED SUPPORT'].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,0.45)',
                      textTransform: 'uppercase',
                      padding: '0 16px',
                    }}
                  >
                    {item}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Calculator & Scope Configurator */}
        <div className="mb-32">
          <div className="bg-text/5 border border-border/80 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <span className="font-body font-semibold text-brand text-xs uppercase tracking-[0.2em] mb-3 block">
                  Interactive Playground
                </span>
                <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-text mb-6">
                  Plan Scope Calculator
                </h2>
                <p className="font-body text-text-muted text-sm md:text-base mb-8 max-w-xl">
                  Customize the base tier <strong className="text-text">"{basePlan?.name}"</strong> by adding tailored custom upgrades. Watch the real-time pricing breakdown compute below.
                </p>

                <div className="flex flex-col gap-4">
                  {service.addons.map((addon) => {
                    const isChecked = !!selectedAddons[addon.id];
                    return (
                      <div 
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex justify-between items-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${isChecked ? 'border-brand/60 bg-brand/5 shadow-md shadow-brand/5' : 'border-border/60 bg-bg/50 hover:border-brand/30'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isChecked ? 'bg-brand border-brand text-brand-foreground' : 'border-border'}`}>
                            {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3px]" />}
                          </div>
                          <span className="font-body text-sm font-medium text-text">{addon.name}</span>
                        </div>
                        <span className="font-body text-sm font-semibold text-brand transition-colors">
                          +{addon.price[currency]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Estimate Panel */}
              <div className="lg:col-span-5 flex flex-col justify-center h-full">
                <div className="bg-bg/90 border border-border/80 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-6">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  
                  <span className="font-body text-text-muted text-xs uppercase tracking-widest font-semibold mb-2">
                    Estimated Project Cost
                  </span>
                  
                  {/* Dynamic Pricing Counter */}
                  <div className="min-h-16 flex items-center justify-center mb-4">
                    <AnimatePresence mode="wait">
                      <motion.h3 
                        key={formattedTotalPrice()}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-4xl md:text-5xl text-text font-bold tracking-tight text-brand bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent drop-shadow-sm"
                      >
                        {formattedTotalPrice()}
                      </motion.h3>
                    </AnimatePresence>
                  </div>

                  <p className="font-body text-[11px] text-text-muted max-w-xs leading-normal mb-8">
                    {isCustomPlan 
                      ? "Custom projects are dynamically sized based on your unique backlog and timeline goals." 
                      : `Includes "${basePlan?.name}" base pricing + ${Object.values(selectedAddons).filter(Boolean).length} custom modular add-on upgrades.`
                    }
                  </p>

                  <a 
                    href="#inquiry"
                    className="w-full py-4 rounded-xl bg-brand text-brand-foreground font-body uppercase tracking-widest text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand/20 text-center block"
                  >
                    Lock in Estimate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline / Roadmap */}
        <div className="mb-32">
          <h2 className="font-display text-4xl uppercase tracking-tight text-text mb-12 border-b border-border pb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-brand" /> Project roadmap & timeline
          </h2>

          <div className="relative border-l border-border pl-6 md:pl-10 ml-4 md:ml-6 flex flex-col gap-16 py-4">
            {service.timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Bullet */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand border-4 border-bg shadow-md ring-4 ring-brand/10" />
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-display text-brand text-xs font-semibold uppercase tracking-[0.15em] bg-brand/5 border border-brand/20 px-3 py-1 rounded-full">
                    {item.phase}
                  </span>
                  <span className="font-body text-text-muted text-xs font-bold uppercase tracking-wider">
                    ({item.duration})
                  </span>
                </div>

                <h3 className="font-display text-2xl uppercase tracking-tight text-text mb-3">
                  {item.title}
                </h3>
                
                <p className="font-body text-text-muted text-sm md:text-base max-w-3xl leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Accordion FAQs */}
        <div className="mb-32">
          <h2 className="font-display text-4xl uppercase tracking-tight text-text mb-12 border-b border-border pb-6">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4 max-w-4xl">
            {service.faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div 
                  key={idx} 
                  className="bg-bg/40 backdrop-blur-md rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-brand/40"
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-6 font-display text-lg uppercase tracking-tight text-text font-bold"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-brand shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="p-6 pt-0 border-t border-border/40 font-body text-text-muted text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Projects */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
            <h2 className="font-display text-4xl uppercase tracking-tight text-text">
              Related Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {service.projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative mb-6">
                  <div className="absolute inset-0 bg-text/10 group-hover:bg-transparent transition-colors z-10" />
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-brand text-brand-foreground flex items-center justify-center font-display text-lg uppercase tracking-widest rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      View
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between items-start gap-2 px-2 text-text">
                  <h3 className="font-display text-3xl uppercase tracking-tight group-hover:text-brand transition-colors">{project.title}</h3>
                  <p className="font-body text-text-muted uppercase tracking-widest text-xs font-medium">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Inquiry Form */}
        <div id="inquiry" className="scroll-mt-32 max-w-3xl mx-auto">
          <div className="bg-bg border border-border/80 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
            <div className="absolute -top-6 -left-6 bg-brand text-brand-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-lg font-bold">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="text-center mb-10">
              <h2 className="font-display text-4xl uppercase tracking-tight text-text mb-4">
                Secure your Spot
              </h2>
              <p className="font-body text-text-muted text-sm md:text-base">
                Let us know what you are building. We will review your scope and get in touch with you within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center text-text"
                >
                  <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand text-brand flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <h3 className="font-display text-3xl uppercase tracking-tight mb-2">Proposal Initiated!</h3>
                  <p className="font-body text-text-muted text-sm max-w-sm leading-relaxed mb-6">
                    Thank you! We've successfully captured your plan scope and customized estimate total. A strategist will contact you soon.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-body font-bold text-brand uppercase tracking-widest">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Preparing details portal...
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors"
                        placeholder="e.g. Vishesh"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors"
                        placeholder="e.g. vishesh@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                        Mobile Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="plan" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                        Target Service Plan
                      </label>
                      <select 
                        id="plan"
                        name="plan"
                        value={formData.selectedPlan}
                        onChange={(e) => {
                          const planName = e.target.value;
                          setFormData(prev => ({ ...prev, selectedPlan: planName }));
                          const planIdx = service.plans.findIndex(p => p.name === planName);
                          if (planIdx !== -1) setActivePlanIdx(planIdx);
                        }}
                        className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors cursor-pointer appearance-none"
                      >
                        {service.plans.map((p, idx) => (
                          <option key={idx} value={p.name} className="text-black bg-white">{p.name} Tier</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="timeline" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                        Target Timeline
                      </label>
                      <select 
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                        className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors cursor-pointer appearance-none"
                      >
                        <option value="1-2 months" className="text-black bg-white">1-2 Months (Standard)</option>
                        <option value="2-3 months" className="text-black bg-white">2-3 Months</option>
                        <option value="Urgent" className="text-black bg-white">Urgent Delivery (Express)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="desc" className="font-body text-xs font-bold uppercase tracking-widest text-text-muted pl-2">
                      Tell us about your chaotic vision
                    </label>
                    <textarea 
                      id="desc"
                      name="message"
                      rows={4}
                      required
                      value={formData.projectDesc}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectDesc: e.target.value }))}
                      className="bg-text/5 border border-border/80 p-4 rounded-xl font-body text-sm text-text focus:outline-none focus:border-brand/80 transition-colors resize-none"
                      placeholder="Give us a short brief of what you want to execute..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 rounded-xl bg-brand text-brand-foreground font-body uppercase tracking-widest text-sm font-bold hover:scale-[1.01] active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-3 shadow-lg shadow-brand/20"
                  >
                    Submit Scope & Estimate <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
