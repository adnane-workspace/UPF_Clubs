import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import WhyJoinSection from './components/home/WhyJoinSection';
import ClubsSection from './components/home/ClubsSection';
import StatsSection from './components/home/StatsSection';
import EventsCarousel from './components/home/EventsCarousel';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import { ScrollReveal } from './components/ui/ScrollReveal';
import SectionReveal from './components/ui/SectionReveal';
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080f',
      color: 'white',
      overflowX: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif"
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
            <section id="accueil" style={{ scrollMarginTop: '64px' }}>
              <Hero />
            </section>

            <Marquee />

            <section id="pourquoi" style={{ scrollMarginTop: '64px' }}>
              <WhyJoinSection />
            </section>

            <section id="stats" style={{ scrollMarginTop: '64px' }}>
               <StatsSection />
            </section>

            <section id="clubs" style={{ scrollMarginTop: '64px' }}>
              <ClubsSection />
            </section>

            <section id="evenements" style={{ scrollMarginTop: '64px' }}>
              <EventsCarousel />
            </section>

            <section id="temoignages" style={{ scrollMarginTop: '64px' }}>
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
