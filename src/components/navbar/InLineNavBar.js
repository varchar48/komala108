import React, { useState, useEffect } from 'react';
import { Link } from "gatsby";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar-inline"
import { ChevronDownIcon } from "@/components/icons/icons";
import { menuItems } from "@/data/menuItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LangSelector from "../translation/LangSelector";
import config from '@/utils/config';
import { StaticImage } from "gatsby-plugin-image";

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const intervalId = setInterval(() => {

        const dropdowns = document.querySelectorAll("div[data-radix-menubar-content]");

        dropdowns.forEach((dropdown) => {
          let maxWidth = 0;

          const menuItems = dropdown.querySelectorAll("a");

          const tempContainer = document.createElement("div");
          tempContainer.style.position = "absolute";
          tempContainer.style.visibility = "hidden";
          tempContainer.style.height = "auto";
          tempContainer.style.width = "auto";
          document.body.appendChild(tempContainer);

          menuItems.forEach((item) => {

            const tempItem = item.cloneNode(true);
            tempContainer.appendChild(tempItem);
            const itemWidth = tempItem.offsetWidth;

            if (itemWidth > maxWidth) {
              maxWidth = itemWidth;
            }

            tempContainer.removeChild(tempItem);
          });

          dropdown.style.width = `${maxWidth + 20}px`;

          document.body.removeChild(tempContainer);
        });
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, []);

  const handleToggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(null);
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <section className="relative z-30 lg:pt-8" id="il-navbar">
      <div className="container relative mx-auto flex items-center justify-between py-6 px-6 bg-white lg:rounded-full">

        {/* Logo */}
        <Link className="flex items-center" to="/">
        <StaticImage
          src="../../images/reim_logo.png"
          alt="RE:M Logo reversed"
          width={300}
          loading="lazy"
          placeholder="none"
          formats={["auto", "webp", "avif"]}
        />
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex space-x-4 relative justify-end">
            <Menubar className="flex space-x-1">
              {menuItems.header.map((item, index) => (
                <MenubarMenu key={index}>
                  {item.dropdown ? (
                    <>
                      <MenubarTrigger className="flex items-center hover:text-blue-500 cursor-pointer">
                        {item.label}
                        <ChevronDownIcon className="h-4 w-4 ml-1" />
                      </MenubarTrigger>
                      <MenubarContent className="absolute mt-2 w-48 origin-top-right rounded-md p-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {item.items.map((subItem, subIndex) => (
                          <MenubarItem key={subIndex} onSelect={handleCloseDropdown}>
                            <Link
                              to={subItem.to}
                              className="w-full p-2 stagger"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              {subItem.label}
                            </Link>
                          </MenubarItem>
                        ))}
                      </MenubarContent>
                    </>
                  ) : (
                    <MenubarMenu>
                      <MenubarTrigger asChild>
                        <Link
                          to={item.to}
                          className="hover:text-blue-500 cursor-pointer flex items-center"
                        >
                          {item.label}
                        </Link>
                      </MenubarTrigger>
                    </MenubarMenu>
                  )}
                </MenubarMenu>
              ))}
              {config.languageSelector && <LangSelector />}
            </Menubar>
          </nav>

        {/* Mobile Navbar */}
        <nav className="xl:hidden flex items-center bg-c1 p-3 fixed top-5 right-5">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button onClick={toggleSheet} aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-10/12">
              <SheetHeader className="flex flex-row items-center gap-5" id="mobile-nav-header">
                <SheetTitle className="text-c1 font-black text-2xl mb-0 mt-0">Menu</SheetTitle>
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
    </section>
  );
}
