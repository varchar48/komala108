import React from 'react';
import ScrollRevealWrapper from '@/components/utility/ScrollRevealWrapper';
import { Staff }　from "../../data/staff"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Component for individual card
function Card({ name, headshot, title, intro, quali }) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-4`}>
      <div className="flex flex-row items-center gap-4">
        <img src={`/images/staff/${headshot}`} alt={name} width={90} height={90} className="aspect-square object-cover rounded-full "/>
        <div className="flex flex-col justify-start gap-2">
          <h3 className="text-xl font-bold my-0 text-start">{name}</h3>
          <p className="text-xs bg-gray-200 px-2 py-1 rounded-md inline">{title}</p>
        </div>
      </div>
     
      <p className="text-gray-500 line-clamp-3 text-sm">
        {intro}
      </p>
      <Dialog>
        <DialogTrigger>
          <Button>詳細資料</Button>
        </DialogTrigger>
        <DialogContent className="pe-0">
          <DialogHeader>
            <DialogTitle className="mt-0">{name}</DialogTitle>
            <DialogDescription className="max-h-[80vh] overflow-auto text-start pe-6">
              <p className="leading-relaxed">{intro}</p>
              <hr className="my-6" />
              <p className="font-bold text-lg">專業資格</p>
              <ul>
              {quali.map((item, index) => {
                return(
                  <li key={index} className="border-b border-gray-100 py-3">
                    <div className="flex flex-col">
                    { item.engqua && <><p>{item.engqua}</p></> }
                    { item.chiqua && <><p>{item.chiqua}</p></> }
                    </div>
                  </li>
                )
              })}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function StaffCard() {
  
  return (
    <>
      {Staff.map((card, index) => (
        <ScrollRevealWrapper key={index} delay={100} index={index}>
          <Card key={index} {...card} />
        </ScrollRevealWrapper>
      ))}
    </>
  );
}

// Component for individual profile card
function ProfileCard({ name, company, bio, avatar }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <img src={avatar} width={48} height={48} alt="Avatar" className="rounded-full object-cover h-[48px]" />
        <div>
          <h4 className="text-lg font-bold text-white my-0">{name}</h4>
          <p className="text-gray-400">{company}</p>
        </div>
      </div>
      <blockquote className="text-gray-300 italic">
        {bio}
      </blockquote>
    </div>
  );
}

export function CustomCard2() {
  const cardData2 = [
    {
      name: 'Jane Doe',
      company: 'CEO, Acme Inc.',
      bio: 'The platform has been a game-changer for our team. It has streamlined our development workflow and helped us deliver high-quality web experiences faster than ever before.',
      avatar: '/images/profile.png',
    },
    {
      name: 'John Smith',
      company: 'CTO, Acme Inc.',
      bio: 'The platform\'s powerful analytics and automation tools have been invaluable in helping us optimize our web applications and deliver a better user experience.',
      avatar: '/images/profile.png',
    },
    {
      name: 'Sarah Johnson',
      company: 'Lead Developer, Acme Inc.',
      bio: 'The platform\'s scalable infrastructure has been a lifesaver for our growing web application. We no longer have to worry about managing our own servers and can focus on building great features.',
      avatar: '/images/profile.png',
    },
  ];

  return (
    <>
      {cardData2.map((profile, index) => (
        <ScrollRevealWrapper key={index} delay={100} index={index}>
          <ProfileCard key={index} {...profile} />
        </ScrollRevealWrapper>
      ))}
    </>
  );
}


export function ContactCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <h4 className="text-lg font-bold text-white">Contact Us</h4>
      <p className="text-gray-400">Get in touch with us using the form below.</p>
    </div>
  );
}