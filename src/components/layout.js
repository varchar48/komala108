import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackToTop from '@/components/utility/BackToTop';
import { useSiteMetadata } from '@/hooks/use-site-metadata';

export default function Layout({ children }) {
  const location = useLocation();
  const { siteUrl } = useSiteMetadata();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const currentDomain = window.location.origin;

    if (currentDomain === siteUrl) {
      document.documentElement.lang = 'en';
    }
  }, [siteUrl]);

  useEffect(() => {
    // Adding a temporary class for positioning and setting the body ID based on the pathname
    document.body.classList.add('!mt-0');
    const pathname = location.pathname.replace(/\//g, '-').replace(/^-|-$/g, '');
    document.body.id = pathname ? pathname : 'home';

    const observerCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { 
              const elements = node.querySelectorAll('[data-radix-menubar-content]');
              elements.forEach(element => {
                if (element.parentElement) {
                  element.parentElement.classList.add('has-radix-menubar-content');
                }
              });
            }
          });
        }
      }
    };

    // Create and observe mutations on a narrower scope if possible
    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.body.classList.remove('!mt-0');
      document.body.removeAttribute('id');
    };
  }, [location.pathname]);

  // Configuration settings for the sidebar and key dates modal
  const removeDefaultPadding = ["/"];
  const shouldRemovePadding = removeDefaultPadding.includes(location.pathname);

  const paddingClass = shouldRemovePadding ? '' : 'flex flex-col gap-12';

  return (
    <>
      <Header />
      <main className={`flex 'flex-col'}`}>
        <div className={`w-full ${paddingClass}`}>
          {children}
        </div>
      </main>
      <Footer />
      {isClient && <BackToTop />}
    </>
  );
}
