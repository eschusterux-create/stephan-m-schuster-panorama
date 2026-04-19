'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('header');

  const scrollToArtist = () => {
    document.getElementById('artist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-800 hover:text-stone-600 transition-colors"
        >
          {t('title')}
        </Link>
        <button
          onClick={scrollToArtist}
          className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          {t('artistLink')}
        </button>
      </div>
    </header>
  );
}
