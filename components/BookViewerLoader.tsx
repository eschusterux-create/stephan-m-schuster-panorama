'use client';

import dynamic from 'next/dynamic';

const BookViewer = dynamic(() => import('@/components/BookViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
      Lädt…
    </div>
  ),
});

export default function BookViewerLoader() {
  return <BookViewer />;
}
