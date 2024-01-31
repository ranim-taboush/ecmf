import Form from "./form"
// import Navbar from "@/components/sections/navbar"
import Image from "next/image"
import Logo from '@/images/logo.png'

function Page() {

  return ( <div className="w-screen min-h-screen">
    {/* <Navbar /> */}
    <div className="mt-32 w-4/5 mx-auto rounded-lg min-h-[80vh] flex max-md:flex-wrap justify-center items-center shadow-2xl bg-gradient-to-b from-[#0c0c0c] to-[#0c0c0c88] overflow-hidden">
      <div className="w-1/2 max-md:w-full h-full relative bg-gradient-to-b from-[#181818] to-[#18181888]">
        <Image src={Logo} alt='DJM' className="absolute max-md:static max-md:translate-x-0 max-md:translate-y-1/2 max-md:mx-auto z-10 w-36 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
      
      <div className="w-full h-full relative p-10 overflow-hidden">
        <Form />
      </div>
    </div>
  </div> )
}

export default Page