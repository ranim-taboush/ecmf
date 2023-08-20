import { cn } from '@/utils/utils'
import { FC } from 'react'
import { MoveRight, MoveLeft } from 'lucide-react';

import Button from './Button'
import { useLocale } from 'next-intl';

interface ArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'next' | 'prev'
}
// forward ref
const Arrow: FC<ArrowProps> = ({ className, ...rest }) => {
  const locale = useLocale();
  // const locale = 'en'

  return <Button type='button' className={cn('rounded-full p-3 disabled:opacity-50', className)}
    {...rest}
  >
    {
      rest.variant === 'next' ?
        <MoveRight size={20} className={cn('font-bold', locale === 'ar' ? 'transform rotate-180' : '')} /> :
        <MoveLeft size={20} className={cn('font-bold', locale === 'ar' ? 'transform rotate-180' : '')} />
    }
  </Button>
}

export default Arrow