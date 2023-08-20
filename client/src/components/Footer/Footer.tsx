import Image from 'next/image'
import Link from 'next/link'
import FooterLink from './FooterLink'

import logo from '@/images/logo.png';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <section className="py-10 bg-black sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-sm:w-full grid grid-cols-2 md:col-span-2 lg:grid-cols-5 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Link href="/">
              <Image
                className="w-auto h-9"
                src={logo}
                alt="emf"
                width={360}
                height={91}
              />
            </Link>
            <p className="text-base leading-relaxed text-white mt-7">To know more about out products</p>
            <ul className="flex items-center space-x-3 mt-9">
              <Facebook className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' />
              <Twitter className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' />
              <Instagram className='text-white text-base hover:text-primary focus:text-primary duration-200 cursor-pointer' />
            </ul>
          </div>

          <div className=''>
            <p className="text-sm font-semibold tracking-widest text-white uppercase">Main Menu</p>

            <ul className="mt-6 space-y-4">
              <FooterLink title="Home" href="/">Home</FooterLink>
              <FooterLink title="Shop" href="/shop">Shop</FooterLink>
              <FooterLink title="Contact us" href="/contact">Contact us</FooterLink>
              <FooterLink title="Terms of Sale" href="/terms-of-sale">Terms of Sale</FooterLink>
            </ul>
          </div>

          <div className='col-span-2'>
            <p className="text-sm font-semibold tracking-widest text-white uppercase">Shop</p>

            <ul className="mt-6 grid grid-cols-2 gap-2">
              <FooterLink title="Lines" href="/shop?category=Laptop">Lines</FooterLink>
              <FooterLink title="Products" href="/shop?category=Products">Products</FooterLink>
              <FooterLink title="about us" href="/shop?category=about us">about us</FooterLink>
              <FooterLink title="Lines" href="/shop?category=Laptop">Lines</FooterLink>
              <FooterLink title="Products" href="/shop?category=Products">Products</FooterLink>
              <FooterLink title="about us" href="/shop?category=about us">about us</FooterLink>
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

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-white">All rights reserved © ECMF</p>
      </div>
    </section>

  )
}

export default Footer