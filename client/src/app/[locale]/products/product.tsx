"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { cn } from '@/utils/utils';

interface ProductProps {
  image: any
  isNew: boolean
  name: string
  madeBy: string
  locale: string
  element: any
  isChecked: boolean
}

const Product: FC<ProductProps> = ({ image, isNew, name, madeBy, locale, element, isChecked }) => {
  const router = useRouter();
  const findByHow = (name: string)=>{
    let agent 
    if(name === 'agent1')
        agent =  {en: 'Kandil Steel', ar: 'قنديل للصلب'}
    else if (name === 'agent2')
      agent = {en: 'Egyptian Metal Forming', ar: "المصرية لتصنيع المعادن"}
    else if (name === 'agent3')
        agent =  {en: 'El Ola Steel Group', ar: "مجموعة العلا للصلب"}
    else if (name === 'agent4')
      agent =  {en: 'Al Ghurair Iron & Steel LLC', ar: "الغرير للحديد و الاستيل"}
    else if (name === 'agent5')
        agent =  {en: 'EZZ Dikheila Iron & Steel', ar: "عز الدخيلة للحديد والصلب"}
    else
        agent =  {en: 'error', ar: "خطأ"}
    return agent
  }
  return <div className={cn(
    "flex flex-col sm:flex-row justify-between items-center sm:items-end p-4 sm:hover:bg-gray-200 sm:duration-300",
     isChecked? "hidden": "")}>
    <div className="flex gap-8 flex-col sm:flex-row max-sm:items-center">
      <Image
        loader={()=>image}
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
          {locale === 'ar' ? findByHow(madeBy)?.ar :  findByHow(madeBy)?.en}
        </p>
      </div>
    </div>
    <div className="mt-2 sm:mt-0">
      <p className={`relative w-fit text-primary text-base sm:text-lg font-medium mt-2 sm:mt-8 after:content-[""] after:w-0 hover:after:w-4/5 after:h-1 after:bg-primary after:absolute after:bottom-0  
        ${locale === 'ar' ? 'after:right-0' : 'after:left-0'}  after:duration-300 cursor-pointer`}
        onClick={() => router.push(`/0/products/${element?.arName}`)} >
        {locale === 'ar' ? 'تفاصيل اكثر' : 'More Details'}
      </p>
    </div>
  </div>
}

export default Product