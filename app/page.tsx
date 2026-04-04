import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

const BookViewer = dynamic(() => import('@/components/BookViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
      Lädt…
    </div>
  ),
});

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
        {t('description')}
      </p>
      <section aria-label="Panorama Book">
        <BookViewer />
      </section>
    </div>
  );
}
