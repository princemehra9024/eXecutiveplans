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
        name: "Starter Package",
        price: { INR: "₹15,000 – ₹25,000", USD: "$160 – $265" },
        priceRaw: { INR: 15000, USD: 160 },
        isCustom: false,
        features: ["Up to 3 Pages Website", "Responsive Design (Mobile, Tablet & Desktop)", "Custom Business Website Design", "Contact Form Integration", "Basic SEO Setup", "WhatsApp Chat Integration", "Domain & Hosting Setup Assistance", "1 Month Free Support"]
      },
      {
        name: "Business Package",
        price: { INR: "₹25,000 – ₹35,000", USD: "$265 – $370" },
        priceRaw: { INR: 25000, USD: 265 },
        isCustom: false,
        features: ["Up to 5 Pages Website", "Custom UI/UX Design", "Responsive Design", "Advanced SEO Setup", "Blog / News Section", "Speed & Performance Optimization", "WhatsApp & Contact Form Integration", "Google Maps Integration", "Domain & Hosting Setup Assistance", "2 Months Free Support"]
      },
      {
        name: "Executive Package",
        price: { INR: "₹35,000 – ₹50,000+", USD: "$370 – $530+" },
        priceRaw: { INR: 35000, USD: 370 },
        isCustom: false,
        features: ["Up to 10 Pages Website", "Premium UI/UX Design", "Advanced SEO Optimization", "Admin Panel", "Booking or Inquiry Management System", "Speed & Performance Optimization", "Advanced Security Features", "WhatsApp, Forms & API Integrations", "Domain & Hosting Setup Assistance", "Priority Support", "3 Months Free Support"]
      }
    ],
    addons: [
      {
        id: "pages",
        name: "Extra Pages (Pack of 5)",
        price: { INR: "₹5,000", USD: "$60" },
        priceRaw: { INR: 5000, USD: 60 }
      },
      {
        id: "support",
        name: "Priority Support (1 Year)",
        price: { INR: "₹15,000", USD: "$180" },
        priceRaw: { INR: 15000, USD: 180 }
      },
      {
        id: "seo",
        name: "Advanced SEO & Speed Tuning",
        price: { INR: "₹8,000", USD: "$100" },
        priceRaw: { INR: 8000, USD: 100 }
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
    title: "Custom App Solutions",
    desc: "Native and cross-platform apps that your users will actually want to keep on their home screen.",
    plans: [
      {
        name: "Starter Package",
        price: { INR: "₹25,000 – ₹45,000", USD: "$265 – $475" },
        priceRaw: { INR: 25000, USD: 265 },
        isCustom: false,
        features: [
          "Android App Development",
          "Professional UI/UX Design",
          "Up to 8 Screens",
          "Contact & Inquiry Forms",
          "Push Notifications",
          "WhatsApp Integration",
          "Play Store Publishing",
          "Performance Optimization",
          "2 Months Free Support"
        ]
      },
      {
        name: "Business Package",
        price: { INR: "₹45,000 – ₹65,000", USD: "$475 – $690" },
        priceRaw: { INR: 45000, USD: 475 },
        isCustom: false,
        features: [
          "Android App Development",
          "Up to 15 Screens",
          "Premium UI/UX Design",
          "User Authentication",
          "Admin Dashboard",
          "API Integration",
          "Google Maps Integration",
          "Customer Management",
          "Performance Optimization",
          "4 Months Free Support"
        ]
      },
      {
        name: "Executive Package",
        price: { INR: "₹80,000+", USD: "$850+" },
        priceRaw: { INR: 80000, USD: 850 },
        isCustom: false,
        features: [
          "Android & iOS Development",
          "Unlimited Screens",
          "Premium UI/UX Design",
          "Advanced Admin Dashboard",
          "Payment Gateway Integration",
          "Real-Time Features",
          "Booking Management System",
          "CRM Integration",
          "Advanced Security Features",
          "Analytics Dashboard",
          "Priority Support",
          "6 Months Free Support"
        ]
      }
    ],
    addons: [
      {
        id: "dual_platform",
        name: "Full Android + iOS Native Support",
        price: { INR: "₹15,000", USD: "$160" },
        priceRaw: { INR: 15000, USD: 160 }
      },
      {
        id: "admin_panel",
        name: "Premium Admin Dashboard Panel",
        price: { INR: "₹10,000", USD: "$105" },
        priceRaw: { INR: 10000, USD: 105 }
      },
      {
        id: "push_notifications",
        name: "Push Notifications & Complex Analytics",
        price: { INR: "₹8,000", USD: "$85" },
        priceRaw: { INR: 8000, USD: 85 }
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
    title: "Content Creation Solutions",
    desc: "Growth strategies tailored for the modern consumer. We don't just run ads, we build communities.",
    plans: [
      {
        name: "Starter Package",
        price: { INR: "₹8,000 – ₹15,000", USD: "$85 – $160" },
        priceRaw: { INR: 8000, USD: 85 },
        isCustom: false,
        features: [
          "12 Professional Posts / Month",
          "4 Reels / Month",
          "Custom Graphic Design",
          "Caption Writing",
          "Basic Hashtag Research",
          "Brand Consistent Design",
          "Content Calendar",
          "2 Revisions",
          "Monthly Performance Report",
          "1 Month Support"
        ]
      },
      {
        name: "Business Package",
        price: { INR: "₹15,000 – ₹25,000", USD: "$160 – $265" },
        priceRaw: { INR: 15000, USD: 160 },
        isCustom: false,
        features: [
          "20 Professional Posts / Month",
          "8 Reels / Month",
          "Custom Brand Designs",
          "Advanced Caption Writing",
          "Content Strategy Planning",
          "Trend Research",
          "Story Designs",
          "Engagement Optimization",
          "Monthly Analytics Report",
          "Priority Revisions",
          "2 Months Support"
        ]
      },
      {
        name: "Executive Package",
        price: { INR: "₹25,000 – ₹50,000+", USD: "$265 – $530+" },
        priceRaw: { INR: 25000, USD: 265 },
        isCustom: false,
        features: [
          "30+ Content Creatives / Month",
          "12+ Reels / Month",
          "Advanced Reel Editing",
          "Content Strategy & Planning",
          "Viral Trend Research",
          "Custom Brand Designs",
          "Story & Highlight Design",
          "Competitor Analysis",
          "Monthly Growth Analysis",
          "Dedicated Content Manager",
          "Priority Support",
          "3 Months Support"
        ]
      }
    ],
    addons: [
      {
        id: "channel",
        name: "Additional Social Media Channel",
        price: { INR: "₹3,000/mo", USD: "$30/mo" },
        priceRaw: { INR: 3000, USD: 30 },
        isMonthly: true
      },
      {
        id: "video",
        name: "Professional High-End Video Shoot",
        price: { INR: "₹10,000", USD: "$105" },
        priceRaw: { INR: 10000, USD: 105 }
      },
      {
        id: "influencer",
        name: "Premium Influencer Outreach Setup",
        price: { INR: "₹15,000", USD: "$160" },
        priceRaw: { INR: 15000, USD: 160 }
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
