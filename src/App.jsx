import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import WhyJoinSection from './components/home/WhyJoinSection';
import ClubsSection from './components/home/ClubsSection';
import StatsSection from './components/home/StatsSection';
import EventsCarousel from './components/home/EventsCarousel';
import UpcomingEventsScroll from './components/home/UpcomingEventsScroll';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import Marquee from './components/ui/Marquee';
import TestimonialsSection from './components/home/TestimonialsSection';
import CTASection from './components/home/CTASection';
import CustomCursor from './components/ui/CustomCursor';
import SectionReveal from './components/ui/SectionReveal';

export default function App() {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem('visited')
  );

  const handleLoadComplete = () => {
    sessionStorage.setItem('visited', 'true');
    setLoading(false);
  };

  const sectionStyle = { scrollMarginTop: '72px' };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      overflowX: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif",
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navbar />
          
          <main>
            <section id="evenements" style={sectionStyle}>
              <EventsCarousel />
            </section>

            <section id="calendrier" style={sectionStyle}>
              <UpcomingEventsScroll />
            </section>

            <section id="accueil" style={sectionStyle}>
              <Hero />
            </section>

            <SectionReveal direction="scale">
              <Marquee />
            </SectionReveal>

            <section id="clubs" style={sectionStyle}>
              <SectionReveal direction="up">
                <ClubsSection />
              </SectionReveal>
            </section>

            <section id="stats" style={sectionStyle}>
               <SectionReveal direction="up">
                 <StatsSection />
               </SectionReveal>
            </section>

            <section id="pourquoi" style={sectionStyle}>
              <SectionReveal direction="up">
                <WhyJoinSection />
              </SectionReveal>
            </section>

            <section id="temoignages" style={sectionStyle}>
              <SectionReveal direction="up">
                <TestimonialsSection />
              </SectionReveal>
            </section>
          </main>

          <footer id="apropos">
            <SectionReveal direction="up">
              <CTASection />
            </SectionReveal>
            <Footer />
          </footer>
        </motion.div>
      )}
    </div>
  );
}

