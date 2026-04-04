import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer
      id="artist"
      className="border-t border-stone-200 bg-stone-50 mt-24"
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-stone-800 mb-2">
          {t('heading')}
        </h2>
        <p className="text-lg text-stone-600 mb-6">{t('name')}</p>
        <ul className="space-y-2 text-sm text-stone-500">
          <li>
            <span className="font-medium text-stone-700">{t('websiteLabel')}: </span>
            <a
              href="https://stephan-schuster.de"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 underline underline-offset-2 transition-colors"
            >
              stephan-schuster.de
            </a>
          </li>
          <li>
            <span className="font-medium text-stone-700">{t('emailLabel')}: </span>
            <a
              href="mailto:mail@stephan-schuster.de"
              className="hover:text-stone-800 underline underline-offset-2 transition-colors"
            >
              mail@stephan-schuster.de
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
