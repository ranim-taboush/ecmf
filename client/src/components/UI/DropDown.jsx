"use client"
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Error, Success } from '@/components/toast';
import Link from 'next/link';

const DropDown = ({ name, locale  }) => {
    const baseUrl = "http://localhost:5000/"
    const [categoriesName, setCategoriesName] = useState([{ar: "خط التشريح", en:"Slicing Line"}])
    const [productsName, setProductsName] = useState([{ar: "الايكون", en:"Icon", category: "0"}])
    
useEffect(()=>{
    const getProducts = async () => {
      await axios.get( `${baseUrl}products/en` )
      .then(res=>{ 
        setProductsName(res?.data?.map((pro, i)=>{
            return {ar: pro?.arName || "الايكون", en: pro?.enName || "Icon", id: pro?._id, cat: pro?.category }
        }))
      }).catch (err=>{ console.log('Error While Loading Data') });
    }
    const getCategories = async () => {
      await axios.get( `${baseUrl}category` )
      .then(res=>{ 
        setCategoriesName(res?.data?.map((cat, i)=>{
            return {ar: cat?.title?.ar || "خط التشريح", en: cat?.title?.en || "Slicing Line", id: cat?._id }
        }))
      }).catch (err=>{ console.log('Error While Loading Data') });
    }
    getCategories()
    getProducts()
  }, [])
  return <div className={"absolute top-6 left-0 right-0 bg-white text-black rounded-md p-2 w-max max-h-48 overflow-y-scroll hidden scrollbar dropdown"}>
    {name === "products"
    ?productsName.map((_, i)=>
    <Link key={i} href={`/0/products/${_.id}`} className='w-full block border-b-2 p-1 hover:bg-gray-200 '>{locale === 'ar'? _.ar : _.en}</Link>
    )
    :categoriesName.map((_, i)=>
    <Link key={i} href="/lines" className='w-full block border-b-2 p-1 hover:bg-gray-200 '>{locale === 'ar'? _.ar : _.en}</Link>
    )
    }
  </div >
}

export default DropDown