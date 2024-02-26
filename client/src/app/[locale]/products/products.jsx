"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar.jsx';
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/0.png'
import Product from './product';
import productsData from '@/data/products'
import { lines } from '@/data/lines'
import axios from "axios"
import { Error } from '@/components/toast';
import { useParams } from 'next/navigation'
import { Api, ApiKey } from '@/config/api'
import Button from '@/components/UI/Button'
import FilterIcon from '@/images/filter.svg'


const Products = ({}) => {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json"; 
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const locale = useLocale()
  const params = useParams()
  const baseUrl = Api
  const index = params.index || 0
  const [categories, setCategories] = useState(lines)
  const [checked, setChecked] = useState([true, true, true, true, true, true, true, true])
  const [imgs, setImgs] = useState([])
  const [displayCheckMenu, setDisplayCheckMenu] = useState(false)
  let summition = -1

  useEffect(()=>{
    const getLines = () => {
      // kind of static aboroach but needs a populated version of the categories
      setCategories(lines)
      let arrLength = lines[index]?.products?.length || 0
      setChecked(new Array(arrLength).fill(true))

      ////////////////////////Image Part////////////////////////
        setImgs(new Array(arrLength).fill(productImg))
      lines[index]?.products?.forEach((pro, i)=>{
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
    }
    const getCategory = async () => {
      await axios.get( `${Api}/category` )
      .then(res=>{
        setCategories(res?.data)
        setChecked(new Array(res?.data?.length || 0).fill(true))

      ////////////////////////Image Part////////////////////////
      let productsNumber = 0, sum = 0
      res?.data?.forEach((_)=>_?.products?.forEach(()=>productsNumber++))
      // setImgs(new Array(productsNumber).fill(productImg))
      res?.data?.forEach((_)=>{
        _?.products?.forEach((pro, i)=>{
          let finalImg = productImg;
          if(pro.productImg && pro.productImg !== '' && (pro.productImg instanceof Blob || pro.productImg instanceof File)){
            finalImg = baseUrl + URL.createObjectURL(pro.productImg)
          }else if(pro.productImg && pro.productImg !== ''){
            const sanitizedImg = pro.productImg.replace(/\\/g, "/");
            finalImg = baseUrl + "/" + sanitizedImg
          }
          setImgs(prev=>[...prev, finalImg])
          sum++
        })
        
      })
      }).catch (err=>{
        Error(err.response.data)
      });
    }
    // getLines()
    getCategory();
    return () =>{getCategory()}
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
            {locale === 'ar' ? "منتجاتنا" : "Our Products"}
          </p>
        </div>
      </div>
    </div>
    <div className='relative -mt-8 container bg-[#F9F9F9] rounded-md z-10 flex flex-col'>
      <div className='md:hidden flex flex-row justify-between p-4'>
        <p>{locale==='ar' ? "فرز حسب":"Filter By"}</p>
        <Button onClick={()=>{setDisplayCheckMenu(!displayCheckMenu)}} className='sm:px-8 sm:py-4'>
          <div className="flex flex-row items-center gap-2">
            <Image src={FilterIcon} width={10} height={10} />
            <span className='inline-block'> {locale==='ar' ? "فرز حسب":"Filter By"} </span>
          </div>
        </Button>
      </div>
      <div className={`${displayCheckMenu ? '' : 'hidden'} bg-[#EBEBEB] rounded-md px-4 sm:px-12 py-6 sm:py-12`}>
          <p className='font-semibold mb-4'>{locale === 'ar' ?"خطوط انتاجنا" : "Our Lines"}</p>
          {categories?.map((_, i)=>{
            return <div key={i} className='w-full flex justify-start gap-3 items-center'>
              <input key={i} type="checkbox" name="all" value={!checked[i]} checked={checked[i]}
              onChange={(e)=>setChecked(prev=>{ prev[i] = !prev[i]; return [...prev] })} />
              <p className=' text-sm font-normal mb-2'>{locale === 'ar'? _?.title?.ar ||'' : _?.title?.en || ''}</p>
            </div>
          })}
        </div>
      <div className="grid grid-cols-4 max-md:grid-cols-1">
        <div className={`hidden md:block md:col-span-1 bg-white rounded-md px-4 sm:px-12 py-6 sm:py-12`}>
          <p className='font-semibold mb-4'>{locale === 'ar' ?"خطوط انتاجنا" : "Our Lines"}</p>
          {categories?.map((_, i)=>{
            return <div key={i} className='w-full flex justify-start gap-3 items-center'>
              <input key={i} type="checkbox" name="all" value={!checked[i]} checked={checked[i]}
              onChange={(e)=>setChecked(prev=>{ prev[i] = !prev[i]; return [...prev] })} />
              <p className=' text-sm font-normal mb-2'>{locale === 'ar'? _?.title?.ar ||'' : _?.title?.en || ''}</p>
            </div>
          })}
        </div>
        {/* <div className="col-span-4 md:hidden bg-white rounded-md px-4 sm:px-12 py-6 sm:py-12">
          <p className='font-semibold mb-4'>{locale === 'ar' ? "خطوط انتاجنا" : "Our Lines"}</p>
          {categories?.forEach((_, j)=>{
            _?.products?.map((el, i)=>{
              return <div key={i} className='w-full flex justify-start gap-3 items-center'>
              <input key={i} type="checkbox" name="all" value={!checked[i]} checked={checked[i]}
              onChange={(e)=>setChecked(prev=>{ prev[i] = !prev[i]; return [...prev] })} />
              <p className=' text-sm font-normal mb-2'>{locale === 'ar'? el?.arName ||'' : el?.enName || ''}</p>
            </div>
            })
          })}
        </div> */}
        
        <div className="md:col-span-3 col-span-4 px-4 sm:px-12 py-6 sm:py-12">
          <div className="flex flex-col gap-2 sm:gap-4">
            {categories.map((_, j)=>{
              return _?.products?.map((el, i)=>{
                summition++
                return <Product
                key={i}
                image={imgs[summition]||baseUrl+el.productImg?.replace("\\", "/") || productImg}
                isNew={true}
                isChecked={!checked[j]}
                name={locale === 'ar' ? el?.arName || 'الواح صاج ساخن' : el?.enName || 'Hot Metal Sheets'}
                madeBy={locale === 'ar' ? el?.srcImg?.split('/')[2].split('.')[0] || 'عز الدخيلة' : el?.srcImg?.split('/')[2].split('.')[0] || 'Ezz El-Dkhela'}
                locale={locale}
                index
                element={el}
              />
              })
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Products