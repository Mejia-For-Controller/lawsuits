import { AppProps } from 'next/app';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module'

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const tagManagerArgs = {
  gtmId: 'GTM-MQG62S5'
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  })

  return <Component {...pageProps} />;
}

export default MyApp;
