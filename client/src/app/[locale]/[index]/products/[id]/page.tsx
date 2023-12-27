/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/Footer/Footer';
import Agents from '@/components/sections/Agents';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { FC } from 'react'
import ProductDetails from './ProductDetails.jsx';

interface pageProps {

}

const page: FC<pageProps> = async ({ }) => {
  const locale = useLocale()
  let messages;
  try {
    messages = (await import(`../../../../../../messages/${locale}.json`));
  } catch (error) {
  }
  return <div className="">
    <NextIntlClientProvider locale={locale} messages={messages}  >
      <ProductDetails/>
    </NextIntlClientProvider>
    <Agents />
      <NextIntlClientProvider locale={locale}>
        <Footer />
      </NextIntlClientProvider>
  </div>
}

export default page