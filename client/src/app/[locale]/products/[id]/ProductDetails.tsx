import { FC } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

import Navbar from '@/components/Navbar'
import productsBg from '@/images/products_bg.png'
import productImg from '@/images/product_test.png'

interface ProductDetailsProps {
}

const ProductDetails: FC<ProductDetailsProps> = ({ }) => {
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

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 items-start">
        <div className="">
          <Image
            src={productImg}
            alt={'Product'}
            width={productImg.width}
            height={productImg.height}
            className='w-full h-auto'
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className='bg-gray-200 text-primary text-xs sm:text-sm rounded-md w-fit px-2'>
            {locale === 'ar' ? 'جديد' : 'New'}
          </p>
          <p className='text-gray-900 text-2xl sm:text-3xl font-bold'>
            {locale === 'ar' ? 'الواح صاج ساخن' : 'Hot Metal Sheets'}
          </p>
          <p className='text-primary text-2xl sm:text-3xl font-bold'>
            {'52,000 '}{locale === 'ar' ? 'جنية' : 'EGP'}
          </p>
          <div className="">
            <p className='text-black text-base sm:text-lg'>
              {locale === 'ar' ? 'مواصفات المنتج' : 'Product characteristics'}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'السمك' : 'Thickness'}: {locale === 'ar' ? 'من 1.5 مم الى 25 مم' : 'from 1.5 mm to 25 mm'}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'العرض' : 'Width'}: {locale === 'ar' ? 'حتى 1500 مم' : 'up to 1500 mm'}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'الطول' : 'Length'}: {locale === 'ar' ? 'حتى 6000 مم' : 'up to 6000 mm'}
            </p>
            <p className='text-gray-500 text-base sm:text-lg'>
              {locale === 'ar' ? 'ST 37-2. S235JR . ASTM A283' : 'ST 37-2. S235JR . ASTM A283'}
            </p>
          </div>
          <div className="">
            <p className='text-gray-900 text-lg sm:text-xl font-medium'>
              {locale === 'ar' ? 'السمك (مم)' : 'Thickness (mm)'}
            </p>
            <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-4 items-center">
              {
                [0.20, 0.22, 0.25, 0.30]
                  .map((el, i) => <span
                    key={i}
                    className="inline-block border border-black text-center py-1 px-2 sm:px-4 cursor-pointer hover:bg-gray-200 focus:bg-gray-300"
                  >
                    {el}
                  </span>
                  )
              }
            </div>
          </div>
          <div className="">
            <p className='text-gray-900 text-lg sm:text-xl font-medium'>
              {locale === 'ar' ? 'الطول (مم)' : 'Hight (mm)'}
            </p>
            <div className="mt-2 sm:mt-4 flex gap-2 sm:gap-4 items-center">
              {
                [1000, 1250, 1500, 2000]
                  .map((el, i) => <span
                    key={i}
                    className="inline-block border border-black text-center py-1 px-2 sm:px-4 cursor-pointer hover:bg-gray-200 focus:bg-gray-300"
                  >
                    {el}
                  </span>
                  )
              }
            </div>
          </div>
          <p className='text-gray-900 text-lg sm:text-xl font-medium'>
            {locale === 'ar' ? 'منتج من' : 'Made by'}
            {" : "}
            {locale === 'ar' ? 'عز الدخيلة' : 'Ezz El-Dkhela'}
          </p>
        </div>
      </div>

    </div>
  </div>
}

export default ProductDetails