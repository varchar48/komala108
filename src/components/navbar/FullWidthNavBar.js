import React, { useEffect, useState } from 'react';
import { Link } from "gatsby";
import { menuItems } from "@/data/menuItems";
import { ChevronDownIcon } from "@/components/icons/icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LangSelector from "@/components/translation/LangSelector";
import config from '@/utils/config';

export default function FWNavBar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        if (window.scrollY > 0) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const getFlexClass = (itemCount) => {
    if (itemCount <= 3) {
      return 'flex';
    } else if (itemCount === 4) {
      return 'flex flex-wrap justify-between';
    } else {
      return 'flex flex-wrap justify-between';
    }
  };

  return (
    <section className="relative z-30" id="fw-navbar">
      <div className={`bg-c1/80 backdrop-blur-lg text-white py-3 table md:w-full fixed ${isFixed ? "fixed-scroll" : "md:relative"} z-20 top-2 right-2 md:top-0 md:right-0 drop-shadow-lg`}>
        <div className="container mx-auto flex justify-center px-3 md:px-8" id="dt-navbar">
          
          {/* Desktop Navbar */}
          <nav className="hidden lg:flex space-x-4 relative w-full justify-around">
            <Menubar>
              {menuItems.header.map((item, index) => (
                item.dropdown ? (
                  <MenubarMenu key={index}>
                    <MenubarTrigger className="flex items-center hover:text-white/60 cursor-pointer text-base">
                      <span>{item.label}</span>
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </MenubarTrigger>
                    <MenubarContent className="absolute mt-2 w-48 origin-top-right border-0 rounded-md bg-white/80 backdrop-blur-md py-1 shadow-lg focus:outline-none lg:right-[-50px]">
                      <div className="container mx-auto">
                        <div className={getFlexClass(item.items.length)}>
                          {item.items.map((subItem, subIndex) => (
                            <MenubarItem key={subIndex} className="hover:bg-slate-300/30 p-0 flex-grow">
                              <Link to={subItem.to} className="w-full p-2 drop-shadow-lg font-medium"><span>{subItem.label}</span></Link>
                            </MenubarItem>
                          ))}
                        </div>
                      </div>
                    </MenubarContent>
                  </MenubarMenu>
                ) : (
                  <Link key={index} to={item.to}>
                    {item.label}
                  </Link>
                )
              ))}
              {config.languageSelector && <LangSelector />}
            </Menubar>
          </nav>

          {/* Mobile Navbar */}
          <nav className="lg:hidden flex items-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button onClick={toggleSheet} aria-label="Open Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-10/12">
                <SheetHeader className="flex flex-row items-center gap-5" id="mobile-nav-header">
                  <SheetTitle className="text-c1 mt-0">Menu</SheetTitle>
                  {config.languageSelector && <LangSelector />}
                </SheetHeader>
                <div className="mt-4">
                {menuItems.header.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className="my-2 stagger"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          className="w-full py-2 text-left flex items-center justify-between font-bold text-gray-600"
                          onClick={() => handleToggleDropdown(index)}
                        >
                          {item.label}
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                        {openDropdown === index && (
                          <div className="mt-2 pl-4">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.to}
                                className="flex py-2 text-gray-600 stagger"
                                onClick={() => setIsSheetOpen(false)}
                                style={{ animationDelay: `${(index * 50) + (subIndex * 25)}ms` }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.to}
                        className="block py-2 text-gray-600 font-bold stagger"
                        onClick={() => setIsSheetOpen(false)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                  <hr />
                </React.Fragment>
              ))}
                </div>
              </SheetContent>
            </Sheet>
          </nav>

        </div>
      </div>
    </section>
  );
}
