/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Footer from '@/components/Footer/Footer'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import Browse from '@/components/sections/Browse'
import Form from './Form.jsx'


interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('addNewCategory')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <main className="py-4 sm:py-8 container mx-auto">
      <div className="flex items-center justify-center">
        <Title variant='doubleBorder' className='text-center my-8 pl-0' borderDirection='right'>
          {t('title')}
        </Title>
      </div>
      <NextIntlClientProvider locale={locale}>
        <div className="relative">
          <Form />
        </div>
      </NextIntlClientProvider>
    </main>
    <Footer />
  </div>
}

export default page