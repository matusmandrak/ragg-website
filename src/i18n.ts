import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // This is the only line that should be in this file.
  // It dynamically loads the right messages for the server.
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});