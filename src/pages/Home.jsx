import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import EventsCarousel from '../components/home/EventsCarousel';
import ClubsSection from '../components/home/ClubsSection';
import UpcomingEventsScroll from '../components/home/UpcomingEventsScroll';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export default function Home() {
  return (
    <>
      <ScrollReveal delay={0}>
        <Hero />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal delay={0}>
        <EventsCarousel />
      </ScrollReveal>

      <ScrollReveal delay={0}>
        <ClubsSection />
      </ScrollReveal>

      <ScrollReveal delay={0}>
        <UpcomingEventsScroll />
      </ScrollReveal>
    </>
  );
}
