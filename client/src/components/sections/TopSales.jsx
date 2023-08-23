"use client";

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper";


import Title from '../UI/typography/Title';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { useLocale } from 'next-intl';

import productImage1 from '@/images/top-sales/1.png'
import productImage2 from '@/images/top-sales/2.png'
import productImage3 from '@/images/top-sales/3.png'
import productImage4 from '@/images/top-sales/4.png'
import productImage5 from '@/images/top-sales/5.png'
import productImage6 from '@/images/top-sales/6.png'
import productImage7 from '@/images/top-sales/7.png'
import productImage8 from '@/images/top-sales/8.png'

const TopSales = () => {
  const locale = useLocale();
  const images = [productImage1, productImage2, productImage3, productImage4, productImage5, productImage6, 
    productImage7, productImage8, productImage1, productImage2, productImage3, productImage4, productImage5, 
    productImage6, productImage7, productImage8, productImage1, productImage2, productImage3, productImage4,
     productImage5, productImage6, productImage7, productImage8, productImage1, productImage2, productImage3, 
     productImage4, productImage5, productImage6, productImage7, productImage8, productImage1, productImage2, 
     productImage3, productImage4, productImage5, productImage6, productImage7, productImage8, productImage1, 
     productImage2, productImage3, productImage4, productImage5, productImage6, productImage7, productImage8, ]
  const [proAr, setProAr] = useState([{}])
  const [proEn, setProEn] = useState([{}])

  useEffect(()=>{
    const getCategory = async () => {
      let proAr, proEn
      await axios.get( `http://localhost:5000/products/ar` )
      .then(res=>{ setProAr(res?.data) }).catch (err=>{ Error('Error While Loading Data')});
      await axios.get( `http://localhost:5000/products/en` )
      .then(res=>{ setProEn(res?.data) }).catch (err=>{ Error('Error While Loading Data')});
      return {productsAr: proAr, productsEn: proEn}
    }
    getCategory()
  }, [])
  
  return <section className='py-8'>
    <Title variant="default" className='container' >
      {locale === 'ar'? "منتجاتنا:": "Our Products:"}
    </Title>
    <Swiper
      scrollbar={{
        draggable: true, hide: false, dragSize: 75,
      }}
      breakpoints={{
        // when window width is >= 640px
        0: { slidesPerView: 2.75, spaceBetween: 16, },
        // when window width is >= 768px
        768: { slidesPerView: 3.75, spaceBetween: 32, },
      }}
      // centeredSlides={true}
      // navigation={true}
      modules={[Scrollbar]}
      className="mySwiper mt-8 rtl:mr-[10%] ltr:ml-[10%]"
    >
      {
        locale === "ar" 
        ? proAr?.map((el, i)=>{
          console.log(el)
          return <SwiperSlide >
            <ProductCard
              title={el?.arName || ''}
              description="جودة عالية"
              image={images[i]}
              price={el?.price || '0'}
              currency={"جنيه"}
            />
          </SwiperSlide>
        })
        :proEn?.map((el, i)=>{
          return <SwiperSlide >
            <ProductCard
              title={el?.enName || ''}
              description="Premium Quality"
              image={images[i]}
              price={el?.price || ''}
              currency={"EGP"}
            />
          </SwiperSlide>
        })
      }
    </Swiper>
  </section>
}

export default TopSales