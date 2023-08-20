import Image from 'next/image';
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import { MoveRight } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Button from '@/components/UI/Button'
import { cn } from '@/utils/utils';
import logo from '@/images/logo.png';
import bg from '@/images/home-bg.png';
import TopSales from '@/components/sections/TopSales';

import Gallery from '@/components/sections/Gallery';
import AboutUs from '@/components/sections/AboutUs';
import ContactUs from '@/components/sections/ContactUs';
import Browse from '@/components/sections/Browse';
import Agents from '@/components/sections/Agents';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('home');
  const topSalesProducts = useTranslations('topSales');
  const global = useTranslations('global');

  return (
    <main >
      <section className="relative h-[100dvh]">
        <div className="absolute w-full h-full">
          <Image
            src={bg.src}
            alt="ECMF"
            width={1920}
            height={1080}
            className='w-full h-full'
          />
        </div>
        <div className="relative h-full flex flex-col">
          <Navbar />
          <div className="container flex-1 grid sm:grid-cols-2 items-center gap-x-8">
            <div className="flex flex-col items-center sm:items-start">
              <h1 className='text-white text-center sm:text-start text-5xl md:text-6xl xl:text-7xl font-bold'>
                {t('introOne')}
                <span className='text-primary inline-block'>{t('introTwo')}</span>
                {t('introThree')}
              </h1>
              <Button className='mt-8 sm:px-8 sm:py-4'>
                <div className="flex items-center gap-4">
                  <span className='inline-block'>
                    {t('cta')}
                  </span>
                  <MoveRight
                    className={
                      cn(
                        'inline-block text-white',
                        locale === 'ar' ? 'transform rotate-180' : ''
                      )
                    }
                    size={16} />
                </div>
              </Button>
            </div>
            <div className="">
              <Image
                src={logo}
                alt="ECMF"
                className='w-full h-auto'
              />
              <div className="flex flex-col items-center justify-center sm:gap-1 mt-4 sm:mt-8">
                {/* <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>{t('slogan1')}</p> */}
                <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold animate-text-one'>{t('slogan2')}</p>
                <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold animate-text-two'>{t('slogan3')}</p>
              </div>

            </div>
          </div>
        </div>
      </section>
      <TopSales
        sectionTitle={topSalesProducts('title')}
        productCurrency={global('currency')}
        productDescription={topSalesProducts('productDescription')}
        productPrice={topSalesProducts('productPrice')}
        productTitle={topSalesProducts('productTitle')}
      />
      <NextIntlClientProvider locale={locale}>
        <Gallery />
      </NextIntlClientProvider>
      <AboutUs />
      <ContactUs />
      {/* <NextIntlClientProvider locale={locale}>
        <Browse />
      </NextIntlClientProvider> */}
      <Agents />
      <Footer />
    </main>
  )
}
