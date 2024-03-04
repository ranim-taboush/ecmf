"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import Navbar from '@/components/Navbar.jsx'
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/0.png'
import axios from "axios"
import { Error } from '@/components/toast';
import { usePathname } from 'next/navigation'
import { Api, ApiKey } from '@/config/api'
import { info } from '@/utils/productsInfo'

const ProductDetails = ({ }) => {
  const pathname = usePathname()
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const locale = useLocale()
  const baseUrl = Api
  const [product, setProduct] = useState({})
  const [thickness, setThickness] = useState('')
  const [madeBy, setMadeBy] = useState('')
  const [img, setImg] = useState(productImg)

  const findByHow = (name)=>{
    let agent 
    if(name === 'agent1')
        agent =  {en: 'Kandil Steel', ar: 'قنديل للصلب'}
    else if (name === 'agent2')
      agent = {en: 'Egyptian Metal Forming', ar: "المصرية لتصنيع المعادن"}
    else if (name === 'agent3')
        agent =  {en: 'El Ola Steel Group', ar: "مجموعة العلا للصلب"}
    else if (name === 'agent4')
      agent =  {en: 'Al Ghurair Iron & Steel LLC', ar: "الغرير للحديد و الاستيل"}
    else if (name === 'agent5')
        agent =  {en: 'EZZ Dikheila Iron & Steel', ar: "عز الدخيلة للحديد والصلب"}
    else
        agent =  {en: 'error', ar: "خطأ"}
    return agent
  }

  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `${Api}/products/en` )
      .then(res=>{
        const path = locale === "ar"? decodeURI(pathname.split('/')[4]): decodeURI(pathname.split('/')[3])
        const pro = res?.data?.find(_=>_?.arName === path)
        setProduct(pro)
        setThickness(thickness)
        setMadeBy(findByHow(pro?.srcImg?.split('/')[2].split('.')[0]))

        let finalImg = productImg;
        if(pro?.productImg && pro?.productImg !== '' && (pro?.productImg instanceof Blob || pro?.productImg instanceof File)){
          finalImg = baseUrl + URL.createObjectURL(pro?.productImg)
        }else if(pro?.productImg && pro?.productImg !== ''){
          const sanitizedImg = pro?.productImg.replace(/\\/g, "/");
          finalImg = baseUrl + "/" + sanitizedImg
        }
        setImg(finalImg)
      }).catch (err=>{
       Error('Error While Loading Data ')
       console.log('err.message', err.message)
       Error(err?.response?.data || err?.message || 'error')
      });
    }

    const timer = setTimeout(() => {
      getCategory();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // 
  }, [])

  return <div>
    <div className="h-64 relative">
      <div className="absolute inset-0 ">
        <Image
          src={productsBg}
          alt={'Products'}
          width={productsBg.width}
          height={productsBg.height}
          className='w-full h-full'
        />
      </div>
      <div className="relative">
        <Navbar />
        <div className="container flex items-center justify-center">
          <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold max-md:-mt-5'>
            {locale === 'ar' ? product?.arName || 'الواح صاج ساخن' : product?.enName|| 'Hot Metal Sheets'}
          </p>
        </div>
      </div>
    </div>
    <div className="relative -mt-8 container bg-[#F9F9F9] rounded-md px-4 sm:px-12 py-6 sm:py-12 z-10">

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 items-start">
        <div className="">
          <Image
            src={img}
            alt={'Product'}
            width={productImg.width}
            height={productImg.height}
            className='w-full h-auto'
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className='bg-gray-200 text-primary text-xs sm:text-sm rounded-md w-fit px-2'>
            {locale === 'ar' ? 'جديد' : 'New'}
          </p>
          <h1 className='text-gray-900 text-2xl sm:text-3xl font-bold'>
            {locale === 'ar' ? product?.arName || '' : product?.enName|| ''}
          </h1>
          <div className="">
            <p className='text-black text-base sm:text-lg'>
              {locale === 'ar' ? 'مواصفات المنتج' : 'Product characteristics'}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'السمك' : 'Thickness'}: 
              {locale === 'ar' ? `من ${product?.thickness?.from} ${product?.thickness?.arUnit} الى ${product?.thickness?.to} ${product?.thickness?.arUnit}` 
              : `from ${product?.thickness?.from} ${product?.thickness?.enUnit} to ${product?.thickness?.to} ${product?.thickness?.enUnit}`}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'العرض' : 'Width'}: {locale === 'ar' ? `حتى ${product?.length || 0} مم` : `up to ${product?.length || 0} mm`}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'ST 37-2. S235JR . ASTM A283' : 'ST 37-2. S235JR . ASTM A283'}
            </p>
          </div>
          <div className="">
            <p className='text-gray-900 text-lg sm:text-xl font-medium'>
              {locale === 'ar' ? 'السمك (مم)' : 'Thickness (mm)'}
            </p>
            <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-4 items-center flex-wrap">
              {
                ( product?.thicknessList||[0.20, 0.22, 0.25, 0.30])
                  .map((el, i) => <span
                    key={i}
                    className="inline-block border border-black text-center py-1 px-2 sm:px-4 cursor-pointer hover:bg-gray-200 focus:bg-gray-300"
                  >
                    {el}
                  </span>
                  )
              }
            </div>
          </div>
          <div className="">
            <p className='text-gray-900 text-lg sm:text-xl font-medium'>
              {locale === 'ar' ? 'الطول (مم)' : 'Hight (mm)'}
            </p>
            <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-4 items-center flex-wrap">
              {
                (product?.lengthList||[1000, 1250, 1500, 2000])
                  .map((el, i) => <span
                    key={i}
                    className="inline-block border border-black text-center py-1 px-2 sm:px-4 cursor-pointer hover:bg-gray-200 focus:bg-gray-300"
                  >
                    {el}
                  </span>
                  )
              }
            </div>
          </div>
          <p className='text-gray-900 text-lg sm:text-xl font-medium'>
            {locale === 'ar' ? 'منتج من' : 'Made by'}
            {" : "}
            {locale === 'ar' ? madeBy?.ar || 'عز الدخيلة' : madeBy?.en || 'Ezz El-Dkhela'}
          </p>
        </div>
      </div>

      
      {product?.enName && product?.enName === "Sigal Ornaments" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Sigal Ornaments']?.data }}
      ></div>}
      
      {product?.enName && product?.enName === "Colored Sheet" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Colored Sheet']?.data }}
      ></div>}
      
      {product?.enName && product?.enName === "Cold Rolled Sheets" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Cold Rolled Sheets']?.data }}
      ></div>}

      {product?.enName && product?.enName === "Pipes" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Pipes']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Icon" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Icon']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Hot Sheets" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Hot Sheets']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Steel Deck" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Steel Deck']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Streem Pulins" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Streem Pulins']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Galvanized Sheets" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Galvanized Sheets']?.data }}
      ></div>}
      {product?.enName && product?.enName === "Corner Pulins" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['Corner Pulins']?.data }}
      ></div>}
      {product?.enName && product?.enName === "U Parallel Ornaments" &&<div className="text-black w-full mt-4" 
      dangerouslySetInnerHTML={{ __html: info?.['U Parallel Ornaments']?.data }}
      ></div>}
    </div>
  </div>
}

export default ProductDetails