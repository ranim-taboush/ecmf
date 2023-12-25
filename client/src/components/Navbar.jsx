import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import DropDown from '@/components/UI/DropDown'

import logo from '@/images/logo.png';
import { navLinks } from '@/utils/nav-links';
import MobileNavbar from './MobileNavbar';
import LocaleSwitcher from './LocaleSwitcher';

const Navbar = ({ }) => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const navbar = {
    "title" : "ECMF",
    "home" : "Home",
    "about" : "About",
    "gallery" : "Gallery",
    "contactUs" : "Contact Us",
    "products" : "Products",
    "lines" : "Lines",
    "termsOfSale" : "Terms of Sale",
    "titleAr" : "ECMF",
    "homeAr" : "الرئيسية",
    "aboutAr" : "من نحن",
    "galleryAr" : "معرض الصور",
    "contactUsAr" : "تواصل معنا",
    "productsAr" : "المنتجات",
    "linesAr" : "الخطوط",
    "termsOfSaleAr" : "شروط البيع"
  }

  const getLocale = (el) => t(el)

  const localeNavLinks = navLinks.map(({ href, label, arLabel }) => ({
    href: href,
    label: locale ==="ar"? arLabel: label
  }))

  return <header className='container pt-12 pb-8 mx-auto flex items-start justify-between'>
    <div className="">
      <Link href='/'>
        <Image
          src={logo}
          alt="ECMF"
          width={155}
          height={45}
          className='sm:w-36 sm:h-11 object-contain -mt-4'
        />
      </Link>
    </div>
    {
      localeNavLinks.map((_, i) => (
        <div
          key={i}
          className='hidden group md:block text-sm font-medium text-white duration-200 cursor-pointer relative w-fit navbar'
        > 
          <Link className='group-hover:text-gray-400' href={_.href}>
            <span>{_.label}</span>
          </Link>
          {(_.label === "Lines") 
          ? <DropDown locale={locale} name={"lines"} />
          : ((_.label === "Products")? <DropDown locale = {locale} name={"products"}/> : "")}
          {console.log(_.label, _.label === "Lines", _.label === "Products")}
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