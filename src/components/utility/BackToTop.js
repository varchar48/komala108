import React, { useEffect, useState } from 'react';
 
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
 
  const handleScroll = () => {
    // Replace '100' with the scroll position at which you want the button to appear
    const activeThreshold = window.scrollY > 100;
    setIsVisible(activeThreshold);
  };
 
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
 
  };
 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  return (
    <a
      href="#top"  
      onClick={scrollToTop}
      className={`back-to-top h-12 w-12 flex fixed right-5 bottom-5 z-10 bg-gray-900/90 ${
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      } transition-all hover:bg-gray-900`}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <svg
        className="h-5 w-5 block m-auto fill-current text-white leading-none"
        viewBox="0 0 20 20"
      >
        <polyline
          points="2 13 10 5 18 13"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </a>
  );
}
 
export default BackToTop;