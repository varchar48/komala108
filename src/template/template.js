import React, { useState, useEffect } from "react"
import { useSiteMetadata } from "@/hooks/use-site-metadata";

export default function Page() {

  return (
    <>
      <section>
          <div className="container px-4 md:px-6">

          </div>
      </section>

      {/* Add more sections as needed */}
    </>
  )
}

export function Head() {
  const { title, description, image, siteUrl } = useSiteMetadata();
  const pageTitle = "Page Title";
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
      <title>{`${pageTitle} - ${description}`}</title>
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
