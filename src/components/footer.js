import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import ScrollRevealWrapper from '@/components/utility/ScrollRevealWrapper';
import MapLocation from '@/components/MapLocation';
import { TradeHourInfo, ContactInfo } from "../data/footerInfo";
import * as Icons from '@/components/icons/icons';
import { InstagramIcon } from "@/components/icons/icons";

const IconComponent = ({ iconName }) => {
  const Icon = Icons[`${iconName}Icon`];
  return <Icon className="w-5 h-5" />;
};

export default function Footer() {

  return (
    <footer>
      <ScrollRevealWrapper>
        <section className="bg-c3">
          <MapLocation />
        </section>
      </ScrollRevealWrapper>

      <ScrollRevealWrapper delay={250}>
        <section className="bg-c1">
          <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto" id="footerInfo">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4">
                <StaticImage
                  src="../images/reim_logo_rev.png"
                  alt="RE:M Logo reversed"
                  width={350}
                  loading="lazy"
                  placeholder="none"
                  formats={["auto", "webp", "avif"]}
                />
                <InstagramIcon />
              </div>
              <div className="lg:w-3/4 grid md:grid-cols-2 gap-12">
                <div>
                  <h3>營業時間</h3>
                    {TradeHourInfo.map((item, index) => (
                      <div key={index} className="flex flex-row justify-between border-b border-blue-400 text-gray-400 py-3">
                        <p>{item.label}</p>
                        <p>{item.text}</p>
                      </div>
                    ))}
                    <h3 className="text-gray-50 mt-8">敬請預約</h3>
                  </div>
                  <div id="contact-us">
                <h3>聯絡我們</h3>
                {ContactInfo.map((item, index) => (
                  <div key={index} className="text-gray-400 py-2 flex flex-row gap-2">
                    <IconComponent iconName={item.icon} /> 
                    <div>
                      <p>{item.label}:</p>
                      <p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                        {item.text}
                      </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
            </div>
          </div>
      </section>
    </ScrollRevealWrapper>
    </footer>
  );
}
