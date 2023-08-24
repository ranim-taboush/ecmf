"use client";

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation } from "swiper";


import Title from '../UI/typography/Title';
import ProductCard from '../ProductCard';
import axios from 'axios';

import productImage1 from '@/images/top-sales/1.png'

const TopLines = () => {
  const [arImgs, setArImgs] = useState([productImage1])
  const [enImgs, setEnImgs] = useState([productImage1])
  const [proAr, setProAr] = useState([{}])
  const [proEn, setProEn] = useState([{}])
  const baseUrl = "http://localhost:5000/"

  useEffect(()=>{
    const getCategory = async () => {
      let proAr, proEn
      await axios.get( `http://localhost:5000/products/ar` )
      .then(res=>{ 
        setProAr(res?.data) 
        ////////////////////////Image Part////////////////////////////////////
        let arrLength = res?.data?.length || 0
        setArImgs(new Array(arrLength).fill(productImage1))
        if(res?.data)
          res?.data?.forEach((pro, i)=>{
            let finalImg = productImage1;
            if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
              finalImg = baseUrl + URL.createObjectURL(pro.productImg)
            }else if(pro.productImg && pro.productImg !== ''){
              const sanitizedImg = pro.productImg.replace(/\\/g, "/");
              finalImg = baseUrl + sanitizedImg
            }
            setArImgs(prev=>{
              prev[i] = finalImg
              return prev
            })
          })
      }).catch (err=>{ Error('Error While Loading Data')});
      await axios.get( `http://localhost:5000/products/en` )
      .then(res=>{ 
        setProEn(res?.data) 
        ////////////////////////Image Part////////////////////////////////////
        let arrLength = res?.data?.length || 0
        setEnImgs(new Array(arrLength).fill(productImage1))
        if(res?.data)
          res?.data?.forEach((pro, i)=>{
            let finalImg = productImage1;
            if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
              finalImg = baseUrl + URL.createObjectURL(pro.productImg)
            }else if(pro.productImg && pro.productImg !== ''){
              const sanitizedImg = pro.productImg.replace(/\\/g, "/");
              finalImg = baseUrl + sanitizedImg
            }
            setEnImgs(prev=>{
              prev[i] = finalImg
              return prev
            })
          })
      }).catch (err=>{ Error('Error While Loading Data')});
      return {productsAr: proAr, productsEn: proEn}
    }
    // getCategory()
  }, [])
  
  return <section className='py-8'>
  </section>
}

export default TopLines