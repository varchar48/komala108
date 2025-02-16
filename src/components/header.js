import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { getPageData } from '@/data/pageData';
import FWNavBar from "@/components/navbar/FullWidthNavBar";
import InLineNavBar from "@/components/navbar/InLineNavBar";
import config from '@/utils/config';
import ScrollRevealWrapper from "@/components/utility/ScrollRevealWrapper";
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { CarouselImg } from "../data/heroCarouImg";
import { CalendarIcon } from '@/components/icons/icons'

const Header = () => {
  const location = useLocation();
  const { backgroundImage } = getPageData(location.pathname);
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const fwNavbar = document.getElementById("fw-navbar");
    const ilNavbar = document.getElementById("il-navbar");

    if (fwNavbar) {
      document.body.classList.add("fw-navbar");
    } else if (ilNavbar) {
      document.body.classList.add("il-navbar");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("fw-navbar");
      document.body.classList.remove("il-navbar");
    };
  }, []);

  return (
    <>
      <header
        className="relative text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        {config.inlineNavbar ? <InLineNavBar /> : <FWNavBar />}

        { isHomepage && 
        <ScrollRevealWrapper>
        <section className="relative z-10 py-20">
          <div className="container mx-auto grid grid-cols-1 gap-16 px-6 lg:grid-cols-2">
            
              <div className="space-y-6 md:order-2">
                <p className="font-bold leading-tight text-white">
                    Registered Physiotherapy Center in Hong Kong
                </p>
                <h1 className="text-4xl font-bold leading-tight text-white">
                Restore Rehab Relief<br />
                &ndash; in Motion
                </h1>
                <p className="font-bold leading-tight text-white">
                Fascial Manipulation, Schroth mothed, Manipulation Therapy, Pilates, Modern Acupuncture, Extracorporeal Shockwave Therapy, Interferential Therapy, Ultrasound Therapy
                </p>
                <a href="https://wa.me/85252361927"
                target="_blank"
                rel="noopener noreferrer"
                >
                    <Button className="mt-8 p-6"><CalendarIcon size={20} className="me-2"/>立即預約</Button>
                </a>
              </div>
 
              <div className="relative rounded-lg md:order-1">
                <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}>
                  <CarouselContent>
                    { CarouselImg.map((item , index) => {
                      return(
                        <CarouselItem key={index}>
                          <img src={`/images/therapy/${item.imageName}`} alt={item.imageName} className="w-full aspect-[16/9] object-cover rounded-lg" />
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
          </div>
        </section>
        </ScrollRevealWrapper>
        }

      </header>
    </>
  );
}

export default Header;
