import Form from "./form"
// import Navbar from "@/components/sections/navbar"
import Image from "next/image"
import Logo from '@/images/logo.png'

function Page() {

  return ( <div className="w-screen min-h-screen">
    {/* <Navbar /> */}
    <div className="mt-32 w-4/5 mx-auto rounded-lg h-[80vh] flex justify-center items-center shadow-2xl bg-gradient-to-b from-[#0c0c0c] to-[#0c0c0c88] overflow-hidden">
      <div className="w-full h-full relative bg-gradient-to-b from-[#181818] to-[#18181888]">
        <Image src={Logo} alt='DJM' className="absolute z-10 w-36 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      
      <div className="animate-show w-full h-full relative m-10 overflow-hidden">
        <Form />
      </div>
    </div>
  </div> )
}

export default Page