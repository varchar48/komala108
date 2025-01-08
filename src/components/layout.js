import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackToTop from '@/components/utility/BackToTop';
import { useSiteMetadata } from '@/hooks/use-site-metadata';
import config from '@/utils/config';

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
  const sidebarEnabled = config.sidebar.enabled;
  const customPages = config.sidebar.customPages || [];
  const keydatesPopout = config.keydatesPopout || { enabled: false, customPages: [] };

  const shouldShowSidebar = sidebarEnabled && (customPages.includes(location.pathname) || customPages.length === 0);
  const shouldShowKeyDatesModal = keydatesPopout.enabled && keydatesPopout.customPages.includes(location.pathname);

  const removeDefaultPadding = ["/"];
  const shouldRemovePadding = removeDefaultPadding.includes(location.pathname);

  const sidebarClass = shouldShowSidebar ? 'lg:w-9/12' : 'w-full';
  const paddingClass = shouldRemovePadding ? '' : 'py-12 md:py-16 flex flex-col gap-12';

  return (
    <>
      <Header />
      <main className={`flex ${shouldShowSidebar ? 'flex-col lg:flex-row container mx-auto p-0' : 'flex-col'}`}>
        <div className={`w-full ${sidebarClass} ${paddingClass}`}>
          {children}
        </div>
        {shouldShowSidebar && (
          <div className="w-full lg:w-3/12 bg-slate-100 py-12 md:py-16">
            <Sidebar />
          </div>
        )}
      </main>
      <Footer />
      {isClient && <BackToTop />}
      {isClient && shouldShowKeyDatesModal && <KeyDatesModal />}
    </>
  );
}
