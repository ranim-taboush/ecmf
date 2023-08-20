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
        <p
          key={`${href}${label}`}
          className='hidden md:block text-sm font-medium text-white hover:text-gray-400 duration-200 cursor-pointer'
        >
          <Link href={href}>
            <span>{getLocale(label)}</span>
          </Link>
        </p>
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