import './globals.css';
import EmotionProvider from './EmotionProvider';
import { CssBaseline } from '@mui/material';

export const metadata = {
  title: 'My App',
  description: 'Hydration fix setup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EmotionProvider>
          <CssBaseline />
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}
