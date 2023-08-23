"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/product_test.png'
import Product from './product';
import LittleNav from './littleNav'
import axios from "axios"
import { Error } from '@/components/toast';
import { useParams } from 'next/navigation'

const Products = ({}) => {
  const locale = useLocale()
  const params = useParams()
  const index = params.index || 0
  const [categories, setCategories] = useState({})
  const [checked, setChecked] = useState([true])

  useEffect(()=>{
    const getCategory = async () => {
      await axios.get( `http://localhost:5000/category` )
      .then(res=>{
        setCategories(res?.data)
        let arrLength = res?.data[index]?.products?.length || 0
        setChecked(new Array(arrLength).fill(true))
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
                  image={productImg}
                  isNew={true}
                  isChecked={!checked[i]}
                  name={locale === 'ar' ? el?.arName || 'الواح صاج ساخن' : el?.enName || 'Hot Metal Sheets'}
                  madeBy={locale === 'ar' ? el?.srcImg?.split('/')[2].split('.')[index] || 'عز الدخيلة' : el?.srcImg?.split('/')[2].split('.')[index] || 'Ezz El-Dkhela'}
                  price={el.price || 0}
                  locale={locale}
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