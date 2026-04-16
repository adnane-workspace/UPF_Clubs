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

            <Marquee />

            <section id="clubs" style={sectionStyle}>
              <ClubsSection />
            </section>

            <section id="stats" style={sectionStyle}>
               <StatsSection />
            </section>

            <section id="pourquoi" style={sectionStyle}>
              <WhyJoinSection />
            </section>

            <section id="temoignages" style={sectionStyle}>
              <TestimonialsSection />
            </section>
          </main>

          <footer id="apropos">
            <CTASection />
            <Footer />
          </footer>
        </motion.div>
      )}
    </div>
  );
}
