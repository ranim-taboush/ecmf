import { cn } from '@/utils/utils'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import Button from './UI/Button'


interface BrowseCardProps {
  title: string
  slug: string
  locale: string
  image: any
}


const BrowseCard: FC<BrowseCardProps> = ({ title, slug, image, locale }) => {
  return <div className='relative'>
    <div className="relative">
      <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className='rounded-md'
      />
    </div>
    <Link href={`/${slug}`} className='absolute top-1/2 -translate-y-1/2 rtl:-right-4 ltr:-left-4'>
      <Button className='px-4 py-2 md:px-10 md:py-5 flex items-end gap-4'>
        <span className='inline-block font-bold text-base sm:text-xl'>{title}</span>
        <MoveRight
          className={
            cn(
              'inline-block text-white font-bold text-base sm:text-xl',
              locale === 'ar' ? 'transform rotate-180' : ''
            )
          }
          />
      </Button>
    </Link>
  </div>
}

export default BrowseCard