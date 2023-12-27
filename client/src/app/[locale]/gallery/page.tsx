/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/Footer/Footer'
// import GallerySwiper from '@/components/GallerySwiper'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'
import Gallery from '@/components/sections/Gallery';

// import img1 from '@/images/gallery/1.png'
// import img2 from '@/images/gallery/2.png'
// import img3 from '@/images/gallery/3.png'
// import img4 from '@/images/gallery/4.png'
// import img5 from '@/images/gallery/5.png'
// import img6 from '@/images/gallery/6.png'
// import img7 from '@/images/gallery/7.png'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('gallery')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <main className="py-4 sm:py-8 container mx-auto">
      <NextIntlClientProvider locale={locale}>
        <Gallery />
      </NextIntlClientProvider>
    </main>
    <Agents />
    <NextIntlClientProvider locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  </div>
}

export default page