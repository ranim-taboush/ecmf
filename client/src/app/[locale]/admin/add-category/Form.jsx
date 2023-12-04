"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import adminBg from '@/images/admin-page-bg.jpg'
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'
import axios from "axios"
import { Error, Success } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'

const Form = ({ }) => {
  axios.defaults.headers['api-key'] = ApiKey;
  // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
  axios.defaults.withCredentials = true;
  const locale = useLocale();
  const router = useRouter();
  const [data, setData] = useState({title: {en: '', ar: ''}, machine: {en: '', ar: ''}, 
    description: {en: '', ar: ''}, subtitle: {en: '', ar: ''},
    subDescription: {en: '', ar: ''}, productsTitle: [{en: '', ar: ''}], usedIn: [{en: '', ar: ''}]})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [image, setImage] = useState( null )
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState( false )

  const langEn = {
    "title": "New Line",
    "titleAr": "Arabic Title",
    "titleEn": "English Title",
    "machineAr": "Arabic Machine Name",
    "machineEn": "English Machine Name",
    "descriptionAr": "Arabic Description",
    "descriptionEn": "English Description",
    "subtitleAr": "Arabic Subtitle",
    "subtitleEn": "English Subtitle",
    "subDescriptioneAr": "Arabic SubDescription",
    "subDescriptioneEn": "English SubDescription",
    "productsTitleAr": "Arabic Products Title List",
    "productsTitleEn": "English Products Title List",
    "usedInAr": "Arabic Used In List",
    "usedInEn": "English Used In List",
    "placeholder": "Enter The ",
    "productsTitlePlaceholderAr": "Arabic products name list seperated by ',' Ex: Icon, Cans",
    "productsTitlePlaceholderEn": "English products name list seperated by ',' Ex: Icon, Cans",
    "usedInPlaceholderAr": "Arabic used in list seperated by ',' Ex: Armored doors, home appliances",
    "usedInPlaceholderEn": "English used in list seperated by ',' Ex: Armored doors, home appliances",
    "categoryImg": "Line Image",
    "submit": "Add"
  }
  const langAr = {
    "title": "خط جديد",
    "titleAr": "العنوان بالعربي",
    "titleEn": "العنوان بالانكليزي",
    "machineAr": "اسم الآلة بالعربي",
    "machineEn": "اسم الآلة بالانكليزي",
    "descriptionAr": "الوصف بالعربي",
    "descriptionEn": "الوصف بالانكليزي",
    "subtitleAr": "العنوان الفرعي بالعربي",
    "subtitleEn": "العنوان الفرعي بالانكليزي",
    "subDescriptioneAr": "الوصف الفرعي بالعربي",
    "subDescriptioneEn": "الوصف الفرعي بالانكليزي",
    "productsTitleAr": "عنوان المنتجات بالعربي",
    "productsTitleEn": "عنوان المنتجات بالانكليزي",
    "usedInAr": "الصناعات المغذية بالعربي",
    "usedInEn": "الصناعات المغذية بالانكليزي",
    "placeholder": "ادخل ",
    "productsTitlePlaceholderAr": "اسماء المنتجات بالعربي بينها ',' مثال: الايكون, العلب",
    "productsTitlePlaceholderEn": "اسماء المنتجات بالانكليزي بينها ',' مثال: الايكون, العلب",
    "usedInPlaceholderAr": "الصناعات المغذية بالعربي بينها ',' مثال: ابواب مصفحة, الأجهزة المنزلية",
    "usedInPlaceholderEn": "الصناعات المغذية بالانكليزي بينها ',' مثال: ابواب مصفحة, الأجهزة المنزلية",
    "categoryImg": "صورة الخط",
    "submit": "اضف"
  }

  useEffect(()=>{
    if(localStorage.getItem('token')) setIsLoggedIn(true)
  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true)

    const postCategory = async () => {
      try {
        const res = await axios.post(
          `${Api}/category`,
          {...data,
          productsTitle: {ar: data.productsTitle?.ar?.map(v=>v.trim()).filter(n=>n) || '', en: data.productsTitle?.en?.map(v=>v.trim()).filter(n=>n) || ''}, 
          usedIn: {ar: data.usedIn?.ar?.map(v=>v.trim()).filter(n=>n) || '', en: data.usedIn?.en?.map(v=>v.trim()).filter(n=>n) || ''}},
          { headers:{ "accessToken": `${localStorage.getItem('token')}`, 'content-type': "application/json" } }
        );
        Success('success')
        Success('Category Added')
        setId(res.data?._id)
        setData({title: {en: '', ar: ''}, machine: {en: '', ar: ''}, 
        description: {en: '', ar: ''}, subtitle: {en: '', ar: ''}, 
        subDescription: {en: '', ar: ''}, productsTitle: [{en: '', ar: ''}], usedIn: [{en: '', ar: ''}]})

      } catch (err) {
        Error('Category Adding failed', err.message)
      }
      setLoading(false)
    };
    postCategory();
  }

  const handleChange = (e, name, lang) => {
    let value
    if (name !== "productsTitle" && name !== "usedIn"){
      value = e.target.value
    }else{
      value = e.target.value.split(",")
    }
    setData(prev=>{ return { ...prev, [name]: { ...prev[name], [lang]: value } } })
  }

  const AddNewLine = ()  =>{
    setImage(null)
    setId(null)
    setLoading(false)
    setData({title: {en: '', ar: ''}, machine: {en: '', ar: ''}, 
      description: {en: '', ar: ''}, subtitle: {en: '', ar: ''},
      subDescription: {en: '', ar: ''}, productsTitle: [{en: '', ar: ''}], usedIn: [{en: '', ar: ''}]})
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
          `${Api}/upload/category/${id}`,
          formData,
          {headers: { "accesstoken": localStorage.getItem('token'), 'content-type': "multipart/form-data" }}
        );
        Success(locale === 'ar'?'تم رفع الصورة': 'Image Uploaded Successfully')
        if(e?.target?.files && e?.target?.files[0]){ e.target.value = null}

      } catch (err) {
        Error(locale ==='ar'? 'فشل رفع الصورة': 'Image Upload failed', err.message)
      }
    };

    if(id) uploadImg();
    else Error('You need to add the category first')
  }

  return <div className="relative mt-4 md:mt-8 rounded-md overflow-hidden">

    <div className="absolute inset-0 ">
      <Image src={adminBg} alt={locale === 'ar' ? langAr.title : langEn.title} width={adminBg.width} height={adminBg.height} className='w-full h-full rounded-xl blur-md' />
    </div>
  {isLoggedIn
  ?<form >
    <div className="relative h-full grid md:grid-cols-2 items-start">
      <div className="py-12 md:py-24 px-8 md:px-16">
        <p className='text-xl md:text-3xl text-white'>
          {locale === 'ar' ? langAr.title : langEn.title}
        </p>
        <div className={id ? "hidden" : "flex flex-col gap-6 mt-4"}>
          <Input required label={locale === 'ar' ? langAr.titleEn : langEn.titleEn} name='titleEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.title : langEn.title)} value={data.title.en} 
          onChange={(e)=>{ handleChange(e, 'title', 'en')} } />
          <Input required label={locale === 'ar' ? langAr.machineEn : langEn.machineEn} name='machineEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.machineEn : langEn.machineEn)} value={data.machine.en}
          onChange={(e)=>{handleChange(e, 'machine', 'en')}} />
          <Input required label={locale === 'ar' ? langAr.descriptionEn : langEn.descriptionEn} name='descriptionEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.descriptionEn : langEn.descriptionEn)} value={data.description.en}
          onChange={(e)=>{ handleChange(e, 'description', 'en') }} />
          <Input required label={locale === 'ar' ? langAr.subtitleEn : langEn.subtitleEn} name='subtitleEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.subtitleEn : langEn.subtitleEn)} value={data.subtitle.en}
          onChange={(e)=>{ handleChange(e, 'subtitle', 'en') }} />
          <Input required label={locale === 'ar' ? langAr.subDescriptioneEn : langEn.subDescriptioneEn} name='subDescriptioneEn' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.subDescriptioneEn : langEn.subDescriptioneEn)} value={data.subDescription.en}
          onChange={(e)=>{ handleChange(e, 'subDescription', 'en') }} />
          <Input required label={locale === 'ar' ? langAr.productsTitleEn : langEn.productsTitleEn} name='productsTitleEn' 
          placeholder={(locale === 'ar' ? langAr.productsTitlePlaceholderEn : langEn.productsTitlePlaceholderEn)} value={data.productsTitle?.en || ''}
          onChange={(e)=>{ handleChange(e, 'productsTitle', 'en') }} />
          <Input required label={locale === 'ar' ? langAr.usedInEn : langEn.usedInEn} name='usedInEn' 
          placeholder={(locale === 'ar' ? langAr.usedInPlaceholderEn : langEn.usedInPlaceholderEn)} value={data.usedIn?.en || ''}
          onChange={(e)=>{ handleChange(e, 'usedIn', 'en') }} />
          <Button onClick={(e) => handleSubmit(e)} isLoading={loading} type='submit' className='w-fit px-6 hidden md:block'> {locale === 'ar' ? langAr.submit : langEn.submit} </Button>
        </div>
        <div className={!id? "hidden": "flex flex-col gap-6"}>
          <Input label={locale === 'ar'? langAr.categoryImg: langEn.categoryImg} name='image' type="file"
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.categoryImg : langEn.categoryImg)} 
          onChange={ handleImageUpload } />
        </div>
        <div className={image? '': 'hidden'}>
          <Button className='w-fit px-6' onClick={AddNewLine}>{locale === 'ar'? "اضف خطاً آخر": "Add Another Line"}</Button>
        </div>

      </div>
      <div className="py-12 md:py-24 px-8 md:px-16 mt-14">
        <div className={id? "hidden": "flex flex-col gap-6"}>

          <Input required label={locale === 'ar' ? langAr.titleAr : langEn.titleAr} name='titleAr'
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.titleAr : langEn.titleAr)} value = {data.title.ar}
          onChange={(e)=>{handleChange(e, 'title', 'ar')}} />
          <Input required label={locale === 'ar' ? langAr.machineAr : langEn.machineAr} name='machineAr' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.machineAr : langEn.machineAr)} value = {data.machine.ar}
          onChange={(e)=>{handleChange(e, 'machine', 'ar')}}/>
          <Input required label={locale === 'ar' ? langAr.descriptionAr : langEn.descriptionAr} name='descriptionAr' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.descriptionAr : langEn.descriptionAr)} value = {data.description.ar}
          onChange={(e)=>{handleChange(e, 'description', 'ar')}}/>
          <Input required label={locale === 'ar' ? langAr.subtitleAr : langEn.subtitleAr} name='subtitleAr' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.subtitleAr : langEn.subtitleAr)} value = {data.subtitle.ar}
          onChange={(e)=>{handleChange(e, 'subtitle', 'ar')}}/>
          <Input required label={locale === 'ar' ? langAr.subDescriptioneAr : langEn.subDescriptioneAr} name='subDescriptioneAr' 
          placeholder={(locale === 'ar' ? langAr.placeholder : langEn.placeholder) + (locale === 'ar' ? langAr.subDescriptioneAr : langEn.subDescriptioneAr)} value = {data.subDescription.ar}
          onChange={(e)=>{handleChange(e, 'subDescription', 'ar')}}/>
          <Input required label={locale === 'ar' ? langAr.productsTitleAr : langEn.productsTitleAr} name='productsTitleAr' 
          placeholder={(locale === 'ar' ? langAr.productsTitlePlaceholderAr : langEn.productsTitlePlaceholderAr)} value = {data.productsTitle?.ar || ''}
          onChange={(e)=>{handleChange(e, 'productsTitle', 'ar')}}/>
          <Input required label={locale === 'ar' ? langAr.usedInAr : langEn.usedInAr} name='usedInAr' 
          placeholder={(locale === 'ar' ? langAr.usedInPlaceholderAr : langEn.usedInPlaceholderAr)} value={data.usedIn?.ar || ''}
          onChange={(e)=>{ handleChange(e, 'usedIn', 'ar') }} />
          <Button onClick={(e) => handleSubmit(e)} isLoading={loading} type='submit' className='w-fit px-6 md:hidden'> {locale === 'ar' ? langAr.submit : langEn.submit} </Button>
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