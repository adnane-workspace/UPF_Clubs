import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisContext = createContext({
  lenis: null,
});

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // 1. Initialize Lenis with premium easing
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    // 2. Connect Lenis to GSAP Ticker for perfect sync
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // 3. Disable lag smoothing for instant responsiveness
    gsap.ticker.lagSmoothing(0);

    // 4. Update ScrollTrigger on Lenis scroll
    lenisInstance.on('scroll', ScrollTrigger.update);

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(lenisInstance.raf);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};
