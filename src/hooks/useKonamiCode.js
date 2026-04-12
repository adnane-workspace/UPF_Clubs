import { useState, useEffect } from 'react';

/**
 * Custom Hook: useKonamiCode
 * Listens for the legendary sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 */
export const useKonamiCode = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [input, setInput] = useState([]);
  
  const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", 
    "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", 
    "ArrowLeft", "ArrowRight", 
    "b", "a"
  ];

  useEffect(() => {
    const onKeyDown = (e) => {
      // Create a copy of current input and add the new key
      const currentInput = [...input, e.key];
      
      // Keep only the last 10 characters
      if (currentInput.length > KONAMI_CODE.length) {
        currentInput.shift();
      }
      
      setInput(currentInput);

      // Check if current input matches the secret code
      if (currentInput.join(',').toLowerCase() === KONAMI_CODE.join(',').toLowerCase()) {
        setIsTriggered(true);
        // Clear input to allow re-triggering later
        setInput([]);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [input]);

  const reset = () => setIsTriggered(false);

  return { isTriggered, reset };
};
