import React, { useState, useEffect } from 'react'
// import { StaticImage } from 'gatsby-plugin-image'
import { StaffCard } from '@/components/cards/CustomCards'
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import ScrollRevealWrapper from '@/components/utility/ScrollRevealWrapper';
import TherapySection from '@/components/Therapy'


export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24" id="therapy">
        <div className="container grid items-center gap-6 px-4 md:px-6">
          <ScrollRevealWrapper delay={200}>
            <div id="therapy">
              <TherapySection />
            </div>
          </ScrollRevealWrapper>
        </div>
      </section>

      <section className="w-full pb-12 mb:pb-24 lg:pb-32 bg-gray-200" id="therapists">
        <div className="custom-shape-divider-top-1721792938">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill fill-white"></path>
            </svg>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6 pt-12 md:pt-24 lg:pt-32">
            <StaffCard />
        </div>
      </section>
    </>
  )
}


export function Head() {
  const { title, description, image, siteUrl } = useSiteMetadata();
  const metaDesc = "Registered Physiotherapy Center in Hong Kong, Restore Rehab Relief in Motion";
  const keywords = "Physiotherapy Center, Physiotherapy Hong Kong, REIM, RE:M, Fascial Manipulation, Schroth mothed, Manipulation Therapy, Pilates, Modern Acupuncture, Extracorporeal Shockwave Therapy, Interferential Therapy, Ultrasound Therapy, therapy, therapists";
  const author = "Char";
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
