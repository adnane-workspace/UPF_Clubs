import Navbar from './components/layout/Navbar';
import EventsCarousel from './components/home/EventsCarousel';
import ClubsSection from './components/home/ClubsSection';
import UpcomingEventsScroll from './components/home/UpcomingEventsScroll';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-brand-500 selection:text-white scroll-smooth relative">
      <Navbar />
      <main>
        <EventsCarousel />
        <ClubsSection />
        <UpcomingEventsScroll />
      </main>
      <Footer />
    </div>
  );
}

export default App;
