/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'

import Products from './products'
import Agents from '@/components/sections/Agents'
import Footer from '@/components/Footer/Footer'
import { notFound } from 'next/navigation'

const page = async ({ }) => {
  const locale = useLocale()
  let messages;
  try {
    messages = (await import(`../../../../../messages/${locale}.json`));
  } catch (error) {
  }
  return <div className="">
    <NextIntlClientProvider locale={locale} messages={messages}  >
      <Products />
    </NextIntlClientProvider>
    <Agents />
    <Footer />
  </div>

}
export default page