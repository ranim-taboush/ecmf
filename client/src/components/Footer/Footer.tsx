import Image from 'next/image'
import Link from 'next/link'
import FooterLink from './FooterLink'
import { useLocale } from 'next-intl'

import logo from '@/images/logo.png';
import { Facebook, Instagram, Linkedin  } from 'lucide-react';

const Footer = () => {
  const locale = useLocale()
  return (
    <section className="py-10 bg-black">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="w-1/5">
          <Link href="/" className='w-full'>
            <Image className="w-full object-contain" src={logo} alt="emf" width={760} height={91} />
          </Link>
          {/* <p className="text-base leading-relaxed text-white mt-7">To know more about out products</p> */}
          <ul className="flex items-center space-x-3 mt-9">
            <a href="https://www.facebook.com/profile.php?id=100077992483712&mibextid=LQQJ4d"><Facebook className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' /></a>
            <a href="https://www.linkedin.com/in/engineering-company-for-metal-forming-90687825b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><Linkedin className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' /></a>
            <a href="https://instagram.com/ecmf_official?igshid=NGVhN2U2NjQ0Yg%3D%3D&utm_source=qr"><Instagram className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' /></a>
          </ul> 
        </div>
        <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 gap-y-16 gap-x-12">

          <div className=''>
            <ul className="mt-4 space-y-4">
              <FooterLink title="Home" href="/">{locale ==="ar"? "الرئيسية":"Home"}</FooterLink>
              {/* <FooterLink title="Gallery" href="/gallery">Gallery</FooterLink> */}
              <FooterLink title="about us" href="/about">{locale ==="ar"? "من نحن": "About us"}</FooterLink>
              <FooterLink title="Terms of Sale" href="/terms-of-sale">{locale ==="ar"? "سياسة البيع":"Terms of Sale"}</FooterLink>
            </ul>
          </div>
          <div className=''>
            <ul className="mt-4 space-y-4">
              <FooterLink title="Lines" href="/lines">{locale ==="ar"? "الخطوط": "Lines"}</FooterLink>
              <FooterLink title="Products" href="/products">{locale ==="ar"? "منتجاتنا": "Products"}</FooterLink>
            </ul>
          </div>
          <div className=''>
            <ul className="mt-4 space-y-4">
              <FooterLink title="Contact us" href="/contact-us">{locale ==="ar"? "تواصل معنا": "Contact us"}</FooterLink>
              <FooterLink title="about us" href="/about#quality">{locale ==="ar"? "مراقبة الجودة": "Quality Control"}</FooterLink>
            </ul>
          </div>
          <div className=''>
            <ul className="mt-4 space-y-4">
              <FooterLink title="about us" href="/about#vision">{locale ==="ar"? "رؤيتنا": "Vision"}</FooterLink>
              <FooterLink title="about us" href="/about#mission">{locale ==="ar"? "مهمتنا":"Mission"}</FooterLink>
            </ul>
          </div>

          {/* <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-white uppercase">Subscribe to newsletter</p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" className="block w-full p-4 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
              </div>
              <button type="submit" className="inline-flex items-center justify-center px-6 py-2 mt-3 font-semibold text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700 focus:bg-red-700">Subscribe</button>
            </form>
          </div> */}
        </div>

        {/* <hr className="mt-16 mb-10 border-gray-200" /> */}

        <p className="text-sm lg:text-center text-white pt-10">All Rights Reserved © ECMF</p>
      </div>
    </section>

  )
}

export default Footer