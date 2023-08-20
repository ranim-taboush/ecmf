'use client';

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'


import contactUsBg from '@/images/contact-us-bg.png'
import Button from '@/components/UI/Button'
import { lines } from '@/data/lines';
import { useLocale, useTranslations } from 'next-intl';
import Title from '@/components/UI/typography/Title';


import img1 from '@/images/gallery/1.png'
import img2 from '@/images/gallery/2.png'
import img3 from '@/images/gallery/3.png'
import img4 from '@/images/gallery/4.png'
import img5 from '@/images/gallery/5.png'
import img6 from '@/images/gallery/6.png'
import img7 from '@/images/gallery/7.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper';
import { cn } from '@/utils/utils';
import Arrow from '@/components/UI/Arrow';

import "swiper/css/effect-cards";

interface ServicesProps {

}

const Services: FC<ServicesProps> = ({ }) => {
  const allLines = lines.map(el => el.title)
  const [currentLine, setCurrentLine] = useState(lines[0] || []);

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  const locale = useLocale()
  const t = useTranslations('contactUs')
  return <div>
    <div className="h-screen relative">
      <div className="absolute inset-0 ">
        <Image
          src={contactUsBg}
          alt={'lines'}
          width={contactUsBg.width}
          height={contactUsBg.height}
          className='w-full h-full'
        />
      </div>
      <div className="relative">
        <Navbar />
        <div className="container mt-6 grid grid-cols-2 content-start justify-between">
          <div className="">
            {allLines.map((el, i) => <p
              key={i}
              className={cn(
                'text-2xl sm:text-3xl mb-5 sm:mb:10 font-bold cursor-pointer',
                currentLine.title.en === el.en ? 'text-primary' : 'text-white'
              )}
              onClick={() => setCurrentLine(lines[i])}
            >
              {locale === 'ar' ? el.ar : el.en}
            </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>
              {locale === 'ar' ? currentLine.title.ar : currentLine.title.en}
            </p>
            <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>
              {locale === 'ar' ? currentLine.title.ar : currentLine.title.en}
            </p>
            <p className='customText uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>
              {locale === 'ar' ? currentLine.title.ar : currentLine.title.en}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="relative -mt-96 container bg-[#F9F9F9] rounded-md px-8 sm:px-16 py-6 sm:py-12 z-10">
      <Title variant='default' className='my-4 sm:my-8'>
        {locale === 'ar' ? currentLine.machine.ar : currentLine.machine.en}
      </Title>

      <div className="my-14 sm:my-20 w-full">
        <Swiper
          effect='cards'
          cardsEffect={{
            slideShadows: false,
            perSlideOffset: 16,
          }}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="mySwiper w-10/12 sm:w-3/5 mx-auto h-48 sm:h-96 "
          initialSlide={3}

          navigation={{ prevEl: navigationPrevRef?.current, nextEl: navigationNextRef?.current }}
          onBeforeInit={(swiper: any) => {
            swiper.params.navigation.prevEl = navigationPrevRef?.current;
            swiper.params.navigation.nextEl = navigationNextRef?.current;
          }}
        >
          {
            [img1, img2, img3, img4, img5, img6, img7].map((item: any, index: number) => {
              return <SwiperSlide key={index} className=''>
                <Image
                  src={item}
                  alt="product"
                  width={item.width}
                  height={item.height}
                  className='w-full h-full'
                />
              </SwiperSlide>
            })
          }
          <div
            className={cn('absolute -bottom-12 sm:-bottom-20 z-50',
              locale === 'ar' ? 'right-[5%] sm:right-1/4' : 'left-[5%] sm:left-1/4',
            )}
            ref={navigationPrevRef}
          >
            <Arrow
              variant='prev'
              className={cn('p-2 sm:p-3 ')}
            >
              Prev
            </Arrow>
          </div>
          <div
            className={cn('absolute -bottom-12 sm:-bottom-20 z-50',
              locale === 'ar' ? 'left-[5%] sm:left-1/4' : 'right-[5%] sm:right-1/4'
            )}
            ref={navigationNextRef}
          >
            <Arrow
              variant='next'
              className={cn('p-2 sm:p-3 ')}
            >next
            </Arrow>
          </div>
        </Swiper>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.title.ar : currentLine.title.en}
        </p>
        <p className='text-base sm:text-lg text-black'>
          {locale === 'ar' ? currentLine.description.ar : currentLine.description.en}
        </p>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.subtitle.ar : currentLine.subtitle.en}
        </p>
        <p className='text-base sm:text-lg text-black'>
          {locale === 'ar' ? currentLine.subDescription.ar : currentLine.subDescription.en}
        </p>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.productsTitle.ar : currentLine.productsTitle.en}
        </p>
        <ul className='grid grid-rows-4 justify-between list-disc'>
          {currentLine.products[locale === 'ar' ? 'ar' : 'en'].
            map((el, i) => <li key={i} className='text-base sm:text-lg text-black'>
              {el}
            </li>
            )}
        </ul>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.usedInTitle.ar : currentLine.usedInTitle.en}
        </p>
        <ul className='grid grid-rows-4 justify-between list-disc'>
          {currentLine.usedIn[locale === 'ar' ? 'ar' : 'en'].
            map((el, i) => <li key={i} className='text-base sm:text-lg text-black'>
              {el}
            </li>
            )}
        </ul>
      </div>
      <Button className='sm:px-6 sm:py-4'>
        {
          locale === 'ar' ?
            'اكتشف المزيد من المنتجات'
            :
            'Explore More Products'
        }

      </Button>
    </div>
  </div>
}

export default Services