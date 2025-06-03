'use client';

import { CacheProvider } from '@emotion/react';
import { useState } from 'react';
import createEmotionCache from './emotionCache';

export default function EmotionProvider({ children }) {
  const [cache] = useState(() => createEmotionCache());

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
