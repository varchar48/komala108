import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import Autoplay from 'embla-carousel-autoplay'
import CountdownTimer from '@/components/utility/Countdown'
import UserForm from '@/components/form/EOI-Form';

export default function HoldingPage() {

    const data = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              description
            }
          }
        }
      `);
    
      const description = data.site.siteMetadata.description;

      const eventName = 'ICMSA Template'; // Enter the event name (Once set, do not change!)

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
            <Carousel
            plugins={[
                Autoplay({
                delay: 5000,
                }),
            ]}>
                <CarouselContent>
                    <CarouselItem>
                    <img src="/images/nz1.jpg" alt="New Zealand Mountain 1" className="w-screen h-screen object-cover object-center" />
                    </CarouselItem>
                    <CarouselItem>
                    <img src="/images/nz2.jpg" alt="New Zealand Mountain 2" className="w-screen h-screen object-cover object-center" />
                    </CarouselItem>
                    <CarouselItem>
                    <img src="/images/nz3.jpg" alt="New Zealand Mountain 3" className="w-screen h-screen object-cover object-center" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        <div className="grid lg:grid-cols-2">
            <div className="hidden relative lg:flex h-auto lg:h-screen lg:order-2 flex-col items-center justify-center space-y-6 px-4 text-center z-10">
                <h1 className="hidden lg:block container drop-shadow-lg tracking-tighter text-white">
                    Welcome to the {description}
                </h1>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="mb-5 mt-0">EXPRESS YOUR INTEREST TODAY</h4>
                  <UserForm eventName={eventName} />
                </div>

            </div>
            <div className="relative flex min-h-screen lg:order-2 flex-col items-center justify-center space-y-6 px-4 text-center z-10 bg-gradient-to-br from-blue-900/70 to-lime-800/70 backdrop-blur-sm p-5">
                <div className="hidden lg:flex flex-col items-center gap-5">
                    <CountdownTimer targetDate="2028-12-31" />
                    <h3 className="text-white my-0">Days until the conference</h3>
                    <Separator className="max-w-xl bg-primary-event !mb-5"/>
                </div>
                <h1 className="lg:hidden containerdrop-shadow-lg tracking-tighter text-white">
                    Welcome to the {description}
                </h1>
                <h2 className="font-black text-orange-500">Event Logo</h2>
                <div className="lg:hidden bg-white/50 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="mb-5 mt-0">EXPRESS YOUR INTEREST TODAY</h4>
                    <UserForm eventName={eventName} />
                </div>
            </div>
        </div>
      </div>
    </>
  )
}


export function Head() {
  const { title, description, image, siteUrl } = useSiteMetadata();
  const metaDesc = "Page description for SEO";
  const keywords = "add, your, relevant, keywords";
  const author = "ICMSA";
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <>
      <title>{`${title} - ${description}`}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:title" content={`${title} | ${description}`}  />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="article:author" content={author} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <link rel="canonical" href={`${siteUrl}${currentPath}`} />
    </>
  );
}
