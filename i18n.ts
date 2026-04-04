import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // German is the primary locale; no URL-based locale switching.
  const locale = 'de';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
