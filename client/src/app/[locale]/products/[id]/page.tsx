/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/Footer/Footer';
import Agents from '@/components/sections/Agents';
import Browse from '@/components/sections/Browse';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { FC } from 'react'
import ProductDetails from './ProductDetails';

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
    {/* <NextIntlClientProvider locale={locale} messages={messages}  > */}
      <ProductDetails />
    {/* </NextIntlClientProvider> */}
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