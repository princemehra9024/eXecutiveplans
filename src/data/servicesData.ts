export interface Plan {
  name: string;
  price: {
    INR: string;
    USD: string;
  };
  priceRaw: {
    INR: number; // 0 for Custom
    USD: number; // 0 for Custom
  };
  isCustom: boolean;
  features: string[];
}

export interface Addon {
  id: string;
  name: string;
  price: {
    INR: string;
    USD: string;
  };
  priceRaw: {
    INR: number;
    USD: number;
  };
  isMonthly?: boolean;
}

export interface Project {
  title: string;
  category: string;
  image: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  title: string;
  desc: string;
  plans: Plan[];
  addons: Addon[];
  timeline: TimelinePhase[];
  faqs: FAQItem[];
  projects: Project[];
}

export const servicesData: Record<string, Service> = {
  websites: {
    title: "Websites",
    desc: "Awwwards-winning digital experiences. Fast, accessible, and stunning. We build platforms that convert.",
    plans: [
      {
        name: "Starter",
        price: { INR: "₹1,99,999", USD: "$2,500" },
        priceRaw: { INR: 199999, USD: 2500 },
        isCustom: false,
        features: ["Custom Design", "Responsive Layout", "Basic SEO", "5 Pages", "1 Month Support"]
      },
      {
        name: "Professional",
        price: { INR: "₹3,99,999", USD: "$5,000" },
        priceRaw: { INR: 399999, USD: 5000 },
        isCustom: false,
        features: ["Advanced Animations", "CMS Integration", "E-commerce setup", "Performance Optimization", "3 Months Support"]
      },
      {
        name: "Enterprise",
        price: { INR: "Custom", USD: "Custom" },
        priceRaw: { INR: 0, USD: 0 },
        isCustom: true,
        features: ["Full Web Application", "Custom Backend", "Ongoing Support", "Unlimited Revisions", "Dedicated Developer"]
      }
    ],
    addons: [
      {
        id: "pages",
        name: "Extra Pages (Pack of 5)",
        price: { INR: "₹14,999", USD: "$200" },
        priceRaw: { INR: 14999, USD: 200 }
      },
      {
        id: "support",
        name: "Priority Support (1 Year)",
        price: { INR: "₹39,999", USD: "$500" },
        priceRaw: { INR: 39999, USD: 500 }
      },
      {
        id: "seo",
        name: "Advanced SEO & Speed Tuning",
        price: { INR: "₹24,999", USD: "$300" },
        priceRaw: { INR: 24999, USD: 300 }
      }
    ],
    timeline: [
      {
        phase: "Phase 01",
        duration: "Week 1",
        title: "Strategy & Wireframing",
        description: "We deep-dive into your brand, run detailed competitive analysis, define site architecture, and map user flows."
      },
      {
        phase: "Phase 02",
        duration: "Weeks 2-3",
        title: "High-Fidelity UI/UX Design",
        description: "Crafting modern, custom-designed page layouts using premium Syne & Outfit typography with immersive dark and light transitions."
      },
      {
        phase: "Phase 03",
        duration: "Weeks 4-5",
        title: "High-Performance Engineering",
        description: "Developing with clean semantic structures, implementing butter-smooth page scroll, customized interactive cursor trails, and responsive layouts."
      },
      {
        phase: "Phase 04",
        duration: "Week 6",
        title: "Launch & Analytics Audit",
        description: "Optimizing Core Web Vitals, configuring search metadata, setting up custom web analytics tracking, and deploying to Vercel/Netlify."
      }
    ],
    faqs: [
      {
        question: "How long does a website project take?",
        answer: "Normally, a custom website project takes between 4 to 6 weeks. This timeline includes multiple collaborative design review iterations and rigorous cross-browser testing."
      },
      {
        question: "Can I easily update content after launching?",
        answer: "Yes, absolutely! We connect your website to a headless CMS (like Sanity, Webflow, or custom Strapi panels) so you can update text, images, and blogs without touching code."
      },
      {
        question: "Do you offer post-launch support & maintenance?",
        answer: "Yes. Every plan includes dedicated post-launch support. We also provide customized ongoing support retainers covering security audits, content updates, and server monitoring."
      }
    ],
    projects: [
      {
        title: "NEON DREAMS",
        category: "E-Commerce Experience",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop"
      },
      {
        title: "CREATIVE FOLIO",
        category: "Portfolio Website",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
      }
    ]
  },
  applications: {
    title: "Applications",
    desc: "Native and cross-platform apps that your users will actually want to keep on their home screen.",
    plans: [
      {
        name: "MVP",
        price: { INR: "₹6,49,999", USD: "$8,000" },
        priceRaw: { INR: 649999, USD: 8000 },
        isCustom: false,
        features: ["Core Feature Set", "Cross-Platform (React Native)", "Basic Backend", "App Store Submission", "2 Months Support"]
      },
      {
        name: "Pro App",
        price: { INR: "₹11,99,999", USD: "$15,000" },
        priceRaw: { INR: 1199999, USD: 15000 },
        isCustom: false,
        features: ["Advanced Features", "Custom Animations", "Complex State Management", "Analytics Integration", "6 Months Support"]
      },
      {
        name: "Scale",
        price: { INR: "Custom", USD: "Custom" },
        priceRaw: { INR: 0, USD: 0 },
        isCustom: true,
        features: ["Dedicated Team", "Cloud Infrastructure", "Machine Learning integrations", "24/7 SLA Support", "Unlimited Revisions"]
      }
    ],
    addons: [
      {
        id: "dual_platform",
        name: "Full Android + iOS Native Support",
        price: { INR: "₹1,49,999", USD: "$2,000" },
        priceRaw: { INR: 149999, USD: 2000 }
      },
      {
        id: "admin_panel",
        name: "Premium Admin Dashboard Panel",
        price: { INR: "₹99,999", USD: "$1,200" },
        priceRaw: { INR: 99999, USD: 1200 }
      },
      {
        id: "push_notifications",
        name: "Push Notifications & Complex Analytics",
        price: { INR: "₹39,999", USD: "$500" },
        priceRaw: { INR: 39999, USD: 500 }
      }
    ],
    timeline: [
      {
        phase: "Phase 01",
        duration: "Weeks 1-2",
        title: "Product Blueprint & Architecture",
        description: "Mapping database schemas, writing complete technical API specifications, and styling click-through wireframe flows."
      },
      {
        phase: "Phase 02",
        duration: "Weeks 3-4",
        title: "Premium Interactive Design",
        description: "Designing gorgeous, premium UI assets and defining component states following strict, modern brand systems."
      },
      {
        phase: "Phase 03",
        duration: "Weeks 5-8",
        title: "Full-Stack Agile Development",
        description: "Building native modules, securely integrating backend databases, writing test suites, and creating fluid app states."
      },
      {
        phase: "Phase 04",
        duration: "Weeks 9-10",
        title: "Store Submission & QA Audit",
        description: "Running end-to-end device testing, configuring provisioning profiles, and uploading to Apple App Store & Google Play."
      }
    ],
    faqs: [
      {
        question: "Which technologies do you use for app development?",
        answer: "We primarily utilize React Native or Flutter for efficient, high-performance cross-platform apps, paired with robust Go, Node.js, or Python backends on AWS/GCP."
      },
      {
        question: "Will you manage uploading the application to stores?",
        answer: "Absolutely! We handle the end-to-end publishing pipeline, including setting up Apple Developer & Google Play Console assets, privacy policy configurations, and store reviews."
      },
      {
        question: "Do we sign a Non-Disclosure Agreement (NDA)?",
        answer: "Yes, we prioritize IP security. We sign a mutual NDA before you share any confidential business details, blueprints, or source code."
      }
    ],
    projects: [
      {
        title: "VIRTUAL X",
        category: "SaaS Platform",
        image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop"
      },
      {
        title: "STREETWEAR CULT",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=2000&auto=format&fit=crop"
      }
    ]
  },
  marketing: {
    title: "Marketing",
    desc: "Growth strategies tailored for the modern consumer. We don't just run ads, we build communities.",
    plans: [
      {
        name: "Kickstart",
        price: { INR: "₹1,24,999/mo", USD: "$1,500/mo" },
        priceRaw: { INR: 124999, USD: 1500 },
        isCustom: false,
        features: ["Social Media Management", "2 Ad Campaigns", "Basic Analytics", "Monthly Report", "Bi-weekly Call"]
      },
      {
        name: "Growth",
        price: { INR: "₹2,89,999/mo", USD: "$3,500/mo" },
        priceRaw: { INR: 289999, USD: 3500 },
        isCustom: false,
        features: ["Omnichannel Strategy", "Content Creation", "SEO Optimization", "Weekly Syncs", "Custom Analytics Dashboard"]
      },
      {
        name: "Domination",
        price: { INR: "₹6,59,999/mo", USD: "$8,000/mo" },
        priceRaw: { INR: 659999, USD: 8000 },
        isCustom: false,
        features: ["Full Fractional CMO", "Viral Campaigns", "Influencer Partnerships", "Daily Optimization", "24/7 Slack Support"]
      }
    ],
    addons: [
      {
        id: "channel",
        name: "Additional Social Media Channel",
        price: { INR: "₹24,999/mo", USD: "$300/mo" },
        priceRaw: { INR: 24999, USD: 300 },
        isMonthly: true
      },
      {
        id: "video",
        name: "Professional High-End Video Shoot",
        price: { INR: "₹79,999", USD: "$1,000" },
        priceRaw: { INR: 79999, USD: 1000 }
      },
      {
        id: "influencer",
        name: "Premium Influencer Outreach Setup",
        price: { INR: "₹1,19,999", USD: "$1,500" },
        priceRaw: { INR: 119999, USD: 1500 }
      }
    ],
    timeline: [
      {
        phase: "Phase 01",
        duration: "Month 1",
        title: "Competitive Audit & Branding Blueprint",
        description: "Auditing competitor channels, drafting user persona metrics, building custom visual content layouts, and setting up KPI pipelines."
      },
      {
        phase: "Phase 02",
        duration: "Month 2",
        title: "Content Launch & Paid Campaign Setup",
        description: "Launching automated content schedules, producing short-form video content, deploying A/B landing pages, and testing ad copies."
      },
      {
        phase: "Phase 03",
        duration: "Month 3+",
        title: "Active Scaling & Conversions Focus",
        description: "Scaling high-performing search ads, running viral content spikes, optimizing search engine rankings, and weekly lead auditing."
      }
    ],
    faqs: [
      {
        question: "Is there a minimum contract length?",
        answer: "We request a minimum 3-month baseline agreement. Growth marketing is an ongoing strategy, and 90 days provides ample time to build traffic authority, run valid A/B tests, and show solid growth metrics."
      },
      {
        question: "What's included in content creation?",
        answer: "We design premium social feeds, script & edit high-end short-form vertical videos, write copy, compile search-friendly blogs, and build high-performance ad banners."
      },
      {
        question: "How do you showcase campaign results?",
        answer: "We provide an interactive Looker Studio or custom agency dashboard mapping impressions, lead acquisitions, cost-per-acquisition (CPA), return-on-ad-spend (ROAS), and precise conversion rates."
      }
    ],
    projects: [
      {
        title: "GLOBAL REACH",
        category: "Ad Campaign",
        image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=2000&auto=format&fit=crop"
      },
      {
        title: "SOCIAL BUZZ",
        category: "Social Media Strategy",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop"
      }
    ]
  }
};
