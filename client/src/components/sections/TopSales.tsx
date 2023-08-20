"use client";

import { FC } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper";


import Title from '../UI/typography/Title';
import ProductCard from '../ProductCard';

import productImage1 from '@/images/top-sales/1.png'
import productImage2 from '@/images/top-sales/2.png'
import productImage3 from '@/images/top-sales/3.png'
import productImage4 from '@/images/top-sales/4.png'
import productImage5 from '@/images/top-sales/5.png'
import productImage6 from '@/images/top-sales/6.png'
import productImage7 from '@/images/top-sales/7.png'
import productImage8 from '@/images/top-sales/8.png'
interface TopSalesProps {
  sectionTitle: string
  productTitle: string
  productDescription: string
  productPrice: string
  productCurrency: string
}

const TopSales: FC<TopSalesProps> = ({ sectionTitle, productTitle, productDescription, productPrice, productCurrency }) => {
  return <section className='py-8'>
    <Title variant="default" className='container' >
      {sectionTitle}
    </Title>
    <Swiper
      scrollbar={{
        draggable: true,
        hide: false,
        dragSize: 75,
      }}
      breakpoints={{
        // when window width is >= 640px
        0: {
          slidesPerView: 2.75,
          spaceBetween: 16,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3.75,
          spaceBetween: 32,
        },
      }}
      // centeredSlides={true}
      // navigation={true}
      modules={[Scrollbar]}
      className="mySwiper mt-8 rtl:mr-[10%] ltr:ml-[10%]"
    >

      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage1}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage2}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage3}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage4}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage5}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage6}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage7}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>
      <SwiperSlide >
        <ProductCard
          title={productTitle}
          description={productDescription}
          image={productImage8}
          price={productPrice}
          currency={productCurrency}
        />
      </SwiperSlide>


    </Swiper>
  </section>
}

export default TopSales