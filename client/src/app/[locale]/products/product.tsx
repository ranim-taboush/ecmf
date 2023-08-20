"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface ProductProps {
  image: any
  isNew: boolean
  name: string
  madeBy: string
  price: number
  locale: string
}

const Product: FC<ProductProps> = ({ image, isNew, name, madeBy, price, locale }) => {
  const router = useRouter();
  return <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end p-4 sm:hover:bg-gray-200 sm:duration-300">
    <div className="flex gap-8 flex-col sm:flex-row max-sm:items-center">
      <Image
        src={image}
        alt={name}
        width={187}
        height={187}
        className='h-auto max-h-28 w-48'
      />
      <div >
        {isNew &&
          <p className='bg-gray-200 text-primary text-xs sm:text-sm rounded-md w-fit px-2'>
            {locale === 'ar' ? 'جديد' : 'New'}
          </p>
        }
        <p className='text-gray-900 text-2xl sm:text-3xl font-bold'>{name}</p>
        <p className='mt-2 sm:mt-8 text-gray-500 text-sm sm:text-base'>
          {locale === 'ar' ? 'منتج من' : 'Made by'}
          {" : "}
          {madeBy}
        </p>
      </div>
    </div>
    <div className="mt-2 sm:mt-0">
      <p className='text-gray-400 text-base sm:text-lg'>
        {locale === 'ar' ? 'الاسعار تبدأ من' : 'Prices start from'}
        {" "} {price} {" "} {locale === 'ar' ? 'جنيه' : 'EGP'}
      </p>
      <p
        className={`relative text-primary text-base sm:text-lg font-medium mt-2 sm:mt-8 after:content-[""] after:w-0 hover:after:w-3/5 after:h-1 after:bg-primary after:absolute after:bottom-0  ${locale === 'ar' ? 'after:right-0' : 'after:left-0'}  after:duration-300 cursor-pointer`}
        onClick={() => router.push(`/products/1`)}
      >
        {locale === 'ar' ? 'تفاصيل اكثر' : 'More Details'}
      </p>
    </div>
  </div>
}

export default Product