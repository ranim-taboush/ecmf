/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'

import Products from './products'
import Browse from '@/components/sections/Browse'
import Agents from '@/components/sections/Agents'
import Footer from '@/components/Footer/Footer'
import { notFound } from 'next/navigation'


interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {
  const locale = useLocale()
  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`));
  } catch (error) {
  }
  return <div className="">
    <NextIntlClientProvider locale={locale} messages={messages}  >
      <Products />
    </NextIntlClientProvider>
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