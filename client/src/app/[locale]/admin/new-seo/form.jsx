"use client"
import { useState, useEffect } from 'react'
import adminBg from '@/images/admin-products-page.jpg'
import Image from 'next/image'
import { Success, Error } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'
import axios from 'axios';
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const Form = ({ }) => {
    axios.defaults.headers['api-key'] = ApiKey;
    axios.defaults.headers['content-type'] = "application/json";
    // axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axios.defaults.withCredentials = true;
    const { push } = useRouter();
    const locale = useLocale();
    const [data, setData] = useState({username: '', password: ''})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
    useEffect(()=>{
        if(typeof localStorage.getItem('token') === 'string') setIsLoggedIn(true)
        else if(localStorage.getItem('token')) localStorage.removeItem('token')
    }, [])
    
    const langEn = {
      "title": "Add New Admin",
      "username": "User Name",
      "password": "Password",
      "usernamePlaceholder": "Enter The Admin Username",
      "passwordPlaceholder": "Enter The Password",
      "submit": "Register"
    }
    const langAr = {
      "title": "اضف ادمن جديد",
      "username": "اسم المستخدم",
      "password": "كلمة السر",
      "usernamePlaceholder": "ادخل اسم المستخدم",
      "passwordPlaceholder": "ادخل كلمة السر",
      "submit": "التسجيل"
    }
  
    const handleSubmit = (e) =>{
      e.preventDefault();
  
      const postCategory = async () => {
        try {
          const res = await axios.post(
            `${Api}/seo/signup`,
            {...data},
            { headers:{ "accessToken": `${localStorage.getItem('token')}` } }
          );
          Success(locale === 'ar'?'تم اضافة ادمن جديد':'Admin added success')
          // push('/admin/add-product');
        } catch (err) {
          Error(locale === 'ar'? 'فشل التسجيل':'register failed')
          Error(err.response.data)
          // Error(locale === 'ar'? "يرجى التحقق من اسم المستخدم وكلمة المرور": "Please Check Username & Password")
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
  {
    isLoggedIn
    ?
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
    :<div className="h-full w-full flex items-center justify-center text-red-400 font-bold text-2xl p-6 md:p-12"> 
      <p className='z-10'>{locale === "ar"? "يرجى تسجيل الدخول للاستمرار":"Please Login First"}</p>
     </div>
    }
  </div>
}

export default Form