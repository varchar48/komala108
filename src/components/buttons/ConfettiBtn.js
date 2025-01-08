import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';

const ConfettiBtn = ({ btnText = "Confetti", link = "#" }) => {
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const [animating, setAnimating] = useState(false);
  const animationClass = 'confetti-btn--animate';
  const positionVariables = '--conf-btn-click-';

  useEffect(() => {
    const btn = btnRef.current;
    const icon = iconRef.current;

    if (!btn || !icon) return;

    const handleMouseOver = (event) => {
      if (animating) return;
      setAnimating(true);
      setAnimationPosition(event);
      btn.classList.add(animationClass);
      resetAnimation();
    };

    const setAnimationPosition = (event) => {
      const btnBoundingRect = btn.getBoundingClientRect();
      document.documentElement.style.setProperty(positionVariables + 'x', (event.clientX - btnBoundingRect.left) + 'px');
      document.documentElement.style.setProperty(positionVariables + 'y', (event.clientY - btnBoundingRect.top) + 'px');
    };

    const resetAnimation = () => {
      const handleAnimationEnd = () => {
        icon.removeEventListener('animationend', handleAnimationEnd);
        btn.classList.remove(animationClass);
        setAnimating(false);
      };
      icon.addEventListener('animationend', handleAnimationEnd);
    };

    btn.addEventListener('mouseover', handleMouseOver);

    return () => {
      btn.removeEventListener('mouseover', handleMouseOver);
    };
  }, [animating]);

  const isExternalLink = link.startsWith('http://') || link.startsWith('https://');

  return (
    <div className="confetti-btn inline-block relative js-confetti-btn" ref={btnRef}>
      {isExternalLink ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="confetti-btn__btn min-h-[40px] w-full bg-c1 hover:bg-black/90 hover:no-underline text-gray-100 shadow-md text-lg px-4 py-2 rounded-md relative inline-flex justify-center items-center whitespace-nowrap cursor-pointer no-underline leading-tight transition-all duration-200 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 js-confetti-btn__btn"
        >
          {btnText} <ArrowUpRight size={23} strokeWidth={1} />
        </a>
      ) : (
        <Link
          to={link}
          className="confetti-btn__btn min-h-[40px] w-full bg-c2 hover:bg-black/90 hover:no-underline text-gray-100 shadow-md text-lg px-4 py-2 rounded-md relative inline-flex justify-center items-center whitespace-nowrap cursor-pointer no-underline leading-tight transition-all duration-200 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 js-confetti-btn__btn"
        >
          {btnText} <ArrowRight size={23} strokeWidth={1} />
        </Link>
      )}
      <svg className="confetti-btn__icon js-confetti-btn__icon" viewBox="0 0 16 16" aria-hidden="true" ref={iconRef}>
        <circle className="conf-btn-svg-item-0" fill="currentColor" cx="8" cy="8" r="8" />
        <polygon className="conf-btn-svg-item-1" fill="#f888c0" points="10.3 6.212 3.3 0.581 1 15.419 15 9.991 10.3 6.212" />
        <path className="conf-btn-svg-item-2" fill="#fa9856" d="M2,8a6,6,0,1,1,6,6A5.993,5.993,0,0,1,2,8Z" />
        <polygon className="conf-btn-svg-item-3" fill="#2842c3" points="7.52 0 5.001 5.898 1.888 13.184 8.48 16 14.112 2.816 7.52 0" />
        <path className="conf-btn-svg-item-4" fill="#f5c09a" d="M2,8a6,6,0,1,1,6,6A6,6,0,0,1,2,8Z" />
        <polygon className="conf-btn-svg-item-5" fill="#3aace9" points="14.164 9.474 14.723 0.507 8.578 3.562 1.277 7.192 13.789 15.493 14.164 9.474" />
      </svg>
    </div>
  );
};

const ConfettiDLBtn = ({ btnText = "Download", link = "#", download = true }) => {
  const btnRef = useRef(null);
  const iconRef = useRef(null);
  const [animating, setAnimating] = useState(false);
  const animationClass = 'confetti-btn--animate';
  const positionVariables = '--conf-btn-click-';

  useEffect(() => {
    const btn = btnRef.current;
    const icon = iconRef.current;

    if (!btn || !icon) return;

    const handleMouseOver = (event) => {
      if (animating) return;
      setAnimating(true);
      setAnimationPosition(event);
      btn.classList.add(animationClass);
      resetAnimation();
    };

    const setAnimationPosition = (event) => {
      const btnBoundingRect = btn.getBoundingClientRect();
      document.documentElement.style.setProperty(positionVariables + 'x', (event.clientX - btnBoundingRect.left) + 'px');
      document.documentElement.style.setProperty(positionVariables + 'y', (event.clientY - btnBoundingRect.top) + 'px');
    };

    const resetAnimation = () => {
      const handleAnimationEnd = () => {
        icon.removeEventListener('animationend', handleAnimationEnd);
        btn.classList.remove(animationClass);
        setAnimating(false);
      };
      icon.addEventListener('animationend', handleAnimationEnd);
    };

    btn.addEventListener('mouseover', handleMouseOver);

    return () => {
      btn.removeEventListener('mouseover', handleMouseOver);
    };
  }, [animating]);

  return (
    <div className="confetti-btn inline-block relative js-confetti-btn" ref={btnRef}>
      <a
        href={`/downloads/${link}`}
        className="confetti-btn__btn min-h-[40px] w-full bg-black hover:bg-black/90 hover:no-underline text-gray-100 shadow-md text-lg px-4 py-2 rounded-md relative inline-flex justify-center items-center whitespace-nowrap cursor-pointer no-underline leading-tight transition-all duration-200 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 js-confetti-btn__btn"
        {...(download ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {btnText} <Download size={23} strokeWidth={1} className="ms-2" />
      </a>
      <svg className="confetti-btn__icon js-confetti-btn__icon" viewBox="0 0 16 16" aria-hidden="true" ref={iconRef}>
        <circle className="conf-btn-svg-item-0" fill="currentColor" cx="8" cy="8" r="8" />
        <polygon className="conf-btn-svg-item-1" fill="#f888c0" points="10.3 6.212 3.3 0.581 1 15.419 15 9.991 10.3 6.212" />
        <path className="conf-btn-svg-item-2" fill="#fa9856" d="M2,8a6,6,0,1,1,6,6A5.993,5.993,0,0,1,2,8Z" />
        <polygon className="conf-btn-svg-item-3" fill="#2842c3" points="7.52 0 5.001 5.898 1.888 13.184 8.48 16 14.112 2.816 7.52 0" />
        <path className="conf-btn-svg-item-4" fill="#f5c09a" d="M2,8a6,6,0,1,1,6,6A6,6,0,0,1,2,8Z" />
        <polygon className="conf-btn-svg-item-5" fill="#3aace9" points="14.164 9.474 14.723 0.507 8.578 3.562 1.277 7.192 13.789 15.493 14.164 9.474" />
      </svg>
    </div>
  );
};


export { ConfettiBtn, ConfettiDLBtn };
