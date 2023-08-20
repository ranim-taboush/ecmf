'use client';

import { FC, useRef } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";


import "swiper/css/effect-cards";
import Arrow from './UI/Arrow';
import { cn } from '@/utils/utils';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Title from './UI/typography/Title';

interface GallerySwiperProps {
  images: any[]
  nextArrowId: string
  prevArrowId: string
}

const GallerySwiper: FC<GallerySwiperProps> = ({ images, nextArrowId, prevArrowId }) => {
  const locale = useLocale()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)
  return <div className="py-8 ">
    {
      images.map((item: any, index: number) => {
        return <div className="mb-8 sm:mb-16 py-8" key={index}>
          <Title variant='default' className='text-start mb-3 sm:mb-6'>
            {locale === 'ar' ? 'الألات المعدنية' : 'Iron Gallery'}
          </Title>
          <Swiper
            effect='cards'
            cardsEffect={{
              slideShadows: false,
              perSlideOffset: 16,
            }}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className="mySwiper w-10/12 sm:w-3/5 mx-auto h-48 sm:h-96 flex items-center"
            initialSlide={3}

            navigation={{ prevEl: navigationPrevRef?.current, nextEl: navigationNextRef?.current }}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = navigationPrevRef?.current;
              swiper.params.navigation.nextEl = navigationNextRef?.current;
            }}
          >
            {
              item?.src?.map((item: any, index: number) => {
                return <SwiperSlide key={index} className=''>
                  <Image
                    src={item}
                    alt="ECMF"
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



        </div >
      })
    }
  </div >
}

export default GallerySwiper