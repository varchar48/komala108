import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { StaticImage } from "gatsby-plugin-image";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon } from '@/components/icons/icons';

export const EzineCard = ({ issue, date, title, desc, url }) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="pb-0">
        <StaticImage src="../../images/cameleon.jpg" alt="Article Image" width={400} height={225} className="rounded-lg" /> {/* repalce the image with the ezine banner */}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Issue: {issue}</div>
          <div className="text-xs font-medium text-gray-500">{date}</div>
        </div>
        <h3 className="text-lg font-bold mt-0 mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{desc}</p>
        <a
          href={url}
          className="inline-flex items-center text-sm font-medium text-primary rounded-lg py-2 px-3 border hover:bg-slate-700 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          View more
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}

export const SkeletonEzineCard = () => {
    return (
      <Card className="max-w-md">
        <CardHeader className="pb-0">
          <Skeleton className="w-full h-56 rounded-lg" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </CardContent>
      </Card>
    );
  }