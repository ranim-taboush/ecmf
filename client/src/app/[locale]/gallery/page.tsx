/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/Footer/Footer'
import GallerySwiper from '@/components/GallerySwiper'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import Browse from '@/components/sections/Browse'
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'

import img1 from '@/images/gallery/1.png'
import img2 from '@/images/gallery/2.png'
import img3 from '@/images/gallery/3.png'
import img4 from '@/images/gallery/4.png'
import img5 from '@/images/gallery/5.png'
import img6 from '@/images/gallery/6.png'
import img7 from '@/images/gallery/7.png'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('gallery')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <main className="py-4 sm:py-8 container mx-auto">
      <div className="flex items-center justify-center">
        <Title variant='doubleBorder' className='text-center my-8 pl-0' borderDirection='right'>
          {t('title')}
        </Title>
      </div>
      <NextIntlClientProvider locale={locale}>

        <div className="">
          <GallerySwiper
            nextArrowId='iron-next'
            prevArrowId='iron-prev'
            images={[
              { src: [img4, img5, img6, img7, img1, img2, img3] },
              { src: [img1, img2, img3, img4, img5, img6, img7,] },
              { src: [img7, img1, img2, img3, img4, img5, img6,] },
              { src: [img6, img7, img1, img2, img3, img4, img5,] },
            ]}
          />
        </div>



      </NextIntlClientProvider>
    </main>
    <NextIntlClientProvider locale={locale}>
      <div className="relative">
        <Browse />
      </div>
    </NextIntlClientProvider>
    <Agents />
    <Footer />
  </div>
}

export default page