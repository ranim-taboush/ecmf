import { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';


import logo from '@/images/logo.png';
import { navLinks } from '@/utils/nav-links';
import MobileNavbar from './MobileNavbar';
import LocaleSwitcher from './LocaleSwitcher';

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const navbar = {
    "title" : "ECMF",
    "home" : "Home",
    "about" : "About",
    "gallery" : "Gallery",
    "contactUs" : "Contact Us",
    "products" : "Products",
    "services" : "Services",
    "termsOfSale" : "Terms of Sale",
    "titleAr" : "ECMF",
    "homeAr" : "الرئيسية",
    "aboutAr" : "من نحن",
    "galleryAr" : "معرض الصور",
    "contactUsAr" : "تواصل معنا",
    "productsAr" : "منتجاتنا",
    "servicesAr" : "خدماتنا",
    "termsOfSaleAr" : "شروط البيع"
  }

  const getLocale = (el: string) => t(el)

  const localeNavLinks = navLinks.map(({ href, label }) => ({
    href: href,
    label: getLocale(label)
  }))

  return <header className='container pt-12 pb-8 mx-auto flex items-start justify-between'>
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
      navLinks.map(({ href, label }) => (
        <div
          key={`${href}${label}`}
          className='hidden group md:block text-sm font-medium text-white duration-200 cursor-pointer relative w-fit'
        > 
          <Link className='group-hover:text-gray-400' href={href}>
            <span>{(locale === 'ar' ? navbar[label+"Ar"  as keyof typeof navbar] : navbar[label as keyof typeof navbar]) || getLocale(label)}</span>
          </Link>
          <div className={"absolute w-full h-0.5 bg-gray-400 transform scale-x-0 group-hover:scale-100 duration-200"}></div>

        </div>
      ))
    }
    <div className="hidden md:block">
      <Search className='w-6 h-6 text-white hover:text-gray-400 duration-200 cursor-pointer' />
      <LocaleSwitcher locale={locale} />
    </div>
    <div className="block md:hidden">
      <MobileNavbar navLinks={localeNavLinks} locale={locale} />
      <LocaleSwitcher locale={locale} />
    </div>
  </header>
}

export default Navbar