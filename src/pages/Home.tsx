import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Work from '../components/Work';
import About from '../components/About';
import TypeBanner from '../components/TypeBanner';
import ExecutivePlansSection from '../components/ExecutivePlansSection';

export default function Home() {
  return (
    <>
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

