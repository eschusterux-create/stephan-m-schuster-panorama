import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const supportedLocales = ['de', 'en'] as const;
type Locale = (typeof supportedLocales)[number];

function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export default getRequestConfig(async () => {
  // next-intl middleware sets x-default-locale; fall back to 'de'
  const requestHeaders = headers();
  const raw = requestHeaders.get('x-default-locale') ?? 'de';
  const locale: Locale = isSupportedLocale(raw) ? raw : 'de';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
