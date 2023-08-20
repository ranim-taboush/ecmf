import { FC } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/utils'


const TitleVariants = cva(
  'text-xl md:text-3xl lg:text-4xl font-bold',
  {
    variants: {
      variant: {
        default: 'text-primary text-start',
        doubleBorder: 'w-[fit-content] border-t-[3px] border-gradient  px-4 py-2 text-gradient text-center relative before:absolute before:w-full before:h-full before:-top-4  before:border-t-[3px] ',
      },
      borderDirection: {
        left: 'border-l-[3px] before:-left-4 before:border-l-[3px] rounded-tl-md before:rounded-tl-md',
        right: 'border-r-[3px] before:-right-4 before:border-r-[3px] rounded-tr-md before:rounded-tr-md',
      }
    },
    defaultVariants: {
      variant: 'default',
    }
  }
)
interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof TitleVariants> {
  children: React.ReactNode
}
const Title: FC<TitleProps> = ({ children, variant, borderDirection, className, ...rest }) => {
  return <p
    className={cn(TitleVariants({ variant, className, borderDirection }))}
    {...rest}
  >
    {children}
  </p>
}

export default Title