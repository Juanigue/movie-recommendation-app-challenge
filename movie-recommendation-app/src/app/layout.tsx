import React from 'react';
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie Recommendation App',
  description: 'Descubri y explora nuevas peliculas.',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={jost.className}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
