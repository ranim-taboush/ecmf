import { FC } from 'react'
import Navbar from './Navbar'

import bg from '@/images/short-navbar-bg.png'
import Image from 'next/image'
interface ShortNavbarProps {

}

const ShortNavbar: FC<ShortNavbarProps> = ({ }) => {
  return <div className='relative'>
    <div className="absolute inset-0">
      <Image
        src={bg}
        alt="ECMF"
        width={bg.width}
        height={bg.height}
        className='w-full h-full'
      />
    </div>
    <div className="relative">
      <Navbar />
    </div>
  </div>
}

export default ShortNavbar