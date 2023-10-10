'use client';

import Navbar from '@/components/Navbar.jsx'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

import contactUsBg from '@/images/contact-us-bg.png'
import Button from '@/components/UI/Button'
import { lines } from '@/data/lines';
import { useLocale } from 'next-intl';
import Title from '@/components/UI/typography/Title';
import Link from 'next/link';
import img1 from '@/images/gallery/1.png'
import img2 from '@/images/gallery/2.png'
import img3 from '@/images/gallery/3.png'
import img4 from '@/images/gallery/4.png'
import img5 from '@/images/gallery/5.png'
import img6 from '@/images/gallery/6.png'
import img7 from '@/images/gallery/7.png'
import line1 from '@/images/lines/normal1.png'
import line2 from '@/images/lines/normal2.png'
import line3 from '@/images/lines/normal3.png'
import line4 from '@/images/lines/normal4.png'
import line5 from '@/images/lines/normal5.png'
import line6 from '@/images/lines/normal6.png'
import lineActive1 from '@/images/lines/active1.png'
import lineActive2 from '@/images/lines/active2.png'
import lineActive3 from '@/images/lines/active3.png'
import lineActive4 from '@/images/lines/active4.png'
import lineActive5 from '@/images/lines/active5.png'
import lineActive6 from '@/images/lines/active6.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper';
import { cn } from '@/utils/utils';
import Arrow from '@/components/UI/Arrow';
import axios, { all } from "axios"
import { Error } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'

import "swiper/css/effect-cards";

const Services = ({ }) => {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const [allLines, setAllLines] = useState(lines)
  const [currentLine, setCurrentLine] = useState(lines[0]);
  const [index, setIndex] = useState(0)

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  const lineImgs = {
    active: [lineActive2, lineActive1, lineActive4, lineActive5, lineActive3, lineActive6],
    normal: [line2, line1, line4, line5, line3, line6],
    names: {
      en: ["Cutting Line", "Slicing Line", "Icon & Steel Deck Line", "Purlins & Ornaments Line", "Pipes & Cans Line", "Shatter Door Line"],
      ar: ["خط التقطيع", "خط التشريح", "خط الايكون و الاستيل ديك", "خط الحليات و المدادات", "خط المواسير و العلب", "خط ابواب المحلات التجارية"],
    }
  }
  const locale = useLocale()

  
  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `${Api}/category` )
      .then(res=>{
        setAllLines(res?.data)
        setCurrentLine(res?.data[0])
      }).catch (err=>{
        Error('Error While Loading Data')});
    }
    getCategory();
  }, [])

  return <div>
    <div className="sm:min-h-[600px] min-h-[400px] pb-20 relative">
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
        <div className="container grid grid-cols-2 content-start justify-between">
          <div className="flex justify-between items-center w-[200%]">
            {
              allLines
              ?lineImgs.normal.map((_, i) => <div key={i} className='flex flex-col justify-between items-center cursor-pointer text-[#4b4b4b]'
              onClick={()=> {setCurrentLine(allLines[i] || allLines[0]); setIndex(i);}}>
                <Image src={currentLine?.title?.en === lineImgs.names.en[i]?lineImgs.active[i]:_} alt={lineImgs.names[i]} width={500} height={500}
                  className='w-32 h-32'
                />
                <p className={cn('font-extrabold text-xl relative', currentLine?.title?.en === lineImgs.names.en[i]?'text-primary': '')}>
                  {locale === 'ar' ?lineImgs.names.ar[i]:lineImgs.names.en[i]}
                <div className={currentLine?.title?.en === lineImgs.names.en[i]? "absolute w-full h-1 bg-primary transition-underline left-1/2 -translate-x-1/2" : ""}></div>
                </p>
              </div>)
              : ''
            }
          </div>
        </div>
      </div>
    </div>
    <div className="relative -mt-60 container bg-[#F9F9F9] rounded-md px-8 sm:px-16 py-6 sm:py-12 z-10">
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
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef?.current;
            swiper.params.navigation.nextEl = navigationNextRef?.current;
          }}
        >
          {
            [img1, img2, img3, img4, img5, img6, img7].map((item, index) => {
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
        <p className='text-base sm:text-lg text-black indent-4'>
          {locale === 'ar' ? currentLine.description.ar : currentLine.description.en}
        </p>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.subtitle.ar : currentLine.subtitle.en}
        </p>
        <p className='text-base sm:text-lg text-black indent-4'>
          {locale === 'ar' ? currentLine.subDescription.ar : currentLine.subDescription.en}
        </p>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? currentLine.productsTitle.ar : currentLine.productsTitle.en}
        </p>
        <ul className='grid grid-rows-4 justify-between list-disc'>
          {currentLine?.products?.
            map((el, i) => <li key={i} className='text-base sm:text-lg text-black'>
              {locale === 'ar' ? el.arName || '' : el.enName || ''}
            </li>
            )}
        </ul>
      </div>
      <div className="mb-3 sm:mb-6">
        <p className='text-xl sm:text-3xl text-primary font-bold mb-2 sm:mb-4'>
          {locale === 'ar' ? "يستخدم في: " : "Used in: "}
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
        <Link href={`/${index}/products`}>
          { locale === 'ar' ? 'اكتشف المزيد من المنتجات' : 'Explore More Products' }
        </Link>
      </Button>
    </div>
  </div>
}

export default Services