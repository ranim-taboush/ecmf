import { cn } from '@/utils/utils'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  image: any
  currency: string
}

const ProductCard: FC<ProductCardProps> = ({ title, description, image, currency, className }) => {
  return <div className={cn(
    'pb-4 sm:pb-8 rounded-3xl bg-[#DDDDDD] hover:bg-[#1F96D32E] duration-300 cursor-pointer',
    className
  )}
  >
    <Image
      src={image}
      alt={title}
      width={200}
      height={250}
      className='w-full h-96 rounded-3xl'
    />
    <div className="flex flex-col gap-1 mt-1 px-4 sm:px-8">
      <p className='text-black text-base sm:text-2xl font-bold'>{title}</p>
    </div>
  </div >
}

export default ProductCard