import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
        days: String(Math.floor((difference / (1000 * 60 * 60 * 24)) % 7)).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-row lg:mt-0" id="countdown">
      {timeLeft.weeks ? (
        <div className="time-container text-center mx-3">
          <div className="time text-[2rem] lg:text-[3rem] font-medium leading-none bebas text-white">{timeLeft.weeks}</div>
          <div className="date-text font-light text-lg bebas text-white">weeks</div>
        </div>
      ) : null}

      {timeLeft.days ? (
        <div className="time-container text-center mx-3">
          <div className="time text-[2rem] lg:text-[3rem] font-medium leading-none bebas text-white">{timeLeft.days}</div>
          <div className="date-text font-light text-lg bebas text-white">days</div>
        </div>
      ) : null}

      {timeLeft.hours ? (
        <div className="time-container text-center mx-3">
          <div className="time text-[2rem] lg:text-[3rem] font-medium leading-none bebas text-white">{timeLeft.hours}</div>
          <div className="date-text font-light text-lg bebas text-white">hours</div>
        </div>
      ) : null}

      {timeLeft.minutes ? (
        <div className="time-container text-center mx-3">
          <div className="time text-[2rem] lg:text-[3rem] font-medium leading-none bebas text-white">{timeLeft.minutes}</div>
          <div className="date-text font-light text-lg bebas text-white">minutes</div>
        </div>
      ) : null}

      {timeLeft.seconds ? (
        <div className="time-container text-center mx-3 hidden xl:inline-block">
          <div className="time text-[2rem] lg:text-[3rem] font-medium leading-none bebas text-white">{timeLeft.seconds}</div>
          <div className="date-text font-light text-lg bebas text-white">seconds</div>
        </div>
      ) : null}
    </div>
  );
}

export default CountdownTimer;
