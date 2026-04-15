import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';


export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  
  // Base mouse position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (delayed feel)
  const springConfig = { stiffness: 150, damping: 18 };
  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Smart target detection for cursor morphing
      const target = e.target;
      if (!target) return;

      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.group') ||
        target.classList.contains('interactive');

      const isText = 
        ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN'].includes(target.tagName) && 
        !isInteractive;

      if (isInteractive) {
        setCursorType('hover');
      } else if (isText) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  // Animation variants for the outer ring
  const variants = {
    default: {
      height: 40,
      width: 40,
      backgroundColor: "transparent",
      border: "1.5px solid rgba(255, 255, 255, 0.4)",
      borderRadius: "100%",
    },
    hover: {
      height: 70,
      width: 70,
      backgroundColor: "rgba(124, 58, 237, 1)", // brand-purple
      mixBlendMode: "difference",
      border: "0px solid transparent",
      borderRadius: "100%",
    },
    text: {
      height: 32,
      width: 2,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid transparent",
      borderRadius: "0%",
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000] hidden lg:block">
      {/* 
          1. The Instant Dot 
          Moves immediately with the hardware cursor for zero-latency feel
      */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-2 h-2 bg-violet-500 rounded-full z-[10001] shadow-[0_0_10px_rgba(124,58,237,0.8)]"
      />

      {/* 
          2. The Morphing Spring Ring
          Animates its shape and size based on variants
      */}
      <motion.div
        animate={cursorType}
        variants={variants}
        style={{
          x: circleX,
          y: circleY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        className="absolute pointer-events-none z-[10000]"
      />
    </div>
  );
}
