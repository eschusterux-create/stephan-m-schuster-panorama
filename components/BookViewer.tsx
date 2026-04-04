'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { useTranslations } from 'next-intl';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface BookPageProps {
  pageNumber: number;
  width: number;
  pdfUrl: string;
}

const BookPage = ({ pageNumber, width, pdfUrl }: BookPageProps) => (
  <div className="bg-white border border-stone-200 overflow-hidden">
    <Document file={pdfUrl} loading={null}>
      <Page
        pageNumber={pageNumber}
        width={width}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </Document>
  </div>
);

export default function BookViewer() {
  const t = useTranslations('bookViewer');
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(400);
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const half = Math.floor(containerWidth / 2) - 16;
        setPageWidth(Math.min(Math.max(half, 200), 480));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const prevPage = () => {
    (bookRef.current as any)?.pageFlip()?.flipPrev();
  };

  const nextPage = () => {
    (bookRef.current as any)?.pageFlip()?.flipNext();
  };

  const pageHeight = Math.round(pageWidth * 1.414); // A4 ratio

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Hidden document to get page count */}
      <Document
        file="/api/pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
            {t('loading')}
          </div>
        }
        error={
          <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
            {t('error')}
          </div>
        }
      >
        <div className="hidden">
          <Page pageNumber={1} width={1} />
        </div>
      </Document>

      {numPages > 0 && (
        <div ref={containerRef} className="w-full flex flex-col items-center gap-6">
          <div className="book-shadow">
            <HTMLFlipBook
              ref={bookRef as any}
              width={pageWidth}
              height={pageHeight}
              size="fixed"
              minWidth={200}
              maxWidth={480}
              minHeight={283}
              maxHeight={679}
              showCover={false}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="book"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              maxShadowOpacity={0.5}
              disableFlipByClick={false}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <BookPage
                  key={i + 1}
                  pageNumber={i + 1}
                  width={pageWidth}
                  pdfUrl="/api/pdf"
                />
              ))}
            </HTMLFlipBook>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 rounded border border-stone-300 hover:border-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
            {t('prev')}
            </button>
            <span className="tabular-nums">
              {currentPage + 1} / {numPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage >= numPages - 1}
              className="px-4 py-2 rounded border border-stone-300 hover:border-stone-500 hover:text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
            {t('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
