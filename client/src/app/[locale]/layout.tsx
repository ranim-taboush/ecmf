import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

import './globals.css'
import Navbar from '@/components/Navbar.jsx';
import { cairo } from '@/utils/fonts'
import { GoogleAnalytics } from '@next/third-parties/google'


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favicon from '@/../public/favicon.ico'

export const metadata = {
  title: 'ECMF',
  description: 'ECMF',
  icons: {icon: Favicon.src},
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className=' scroll-smooth'>
      <head>
        <link rel="canonical" href="https://ecmf-eg.com/" />
      </head>
      <body className={cairo.className}>
        {/* <Navbar /> */}
        {children}
      <ToastContainer />
      </body>
      <GoogleAnalytics gaId="G-14GYR3FRCE" />
    </html>
  )
}
