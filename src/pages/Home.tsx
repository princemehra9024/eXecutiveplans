import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Work from '../components/Work';
import About from '../components/About';
import TypeBanner from '../components/TypeBanner';
import ExecutivePlansSection from '../components/ExecutivePlansSection';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Executive Plans | Elite Digital Experiences" 
        description="We build elite interfaces designed to command attention and drive exponential value. Zero templates. Zero compromises." 
        keywords="web design, frontend development, ui/ux, elite websites, digital agency"
      />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <TypeBanner />
      <ExecutivePlansSection />
      <About />
    </>
  );
}

