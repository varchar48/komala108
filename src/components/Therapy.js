import React from 'react';
import { Link } from "gatsby"
import { Therapy }　from "../data/therapy"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const TherapyPage = () => { 

    return (
    <section>
        <div className="container mx-auto">
        <h1 className="mb-8">療法</h1>
        <Accordion type="single" collapsible>
        {Therapy.map((item, index) => {
        return(
        <>
        <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg">{item.chname} {item.enname}</AccordionTrigger>
            <AccordionContent className="flex lg:flex-row flex-col gap-6">
                <img src={`/images/therapy/${item.imageName}`} width={300} height={300} alt={item.imageName} className="rounded-lg shadow-md object-cover aspect-[1/1]" />
                <div className="space-y-4">
                <p className="py-6 text-lg">{item.intro}</p>
                    { item.blog && 
                    <>
                    <Link to={item.blog}>
                        <Button className="mt-4">詳細資料</Button>
                    </Link>
                    </>}
                </div>
            </AccordionContent>
        </AccordionItem>
        </>
        ); 
        })}
        </Accordion>
        </div>
    </section>
);
};

export default TherapyPage;