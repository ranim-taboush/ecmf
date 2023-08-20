"use client";

import React from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utils/utils';

interface IMobileNavbarProps {
  navLinks: {
    href: string
    label: string
  }[]
  locale: string
}


const MobileNavbar = ({ navLinks, locale }: IMobileNavbarProps) => {
  const [navShow, setNavShow] = React.useState(false)
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status && typeof window !== 'undefined') {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }


  return (
    <div className="md:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <Menu className='block md:hidden text-white hover:text-gray-400 cursor-pointer' size={24} />
      </button>
      <div
        className={cn('fixed top-0 z-10 h-full w-3/4 transform bg-black/90 opacity-95 duration-300 ease-in-out',
          navShow ? 'translate-x-0' : locale === 'ar' ? '-translate-x-full' : 'translate-x-full',
          locale === 'ar' ? 'left-0' : 'right-0'
        )}
      >
        <div className="flex h-[60px] items-center">
          <button
            type="button"
            className="mx-5 h-8 w-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-white"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed h-full w-full">
          {navLinks.map(({ href, label }) => (
            <div key={`${href}${label}`} className="w-full px-8 py-4 border border-white/30 bg-transparent hover:bg-[#2D2D2D] duration-300 cursor-pointer">
              <Link
                href={href}
                className="inline-block text-lg font-bold tracking-widest text-white w-full text-center"
                onClick={onToggleNav}
              >
                <span className=''>{label}</span>
              </Link>
            </div>
          ))}
          <div className="w-full px-8 py-4 border border-white/30 bg-transparent hover:bg-[#2D2D2D] duration-300 cursor-pointer">
            <span className='inline-block text-lg font-bold tracking-widest text-white w-full text-center'>
              {locale === 'ar' ? 'بحث' : 'Search'}
            </span>
          </div>
        </nav>
      </div>
    </div >
  )
}

export default MobileNavbar;
