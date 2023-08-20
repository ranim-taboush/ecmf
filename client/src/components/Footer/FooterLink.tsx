import Link from 'next/link'
import React from 'react'

interface FooterLinkProps {
  title: string
  href: string
  children: React.ReactNode
}
const FooterLink = ({ title, href, children }: FooterLinkProps) => {
  return (
    <li>
      <Link href={href} title={title} className="flex text-base text-white transition-all duration-200 hover:text-primary focus:text-primary">
        {children}
      </Link>
    </li>
  )
}

export default FooterLink