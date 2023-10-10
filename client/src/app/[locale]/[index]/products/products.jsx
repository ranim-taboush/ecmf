"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar.jsx';
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/product_test.png'
import Product from './product';
import LittleNav from './littleNav'
import axios from "axios"
import { Error } from '@/components/toast';
import { useParams } from 'next/navigation'
import { Api, ApiKey } from '@/config/api'

const Products = ({}) => {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json"; 
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const locale = useLocale()
  const params = useParams()
  const baseUrl = Api
  const index = params.index || 0
  const [categories, setCategories] = useState({})
  const [checked, setChecked] = useState([true])
  const [imgs, setImgs] = useState([productImg])

  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `${Api}/category` )
      .then(res=>{
        setCategories(res?.data)
        let arrLength = res?.data[index]?.products?.length || 0
        setChecked(new Array(arrLength).fill(true))

      ////////////////////////Image Part////////////////////////////////////
        setImgs(new Array(arrLength).fill(productImg))
      res?.data[index]?.products?.forEach((pro, i)=>{
        let finalImg = productImg;
        if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
          finalImg = baseUrl + URL.createObjectURL(pro.productImg)
        }else if(pro.productImg && pro.productImg !== ''){
          const sanitizedImg = pro.productImg.replace(/\\/g, "/");
          finalImg = baseUrl + "/" + sanitizedImg
        }
        setImgs(prev=>{
          prev[i] = finalImg
          return prev
        })
      })
      }).catch (err=>{Error(err.message)});
    }
    getCategory();
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
          <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>
            {locale === 'ar' ? categories[index]?.title?.ar||'الواح صاج ساخن' : categories[index]?.title?.en || 'Hot Metal Sheets'}
          </p>
        </div>
      </div>
    </div>
      <div className="grid grid-cols-4 relative -mt-8 container bg-[#F9F9F9] rounded-md z-10">
        
        <div className="md:col-span-1 md:block hidden bg-white rounded-md px-4 sm:px-12 py-6 sm:py-12">
          <p className='font-semibold mb-4'>{locale === 'ar' ? categories[index]?.title.ar || "خط التشريح" : categories[index]?.title.en || 'Slicing Line'}</p>
          {categories[index]?.products?.map(
            (el, i) =>  <div key={i} className='w-full flex justify-start gap-3 items-center'>
              <input key={i} type="checkbox" name="all" value={!checked[i]} checked={checked[i]}
            onChange={(e)=>setChecked(prev=>{
              prev[i] = !prev[i]
              return [...prev] })} 
              />
              <p className=' text-sm font-normal mb-2'>{locale === 'ar'? el?.arName ||'' : el?.enName || ''}</p>
            </div>
          )
          }
        </div>
        <div className="col-span-4 md:hidden bg-white rounded-md px-4 sm:px-12 py-6 sm:py-12">
          <p className='font-semibold mb-4'>{locale === 'ar' ? categories[index]?.title.ar || "خط التشريح" : categories[index]?.title.en || 'Slicing Line'}</p>
          {categories[index]?.products?.map(
            (el, i) =>  <div key={i} className='w-full flex justify-start gap-3 items-center'>
              <input key={i} type="checkbox" name="all" value={!checked[i]} checked={checked[i]}
            onChange={(e)=>setChecked(prev=>{
              prev[i] = !prev[i]
              return [...prev] })} 
              />
              <p className=' text-sm font-normal mb-2'>{locale === 'ar'? el?.arName ||'' : el?.enName || ''}</p>
            </div>
          )
          }
        </div>
        
        <div className="md:col-span-3 col-span-4 px-4 sm:px-12 py-6 sm:py-12">
          <LittleNav title={categories[index]?.title} locale={locale} />
          <div className="flex flex-col gap-2 sm:gap-4">
            {
              categories[index]?.products?.map(
                (el, i) => <Product
                  key={i}
                  image={imgs[i]||baseUrl+el.productImg?.replace("\\", "/") || productImg}
                  isNew={true}
                  isChecked={!checked[i]}
                  name={locale === 'ar' ? el?.arName || 'الواح صاج ساخن' : el?.enName || 'Hot Metal Sheets'}
                  madeBy={locale === 'ar' ? el?.srcImg?.split('/')[2].split('.')[0] || 'عز الدخيلة' : el?.srcImg?.split('/')[2].split('.')[0] || 'Ezz El-Dkhela'}
                  locale={locale}
                  index={index}
                  element={el}
                />
              )
            }
          </div>
        </div>
      </div>
  </div>
}

export default Products