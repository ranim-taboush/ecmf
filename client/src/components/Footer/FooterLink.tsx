"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

interface FooterLinkProps {
  title: string
  href: string
  children: React.ReactNode
}

const FooterLink = ({ title, href, children }: FooterLinkProps) => {
  const router = useRouter();
  const isRouting = href.split("#")[1]? true: false

  const routerToContact = () => {
    const url = href.split("#")[0]
    const id = href.split("#")[1]
    console.log(isRouting, url, id)
      setTimeout(() => {
      const contactSection = document.getElementById(id);
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000); // Delay for smoother scroll
    router.push(url);
}

  return (
    <li>
      {
      isRouting
      ?<p title={title} className="flex text-base text-white transition-all duration-200 hover:text-primary focus:text-primary cursor-pointer"
      onClick={routerToContact}>
      {children}
      </p>
      :<Link href={href} title={title} className="flex text-base text-white transition-all duration-200 hover:text-primary focus:text-primary">
        {children}
      </Link>}
    </li>
  )
}

export default FooterLink