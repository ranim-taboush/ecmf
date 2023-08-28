"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {BsTriangleFill} from "react-icons/bs"
import { IconContext } from "react-icons";
import adminBg from '@/images/admin-products-page.jpg'
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'
import kandil from '@/images/agent1.png'
import egyptian from '@/images/agent2.png'
import elola from '@/images/agent3.png'
import agis from '@/images/agent4.png'
import ezdk from '@/images/agent5.png'
import axios from "axios"
import { Success, Error } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'


const Form = ({ }) => {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  // axios.defaults.headers['Access-Control-Allow-Origin'] ="*";
  axios.defaults.withCredentials = true;
  const locale = useLocale();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const agents = [{im: kandil, src: '/images/agent1.png'}, {im: egyptian, src: '/images/agent2.png'}, 
  {im: elola, src: '/images/agent3.png'}, {im: agis, src:'/images/agent4.png'}, {im: ezdk, src: '/images/agent5.png'}]
  const [data, setData] = useState({category: "Slicing Line", arName: '', enName: '', price: '',
  thickness: {from: '', to: '', arUnit: '', enUnit: ''}, length: '', thicknessList: [], lengthList: [], 
  srcImg: agents[0].src, productImg: ''})
  const [choosenImg, setChooosenImg] = useState(agents[0].im)
  const [categories, setCategories] = useState([])
  const [openImg, setOpenImg] = useState(false)
  const [image, setImage] = useState( null )
  const [id, setId] = useState(null)

  const langEn = {
    "title": "New Product",
    "line": "Product Line",
    "nameAr": "Arabic Product Name",
    "nameEn": "English Product Name",
    "price": "Product's Price",
    "thickness": "Product Thickness",
    "from": "from Ex: 0.3",
    "to": "to Ex: 4",
    "unitAr": "Arabic Unit Ex: مم",
    "unitEn": "Englush Unit Ex: mm",
    "length": "Product Width",
    "thicknessList": "Product Available Thickness",
    "lengthList": "Product Avaliable Lengths",
    "srcImg": "Product Source",
    "placeholder": "Enter ",
    "thicknessListPlaceholder": "Enter Available Thickness Number Seperated With ',' Ex: 0.3, 0.5, 2",
    "lengthListPlaceholder": "Enter Available Widths Number Seperated With ',' Ex: 0.3, 0.5, 2",
    "productImg": "Product Image",
    "submit": "Add"
  }
  const langAr = {
    "title": "منتج جديد",
    "line": "خط المنتج",
    "nameAr": "اسم المنتج بالعربي",
    "nameEn": "اسم المنتج بالانكليزي",
    "price": "سعر المنتج",
    "thickness": "سمك المنتج",
    "from": "من",
    "to": "إلى",
    "unitAr": "الوحدة بالعربي",
    "unitEn": "الوحدة بالانكليزي",
    "length": "عرض المنتج",
    "thicknessList": "السماكة المتوفرة للمنتج",
    "lengthList": "الاطوال المتوفرة للمنتج",
    "srcImg": "مصدر المنتج",
    "placeholder": "ادخل ",
    "lengthListPlaceholder": "ادخل العروض المتاح للمنتج بينهم ',' مثال: 0.3, 0.5, 2",
    "thicknessListPlaceholder": "ادخل السمك المتاح للمنتج بينهم ',' مثال: 0.3, 0.5, 2",
    "productImg": "صورة المنتج",
    "submit": "اضف"
  }

  useEffect(()=>{
    if(localStorage.getItem('token')) setIsLoggedIn(true)

    const getCategory = async () => {
      try {
        const res = await axios.get( `${Api}/category` );
        const catName = res.data?.map(val=> val.title)
        setCategories(catName)

      } catch (err) {
        Error('Fetch failed')
      }
    };
    getCategory();
  }, [])

  const addNewProduct = ()  =>{
    setData({category: "Slicing Line", arName: '', enName: '', price: '',
    thickness: {from: '', to: '', arUnit: '', enUnit: ''}, length: '', thicknessList: [], lengthList: [], 
    srcImg: agents[0].src, productImg: ''})
    setChooosenImg(agents[0].im)
    setOpenImg(false)
    setImage( null )
    setId(null)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const postCategory = async () => {
      try {
        const res = await axios.post(
          `${Api}/product`,
          {...data,
            thicknessList: data.thicknessList?.map(v=>v.trim()).filter(n=>n) || '', 
            lengthList: data.lengthList?.map(v=>v.trim()).filter(n=>n) || ''},
            { headers:{ "access-token": `${localStorage.getItem('token')}` } }
        );
        Success('success')
        Success('Product Added')
        setId(res.data?._id)
        setData({category: "Slicing Line", arName: '', enName: '', price: '',
        thickness: {from: '', to: '', arUnit: '', enUnit: ''}, length: '', thicknessList: [], lengthList: [], srcImg: agents[0].src})

      } catch (err) {
        Error('Product Add failed '+ err.message)
      }
    };
    postCategory();
  }

  const handleChange = (e, name, rest) => {
    let value
    if(name === "srcImg"){
      setData(prev=>{
        return { ...prev, [name]: rest}
      })
    }
    else if (name !== "thicknessList" && name !== "lengthList" && name != "thickness"){ //general
      value = e.target?.value
      setData(prev=>{
        return { ...prev, [name]: value}
      })
    }else{
      if(name != "thickness"){ //list
      value = e.target?.value?.split(",")
      setData(prev=>{
        return { ...prev, [name]: value }
      })
      }else{ //obj
        value = e.target?.value
        setData(prev=>{
          return { ...prev, [name]: {...prev[name], [rest]: value}}
        })
      }
    }
  }

  const handleImageUpload = (e) =>{
    const uploadImg = async () => {
      setImage(e.target.files[0])
      const formData = new FormData();
      formData.append(
        "image",
        e.target.files[0],
        e.target.files[0].name
      );
      try {
        const res = await axios.patch(
          `${Api}/upload/product/${id}`,
          formData,
          {headers: { accesstoken: localStorage.getItem('token') }}
        );
        Success(locale === 'ar'?'تم رفع الصورة': 'Image Uploaded Successfully')
        if(e?.target?.files && e?.target?.files[0]){ e.target.value = null}

      } catch (err) {
        Error(locale ==='ar'? 'فشل رفع الصورة': 'Image Upload failed', err.message)
      }
    };

    if(id) uploadImg();
    else Error('You need to add the product first')
  }

  return <div className="relative mt-4 sm:mt-8 rounded-md overflow-hidden">
    <div className="absolute inset-0 ">
      <Image src={adminBg} alt={locale === 'ar' ? langAr.title : langEn.title} width={adminBg.width} height={adminBg.height} className='w-full h-full rounded-xl blur-md' />
    </div>
  {
    isLoggedIn
    ?<form onSubmit={(e) => handleSubmit(e)}>
    <div className="relative h-full grid sm:grid-cols-2 items-start">
      <div className="py-12 sm:py-24 px-8 sm:px-16">
        <p className='text-xl sm:text-3xl text-white'>
          {locale === 'ar' ? langAr.title : langEn.title}
        </p>
        <div className={id ? "hidden" : "flex flex-col gap-6 mt-4"}>
          <Input required label={locale === 'ar' ? langAr.nameEn : langEn.nameEn} name='nameEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.nameEn : langEn.nameEn)} value={data.enName} 
          onChange={(e)=>{ handleChange(e, 'enName')} } />
          <Input required label={locale === 'ar' ? langAr.nameAr : langEn.nameAr} name='nameAr' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.nameAr : langEn.nameAr)} value={data.arName} 
          onChange={(e)=>{ handleChange(e, 'arName')} } />
          <Input required label={locale === 'ar' ? langAr.price : langEn.price} name='price' type='number'
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.price : langEn.price)} value={data.price} 
          onChange={(e)=>{ handleChange(e, 'price')} } />
          <div className="">
            <label htmlFor="category" className='text-white text-base sm:text-lg font-light px-1'>
                {locale === 'ar' ? langAr.line : langEn.line}
            </label>
            
            <div>
                <div className='flex items-center justify-evenly bg-transparent border border-white rounded-md px-4 py-2 w-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-white duration-300' 
                onClick={()=>{setOpenImg(!openImg);}}>
                    <IconContext.Provider value={ openImg?{color: '#fff', size: ".5em"} :{color: '#fff', size: ".5em", className:"rotate-180"}}>
                        <div> <BsTriangleFill /> </div>
                    </IconContext.Provider>
                    <Image src={choosenImg} alt={locale === 'ar' ? langAr.srcImg : langEn.srcImg} width={ezdk.width} height={55} className='rounded-xl' />
                </div>
                <div className={ openImg? "mt-1" : "hidden"}>
                    {
                    agents?.map((agent, i) =>{
                      return <div  key={i}className='flex items-center justify-evenly bg-transparent border border-white rounded-md px-4 py-2 w-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-white duration-300'
                      onClick={(e) => {handleChange(e, 'srcImg', agent.src); setOpenImg(!openImg); setChooosenImg(agent.im);}}>
                          <Image src={agent.im} alt={locale === 'ar' ? langAr.srcImg : langEn.srcImg} width={ezdk.width} height={55} className='p-2'/>
                      </div>
                      }
                    )}
                </div>
            </div>
          </div>
          <Button type='submit' className='w-fit px-6 hidden md:block'> {locale === 'ar' ? langAr.submit : langEn.submit} </Button>
        </div>
        <div className={!id? "hidden": "flex flex-col gap-6"}>
          <Input label={locale === 'ar'? langAr.categoryImg: langEn.categoryImg} name='image' type="file"
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.categoryImg : langEn.categoryImg)} 
          onChange={ handleImageUpload } />
        </div>
        <div className={image? '': 'hidden'}>
          <Button className='w-fit px-6' onClick={addNewProduct}>{locale === 'ar'? "اضف منتجاً آخر": "Add Another Product"}</Button>
        </div>

      </div>
      <div className="py-12 sm:py-24 px-8 sm:px-16 mt-14">
        <div className={id? "hidden": "flex flex-col gap-6"}>
          
          <div className="">
            <label htmlFor="category" className='text-white text-base sm:text-lg font-light px-1'>
                {locale === 'ar' ? langAr.line : langEn.line}
            </label>
            <select onChange={(e) => handleChange(e, 'category')}
            name="category" id="select-data" className='bg-transparent border border-white rounded-md px-4 py-2 w-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500 text-white duration-300' 
            defaultValue={data.category} value={data.category}>
                {categories?.map((cat, i) =>
                    <option key={i} className='bg-black' value={ locale === 'ar' ? cat.ar: cat.en }>{ locale === 'ar' ? cat.ar: cat.en }</option>
                )}
            </select>
          </div>
          
          <Input required label={locale === 'ar' ? langAr.length : langEn.length} name='length' style={{maxWidth: "97%"}}
              placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.length : langEn.length)} value={data.length || ''} 
              onChange={(e)=>{ handleChange(e,'length')} } />
          <div className="grid grid-cols-2 item-center justify-between">
            <Input required label={locale === 'ar' ? langAr.thickness : langEn.thickness} name='from' style={{maxWidth: "97%"}}
              placeholder={(locale === 'ar' ? langAr.from : langEn.from)} value={data.thickness?.from || ''} 
              onChange={(e)=>{ handleChange(e,'thickness', 'from')} } />
            <Input required name='to' label={'  '} style={{maxWidth: "97%"}}
              placeholder={(locale === 'ar' ? langAr.to : langEn.to)} value={data.thickness?.to || ''} 
              onChange={(e)=>{ handleChange(e,'thickness', 'to')} } />
          </div>
          <div className="grid grid-cols-2 item-center justify-between">
            <Input required name='arUnit' className="mr-2" style={{maxWidth: "97%"}}  
              placeholder={(locale === 'ar' ? langAr.unitAr : langEn.unitAr)} value={data.thickness?.arUnit || ''} 
              onChange={(e)=>{ handleChange(e,'thickness', 'arUnit')} } />
            <Input required name='enUnit'  style={{maxWidth: "97%"}}
              placeholder={(locale === 'ar' ? langAr.unitEn : langEn.unitEn)} value={data.thickness?.enUnit || ''} 
              onChange={(e)=>{ handleChange(e,'thickness', 'enUnit')} } />
          </div>
          <Input required label={locale === 'ar' ? langAr.thicknessList : langEn.thicknessList} name='thicknessList' 
          placeholder={(locale === 'ar' ? langAr.thicknessListPlaceholder : langEn.thicknessListPlaceholder)} value={data.thicknessList || ''}
          onChange={(e)=>{ handleChange(e, 'thicknessList') }} />
          <Input required label={locale === 'ar' ? langAr.lengthList : langEn.lengthList} name='lengthList' 
          placeholder={(locale === 'ar' ? langAr.lengthListPlaceholder : langEn.lengthListPlaceholder)} value={data.lengthList || ''}
          onChange={(e)=>{ handleChange(e, 'lengthList') }} />
          <Button type='submit' className='w-fit px-6 md:hidden'> {locale === 'ar' ? langAr.submit : langEn.submit} </Button>
        </div>
      </div>
    </div>
    </form>
    :<div className="h-full w-full flex items-center justify-center text-red-400 font-bold text-2xl p-6 md:p-12"> 
      <p className='z-10'>{locale === "ar"? "يرجى تسجيل الدخول للاستمرار":"Please Login First"}</p>
     </div>
    }
  </div>
}

export default Form