import { cn } from '@/utils/utils'
import { FC } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean

}

const Button: FC<ButtonProps> = ({ children, className, type = 'button', isLoading, ...rest }) => {
  return <button
    type={type}
    disabled={isLoading}
    {...rest}
    className={cn(
      'px-4 py-2 rounded-md text-white bg-primary font-medium text-sm shadow-sm shadow-transparent hover:shadow-primary duration-200',
      className
    )}
  >
    {children}
  </button >
}

export default Button