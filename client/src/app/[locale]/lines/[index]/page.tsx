/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'

import Services from './Services.jsx'
import Agents from '@/components/sections/Agents'
import Footer from '@/components/Footer/Footer'
import { notFound } from 'next/navigation'


interface pageProps {

}

const page: FC<pageProps> = async({ }) => {
  const locale = useLocale()
  let messages;
  try {
    messages = (await import(`../../../../../messages/${locale}.json`));
  } catch (error) {
  }
  return <div className="">
    <NextIntlClientProvider locale={locale} messages={messages}  >
      <Services />
    </NextIntlClientProvider>
    <Agents />
    <NextIntlClientProvider locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  </div>

}
 
export default page