"use client";

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper";

import Title from '../UI/typography/Title';
import ProductCard from '../ProductCard';
import axios from 'axios';
import { products } from '@/data/products'
import { useLocale } from 'next-intl';
import { Error, Success } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'

import productImage0 from '@/images/0.png'

const TopSales = () => {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const locale = useLocale();
  const [arImgs, setArImgs] = useState([productImage0])
  const [enImgs, setEnImgs] = useState([productImage0])
  const [proAr, setProAr] = useState([{}])
  const [proEn, setProEn] = useState([{}])
  const baseUrl = Api

  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `${baseUrl}/products/ar` )
      .then(res=>{ 
        setProAr(res?.data) 
        ////////////////////////Image Part////////////////////////////////////
        let arrLength = res?.data?.length || 0
        setArImgs(new Array(arrLength).fill(productImage0))
        if(res?.data)
          res?.data?.forEach((pro, i)=>{
            let finalImg = productImage0;
            if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
              finalImg = baseUrl + URL.createObjectURL(pro.productImg)
            }else if(pro.productImg && pro.productImg !== ''){
              const sanitizedImg = pro.productImg.replace(/\\/g, "/");
              finalImg = baseUrl + "/" + sanitizedImg
            }
            setArImgs(prev=>{
              prev[i] = finalImg
              return prev
            })
          })
      }).catch (err=>{ Error('Error While Loading Data')});
      await axios.get( `${baseUrl}/products/en` )
      .then(res=>{ 
        setProEn(res?.data) 
        ////////////////////////Image Part////////////////////////////////////
        let arrLength = res?.data?.length || 0
        setEnImgs(new Array(arrLength).fill(productImage0))
        if(res?.data)
          res?.data?.forEach((pro, i)=>{
            let finalImg = productImage0;
            if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
              finalImg = baseUrl + URL.createObjectURL(pro.productImg)
            }else if(pro.productImg && pro.productImg !== ''){
              const sanitizedImg = pro.productImg.replace(/\\/g, "/");
              finalImg = baseUrl + "/" + sanitizedImg
            }
            setEnImgs(prev=>{
              prev[i] = finalImg
              return prev
            })
          })
      }).catch (err=>{ Error('Error While Loading Data')});
      return {productsAr: proAr, productsEn: proEn}
    }
    const getProducts = () => {
      setProAr(products)
      setProEn(products)
      ////////////////////////Image Part////////////////////////
      let arrLength = products?.length || 0
      setArImgs(new Array(arrLength).fill(productImage0))
      if(products)
        products?.forEach((pro, i)=>{
          let finalImg = productImage0;
          if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
            finalImg = baseUrl + URL.createObjectURL(pro.productImg)
          }else if(pro.productImg && pro.productImg !== ''){
            const sanitizedImg = pro.productImg.replace(/\\/g, "/");
            finalImg = baseUrl + "/" + sanitizedImg
          }
          setArImgs(prev=>{
            prev[i] = finalImg
            return prev
          })
          setEnImgs(prev=>{
            prev[i] = finalImg
            return prev
          })
        })
    }
    getProducts()
    getCategory()
  }, [])
  
  return <section className='py-8'>
    <Title variant="default" className='container' >
      {locale === 'ar'? "منتجاتنا": "Our Products"}
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
        
          return <SwiperSlide key={i} >
            <ProductCard
              id={el?._id?.arName}
              title={el?.arName || ''}
              description="جودة عالية"
              image={arImgs[i] || productImage0}
              currency={"جنيه"}
            />
          </SwiperSlide>
        })
        :proEn?.map((el, i)=>{
          return <SwiperSlide key={i}>
            <ProductCard
              id={el?._id?.arName}
              title={el?.enName || ''}
              description="Premium Quality"
              image={enImgs[i] || productImage0}
              currency={"EGP"}
            />
          </SwiperSlide>
        })
      }
    </Swiper>
  </section>
}

export default TopSales