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
  axios.defaults.headers['content-type'] = "application/json";
  axios.defaults.headers['Access-Control-Allow-Origin'] = "*"; 
  axios.defaults.withCredentials = true;
  const { push } = useRouter();
  const locale = useLocale();
  const [data, setData] = useState({username: '', password: ''})

  useEffect(()=>{
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
    }
  }, [])
  
  const langEn = {
    "title": "Admin Login",
    "username": "User Name",
    "password": "Password",
    "usernamePlaceholder": "Enter The Admin Username",
    "passwordPlaceholder": "Enter The Password",
    "submit": "Login"
  }
  const langAr = {
    "title": "دخول الأدمن",
    "username": "اسم المستخدم",
    "password": "كلمة السر",
    "usernamePlaceholder": "ادخل اسم المستخدم",
    "passwordPlaceholder": "ادخل كلمة السر",
    "submit": "تسجيل الدخول"
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const postCategory = async () => {
      try {
        const res = await axios.post(
          `${Api}/login`,
          {...data},
        );
        localStorage.setItem('token', res?.data?.tokens[ res?.data?.tokens?.length-1 || [0]])
        Success(locale === 'ar'?'تم تسجيل الدخول':'login success')
        Success(locale === 'ar'? 'يرجى الانتظار ريثما يتم تحويلك لصفحة اضافة المنتجات':'Please Wait While Redirecting to Add Product Page...')
        push('/admin/add-product');
      } catch (err) {
        Error(locale === 'ar'? 'فشل تسجيل الدخول':'login failed'+ err.message)
        Error(locale === 'ar'? "يرجى التحقق من اسم المستخدم وكلمة المرور": "Please Check Username & Password")
      }
    };
    postCategory();
  }

  const handleChange = (e, name) => {
    let value = e.target.value
    setData(prev=>{
      return { ...prev, [name]: value }
    })
  }
  return <div className="relative mt-4 sm:mt-8 rounded-md overflow-hidden">

    <div className="absolute inset-0 ">
      <Image src={adminBg} alt={locale === 'ar' ? langAr.title : langEn.title} width={adminBg.width} height={adminBg.height} className='w-full h-full rounded-xl blur-md' />
    </div>
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="relative h-full grid items-center">
        <div className="py-12 sm:py-24 px-8 sm:px-16">
          <div className="flex flex-col gap-6 mt-4 max-w-lg mx-auto">
            <p className='text-xl sm:text-3xl text-white'>
              {locale === 'ar' ? langAr.title : langEn.title}
            </p>
            <Input required label={locale === 'ar' ? langAr.username : langEn.username} name='username' 
            placeholder={(locale === 'ar' ? langAr.usernamePlaceholder : langEn.usernamePlaceholder)} value={data.username}
            onChange={(e)=>{ handleChange(e, 'username') }} />
            <Input required label={locale === 'ar' ? langAr.password : langEn.password} name='password' 
            placeholder={(locale === 'ar' ? langAr.passwordPlaceholder : langEn.passwordPlaceholder)} value={data.password}
            type="password"
            onChange={(e)=>{ handleChange(e, 'password') }} />
            <Button type='submit' className='w-fit px-6'> {locale === 'ar' ? langAr.submit : langEn.submit} </Button>
          </div>

        </div>
      </div>
    </form>
  </div>
}

export default Form