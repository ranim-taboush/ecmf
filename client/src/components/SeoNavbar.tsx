"use client"
import { FC } from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import logo from '@/images/logo.png';
import { useLocale } from 'next-intl';
import { seoLinks } from '@/utils/admin-nav-links';
import bg from '@/images/short-navbar-bg.png'
import LocaleSwitcher from './LocaleSwitcher';
import Image from 'next/image'
import { Error, Success } from '@/components/toast';
interface AdminNavbarProps {

}

const AdminNavbar: FC<AdminNavbarProps> = ({ }) => {
  const router = useRouter();
  const locale = useLocale();
  const [token, setToken] = useState<string>('')
  const navbar = {
    "title" : "ECMF",
    "Login" : "Admin Login",
    "AddNewBlog": "Add New Blog",
    "ViewBlogs": "View Blogs",
    "Logout": "Admin Logout",
    "titleAr" : "ECMF",
    "LoginAr" : "تسجيل الدخول",
    "LogoutAr": "تسجيل الخروج",
    "AddNewBlogAr": "اضافة مدونة",
    "ViewBlogsAr": "عرض المدونات",
  }

  useEffect(()=>{
    setToken(localStorage.getItem('seo-token') || '')
  })

  const userLogout = () =>{
    try{
      localStorage.removeItem('seo-token')
      setToken('')
      router.push('/admin/seo');
      Success("Successful")
    }catch(e){
      Error("couldn't logout")
      Error("please try again")
    }
  }


  return <div className='relative'>
    <div className="absolute inset-0">
      <Image
        src={bg}
        alt="ECMF"
        width={bg.width}
        height={bg.height}
        className='w-full h-full'
      />
    </div>
    <div className="relative">
    <header className='container pt-12 pb-8 mx-auto flex items-start justify-between'>
    <div className="">
      <Link href='/'>
        <Image
          src={logo}
          alt="ECMF"
          width={147}
          height={45}
          className='w-28 h-7 sm:w-36 sm:h-11'
        />
      </Link>
    </div>
    {
      seoLinks.map(({ href, label }, i) => (
        <div
          key={`${href}${label}`}
          className='hidden group md:block text-sm font-medium text-white duration-200 cursor-pointer relative w-fit'
        > {label !== "Login"
          ?<Link className='group-hover:text-gray-400' href={href}>
            <span>{(locale === 'ar' ? navbar[label+"Ar" as keyof typeof navbar] : navbar[label as keyof typeof navbar])}</span>
          </Link>
          :(token !== ''
          ?<div className='group-hover:text-gray-400' onClick={userLogout}>
          <span>{(locale === 'ar' ? navbar["Logout"+"Ar" as keyof typeof navbar] : navbar["Logout" as keyof typeof navbar])}</span>
          </div>
          :<Link className='group-hover:text-gray-400' href={href}>
          <span>{(locale === 'ar' ? navbar[label+"Ar" as keyof typeof navbar] : navbar[label as keyof typeof navbar])}</span>
          </Link>)
          }
          <div className={"absolute w-full h-0.5 bg-gray-400 transform scale-x-0 group-hover:scale-100 duration-200"}></div>

        </div>
      ))
    }
    <div className="hidden md:block">
      <LocaleSwitcher locale={locale} />
    </div>
    <div className="block md:hidden">
      <LocaleSwitcher locale={locale} />
    </div>
    </header>
    </div>
  </div>
}

export default AdminNavbar