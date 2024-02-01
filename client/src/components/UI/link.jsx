import Link from "next/link"
import { cn } from "../../utils/utils"

function RouteLink({href, text='', Icon = null, className}) {
  if(href)
  return (
    <Link href={href} 
    className={cn("text-primary opacity-50 hover:opacity-100 hover:underline transition flex items-center justify-between gap-4 w-full cursor-pointer",
    className)}>
            {Icon && <Icon size={16} />}
            <p>{text}</p>
    </Link>
  )
  else
  return (
    <div 
    className={cn("text-primary opacity-50 hover:opacity-100 hover:underline transition flex items-center justify-between gap-4 w-full cursor-pointer",
    className)}>
            {Icon && <Icon size={16} />}
            <p>{text}</p>
    </div>
  )
}

export default RouteLink