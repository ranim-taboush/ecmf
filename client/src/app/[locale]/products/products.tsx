import { FC } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl';


import Navbar from '@/components/Navbar';
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/product_test.png'
import Product from './product';

interface productsProps {

}

const Products: FC<productsProps> = ({ }) => {
  const locale = useLocale()
  return <div>
    <div className="h-64 relative">
      <div className="absolute inset-0 ">
        <Image
          src={productsBg}
          alt={'Products'}
          width={productsBg.width}
          height={productsBg.height}
          className='w-full h-full'
        />
      </div>
      <div className="relative">
        <Navbar />
        <div className="container flex items-center justify-center">
          <p className='text-primary uppercase text-center text-4xl md:text-4xl xl:text-5xl font-bold'>
            {locale === 'ar' ? 'الواح صاج ساخن' : 'Hot Metal Sheets'}
          </p>
        </div>
      </div>
    </div>
    <div className="relative -mt-8 container bg-[#F9F9F9] rounded-md px-4 sm:px-12 py-6 sm:py-12 z-10">

      <div className="flex flex-col gap-2 sm:gap-4">
        {
          Array(10).fill(0).map(
            (el, i) => <Product
              key={i}
              image={productImg}
              isNew={true}
              name={locale === 'ar' ? 'الواح صاج ساخن' : 'Hot Metal Sheets'}
              madeBy={locale === 'ar' ? 'عز الدخيلة' : 'Ezz El-Dkhela'}
              price={100}
              locale={locale}
            />
          )
        }
      </div>

    </div>
  </div>
}

export default Products