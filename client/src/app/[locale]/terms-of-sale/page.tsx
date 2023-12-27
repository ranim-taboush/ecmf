/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react'
import Footer from '@/components/Footer/Footer'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('terms')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <main className="py-4 sm:py-8 container mx-auto">
      <div className="flex items-center justify-center">
        <Title variant='doubleBorder' className='text-center my-8 pl-0' borderDirection='right'>
          {t('title')}
        </Title>
      </div>
      <div className="py-4 ">
        <p className=' text-base '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ea atque eos temporibus provident non modi totam ab consectetur quibusdam illum maxime velit, at voluptatem itaque distinctio. Impedit, harum accusamus.
        </p>
        <br />
        <br />
        <p className=' text-base '>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis ut aspernatur aliquid ratione consequuntur sunt animi, similique eveniet ipsam ex iure molestiae minima eligendi molestias laborum quaerat atque velit deleniti?
        </p>
        <br />
        <br />
        <p className=" text-3xl text-gradient">Our Policy:</p>
        <p className=' text-base '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, porro accusamus quasi illo atque temporibus facere corporis? Quaerat impedit similique dolorum optio odit aperiam, in, itaque rerum dolore at quis
        </p>
      </div>
    </main>
    <Agents />
    <NextIntlClientProvider locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  </div>
}

export default page