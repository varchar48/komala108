import React from 'react';
import { Staff }　from "../data/therapy"

const TherapistsPage = () => { 

    return (
    <section>
        <div className="container mx-auto">
        <h1>Therapy</h1>
        <Accordion type="single" collapsible>
        {Therapy.map((item, index) => {
        return(
        <>
        <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{item.chname} {item.enname}</AccordionTrigger>
            <AccordionContent className="flex lg:flex-row flex-col gap-6">
                <img src={`/images/therapy/${item.imageName}`} width={250} height={250} className="rounded-lg shadow-md object-cover aspect-[1/1]" />
                <div className="space-y-4">
                <p>{item.intro}</p>
                    { item.blog && 
                    <>
                    <a href={item.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <Button variant="outline" className="mt-4">詳細資料</Button>
                    </a>
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