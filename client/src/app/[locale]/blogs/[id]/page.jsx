/* eslint-disable react-hooks/rules-of-hooks */
import Footer from '@/components/Footer/Footer'
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Agents from '@/components/sections/Agents'
import BlogsCard from '@/components/Blogs/blogsCard'
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'

const Page = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('blogs')
  return <div className='overflow-hidden'>
    <ShortNavbar />
    <NextIntlClientProvider locale={locale}>
      <BlogsCard />
    </NextIntlClientProvider>
    <Agents />
    <NextIntlClientProvider locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  </div>
}

export default Page