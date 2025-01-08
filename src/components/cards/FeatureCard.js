import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons/icons";
import { Link } from "gatsby";

const FeatureCard = ({ Icon, title, description, bgCustom, link }) => (
  <div className={`rounded-lg h-full ${bgCustom} p-6 shadow-lg`}>
    <div className="flex items-center justify-between">
      <Icon className="h-8 w-8 text-white" />
      <Button className="text-white hover:text-blue-500" size="icon" variant="ghost" asChild>
        <Link to={link}>
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </Button>
    </div>
    <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
    <p className="mt-2 text-gray-100">{description}</p>
  </div>
);

export default FeatureCard;
