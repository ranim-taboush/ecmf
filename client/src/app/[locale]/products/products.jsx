"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/product_test.png'
import Product from './product';
import axios from "axios"
import { Error } from '@/components/toast';

const Products = () => {
  const locale = useLocale()
  const [categories, setCategories] = useState({})

  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `http://localhost:5000/category` )
      .then(res=>{
        setCategories(res?.data)
      }).catch (err=>{
        Error('Error While Loading Data')});
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
            {locale === 'ar' ? categories[0]?.title?.ar||'الواح صاج ساخن' : categories[0]?.title?.en || 'Hot Metal Sheets'}
          </p>
          {console.log(categories)}
        </div>
      </div>
    </div>
        
    <div className="relative -mt-8 container bg-[#F9F9F9] rounded-md px-4 sm:px-12 py-6 sm:py-12 z-10">

      <div className="flex flex-col gap-2 sm:gap-4">
        {
          categories[0]?.products?.map(
            (el, i) => <Product
              key={i}
              image={productImg}
              isNew={true}
              name={locale === 'ar' ? el?.arName || 'الواح صاج ساخن' : el?.enName || 'Hot Metal Sheets'}
              madeBy={locale === 'ar' ? el?.srcImg?.split('/')[2].split('.')[0] || 'عز الدخيلة' : el?.srcImg?.split('/')[2].split('.')[0] || 'Ezz El-Dkhela'}
              price={el.price || 0}
              locale={locale}
              element={el}
            />
          )
        }
      </div>

    </div>
  </div>
}

export default Products