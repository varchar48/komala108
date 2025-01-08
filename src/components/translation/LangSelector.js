import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSiteMetadata } from '@/hooks/use-site-metadata';

export default function LangSelector() {
  const [currentPath, setCurrentPath] = useState('');
  const { siteUrl } = useSiteMetadata();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Visit the link below to translate the page and update the generateLangUrl link
  // https://translate.google.com/?sl=auto&tl=en&op=websites
  const generateLangUrl = (languageCode) => `https://gatsby--template--v3-netlify-app.translate.goog${currentPath}?_x_tr_sl=auto&_x_tr_tl=${languageCode}&_x_tr_hl=en&_x_tr_pto=wapp`;

  const originalUrl = siteUrl;

  // Add / remove languages
  const english = "en";
  const chinese = "zh-CN";
  const japanese = "ja";
  const french = "fr";
  const spanish = "es";

  const handleLanguageChange = (languageCode) => {
    if (languageCode === english) {
      window.location.href = `${originalUrl}${currentPath}`;
    } else {
      window.location.href = generateLangUrl(languageCode);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-dbrown">Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange(english)} className="cursor-pointer">
          English
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange(chinese)} className="cursor-pointer">
          中文
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange(japanese)} className="cursor-pointer">
          日本語
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange(french)} className="cursor-pointer">
          Français
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLanguageChange(spanish)} className="cursor-pointer">
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
