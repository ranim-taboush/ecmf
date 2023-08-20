"use client";

import { FC } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import BrowseCard from '../BrowseCard';

import browse1 from '@/images/browse1.png'
import browse2 from '@/images/browse2.png'
import browse3 from '@/images/browse3.png'
import browse4 from '@/images/browse4.png'
import { useLocale } from 'next-intl';
import Image from 'next/image';

interface BrowseProps {

}

const browses = [
  {
    titleEn: 'Gallery',
    titleAr: 'المعرض',
    slug: 'gallery',
    image: browse2,
  },
  {
    titleEn: 'Products',
    titleAr: 'المنتجات',
    slug: 'products',
    image: browse3,
  }, {
    titleEn: 'Lines',
    titleAr: 'الخدمات',
    slug: 'lines',
    image: browse4,
  }, {
    titleEn: 'Contact Us',
    titleAr: 'تواصل معنا',
    slug: 'contact-us',
    image: browse2,
  }
]

const Browse: FC<BrowseProps> = ({ }) => {
  const locale = useLocale();

  return <section className='py-8 sm:py-16'>
    <Swiper
      breakpoints={{
        // when window width is >= 640px
        0: {
          slidesPerView: 2.75,
          spaceBetween: 32,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3.75,
          spaceBetween: 38,
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide className='!h-auto w-'>
        <Image
          src={browse1}
          alt="ECMF"
          width={browse1.width}
          height={browse1.height}
          className='ltr:rounded-r-md rtl:rounded-l-md w-full h-full'
        />
      </SwiperSlide>
      {browses.map((item, index) => {
        return <SwiperSlide key={index}>
          <BrowseCard
            title={locale === 'ar' ? item.titleAr : item.titleEn}
            slug={item.slug}
            image={item.image}
            locale={locale}
          />
        </SwiperSlide>
      })}
    </Swiper>
  </section>
}

export default Browse