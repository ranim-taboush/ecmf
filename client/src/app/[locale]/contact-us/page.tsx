/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'
import Footer from '@/components/Footer/Footer'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import Browse from '@/components/sections/Browse'
import Form from './Form'


interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('contactUs')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <main className="py-4 sm:py-8 container mx-auto">
      <div className="flex items-center justify-center">
        <Title variant='doubleBorder' className='text-center my-8 pl-0' borderDirection='right'>
          {t('title')}
        </Title>
      </div>
      <Form />
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