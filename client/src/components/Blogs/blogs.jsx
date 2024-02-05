"use client"
import {useState, useEffect} from 'react'
import { useLocale } from 'next-intl'
import adminBg from '@/images/admin-page-bg.jpg'
import Image from 'next/image'
import { Api, ApiKey } from '@/config/api'
import axios from 'axios'
import Link from 'next/link'

function Blogs() {
  const locale = useLocale()
  const [blogsData, setBlogsData] = useState([])

  useEffect(()=>{
      const url = `${Api}/blogs`
      const getData = async() => {
          await axios.get(url)
          .then(data=>{
            const template = data?.data?.map((_, i)=>{
              return {
                _id: _?._id,
                arTitle: _?.title?.ar, arTopic: _?.topic?.ar,
                title: _?.title?.en, topic: _?.topic?.en,
                createdAt: _?.createdAt?.split("T")[0] || "",
                coverImg: _?.coverImg, slug: _?.slug
              }
            })
            setBlogsData(template)
          })
          .catch(e=>{console.log(e); Error("Error while loading data")})
      }
      
      getData()
  }, [])

  return (<div className='w-full h-full px-[15%] max-xl:px-[10%] max-md:px-[5%] my-10 '>
      <p className="text-primary text-xl max-md:text-base">
        {locale === "ar"? "أحدث المدونات": "Latest Posts"}
      </p>

      <div className="w-full h-full flex justify-between items-stretch gap-1 max-md:gap-4 mt-10 flex-wrap">
        {
          blogsData && blogsData.map((_, i)=>{
            return <Link href={`/blogs/${_.slug}`} key={i}
            className="flex-col gap-4 flex justify-center items-start border border-slate-400 rounded-lg p-2 w-[30%] cursor-pointer min-w-fit max-md:mx-auto">
              <Image src={_?.coverImg} alt={_?.topic} width={1500} height={1500} className="mx-auto h-56 rounded-lg w-64 object-cover"/>
              <p className="bg-blue-100 rounded-sm text-primary text-xs w-fit px-2 py-0.5">
                {locale === "ar"? _?.arTopic : _?.topic}
              </p>
              <p className="text-black line-clamp-2 max-w-xs font-bold">
                {locale === "ar"? _?.arTitle : _?.title}
              </p>
              <p className="text-slate-800 text-xs">
                {_?.createdAt}
              </p>

            </Link>
          })
        }
      </div>

  </div> )
}

export default Blogs