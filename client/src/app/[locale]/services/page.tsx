/* eslint-disable react-hooks/rules-of-hooks */
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import { FC } from 'react'

import Services from './Services'
import Browse from '@/components/sections/Browse'
import Agents from '@/components/sections/Agents'
import Footer from '@/components/Footer/Footer'
import { notFound } from 'next/navigation'


interface pageProps {

}

const page: FC<pageProps> = async({ }) => {
  const locale = useLocale()
  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`));
  } catch (error) {
  }
  return <div className="">
    <NextIntlClientProvider locale={locale} messages={messages}  >
      <Services />
    </NextIntlClientProvider>
    <NextIntlClientProvider locale={locale}>
      <div className="relative">
        <Browse />
      </div>
    </NextIntlClientProvider>
    <Agents />
    <Footer />
  </div>

  // <div>
  //   <div className="h-screen relative">
  //     <div className="absolute inset-0 ">
  //       <Image
  //         src={contactUsBg}
  //         alt={t('title')}
  //         width={contactUsBg.width}
  //         height={contactUsBg.height}
  //         className='w-full h-full'
  //       />
  //     </div>
  //     <div className="relative">
  //       <Navbar />
  //       <div className="container mt-6 grid grid-cols-2 content-start justify-between">
  //         <div className="">
  //           {allLines.map((el, i) => <p key={i} className='text-primary text-2xl sm:text-3xl mb-5 sm:mb:10'>
  //             {el.en}
  //           </p>
  //           )}
  //         </div>
  //         <div className="flex flex-col items-center justify-center">
  //           <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>{allLines[0].en}</p>
  //           <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>{allLines[0].en}</p>
  //           <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>{allLines[0].en}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="-mt-96 container bg-white rounded-md px-8 sm:px-16 py-6 sm:py-12">
  //     <Title variant='default' className='my-4 sm:my-8'>
  //       {allLines[0].en}
  //     </Title>
  //     <div className="mb-3 sm:mb-6">
  //       <p className='text-xl sm:text-3xl text-primary'>
  //         {lines[0].title.en}
  //       </p>
  //       <p className='text-base sm:text-lg text-white'>
  //         {lines[0].description.en}
  //       </p>
  //     </div>
  //     <div className="mb-3 sm:mb-6">
  //       <p className='text-xl sm:text-3xl text-primary'>
  //         {lines[0].subtitle.en}
  //       </p>
  //       <p className='text-base sm:text-lg text-white'>
  //         {lines[0].subDescription.en}
  //       </p>
  //     </div>
  //     <div className="mb-3 sm:mb-6">
  //       <p className='text-xl sm:text-3xl text-primary'>
  //         {lines[0].productsTitle.en}
  //       </p>
  //       <ul>
  //         {lines[0].products?.en?.map((el, i) => <li key={i} className='text-base sm:text-lg text-white'>
  //           {el}
  //         </li>
  //         )}
  //       </ul>
  //     </div>
  //     <div className="mb-3 sm:mb-6">
  //       <p className='text-xl sm:text-3xl text-primary'>
  //         {lines[0].productsTitle.en}
  //       </p>
  //       <ul className='grid grid-rows-4 justify-between'>
  //         {lines[0].products?.en?.map((el, i) => <li key={i} className='text-base sm:text-lg text-white'>
  //           {el}
  //         </li>
  //         )}
  //       </ul>
  //     </div>
  //     <Button className='w-full sm:w-1/2'>
  //       Explore More Products
  //     </Button>
  //   </div>
  // </div>

}

export default page