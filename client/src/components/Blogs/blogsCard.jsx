"use client"
import {useState, useEffect} from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import adminBg from '@/images/admin-page-bg.jpg'
import { Search } from 'lucide-react'
import { FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon,} from 'next-share'
import Image from 'next/image'
import Link from 'next/link'
import { Api, ApiKey } from '@/config/api'
import axios from 'axios'

function BlogsCard({}) {
  const locale = useLocale()
  const pathname = usePathname()
  const [blogData, setBlogData] = useState({})
  const [blogsData, setBlogsData] = useState([])
  const [searchFor, setSearchFor] = useState('')
  const [searchedBlogs, setSearchedBlogs] = useState()

  useEffect(()=>{
      const url = `${Api}/blogs`
      const getData = async() => {
          await axios.get(url)
          .then(data=>{
            const thisBlog = locale === "ar"
            ?(data?.data?.find(_=>_?.slug === pathname.split('/')[3]) || data?.data?.find(_=>_?.slug === decodeURI(pathname.split('/')[3])))
            :(data?.data?.find(_=>_?.slug === pathname.split('/')[2]) || data?.data?.find(_=>_?.slug === decodeURI(pathname.split('/')[2])))
            
            // console.log(thisBlog)
            // console.log(decodeURI(pathname.split('/')[3]))
            setBlogData(thisBlog)
            setBlogsData(data?.data)
            setSearchedBlogs(data?.data)
          })
          .catch(e=>{console.log(e); Error("Error while loading data")})
      }
      
      getData()
  }, [])

  useEffect(()=>{
    if(blogsData[0]?.topic){
      let data = []
      blogsData.forEach((_)=>{
        console.log(_.title.en)
        if(_.tags.indexOf(searchFor) !== -1 
        || _.tags.indexOf(searchFor.toLowerCase()) !== -1 
        || _?.title?.en?.includes(searchFor)
        || _?.title?.ar?.includes(searchFor)
        )
        data.push(_)
      })
      if (data == []) data = blogsData
      setSearchedBlogs(data)
    }
  }, [searchFor])

  const handleChangeSearch = (e) => {
    setSearchFor(e.target.value)
  }
  const startSearch = () => {}

  return (<div className='w-full h-full px-[10%] max-md:px-[5%] py-10 flex max-md:flex-wrap justify-between gap-10 max-md:gap-2'>
    {blogData?.topic && <div className="flex flex-col gap-4 w-full">
      <p className="bg-primary rounded-sm text-white text-xs w-fit px-2 py-0.5">
        {locale === "ar"? blogData?.topic?.ar : blogData?.topic?.en}
      </p>
      <p className="text-black max-w-xs font-bold">
        {locale === "ar"? blogData?.title?.ar : blogData?.title?.en}
      </p>
      <p className="text-slate-800 text-xs">
        {blogData?.createdAt?.split("T")[0]}
      </p>
      <Image src={blogData?.coverImg} alt={blogData?.coverImgAlt || blogData?.topic?.en} width={1000} height={1000} 
      className="w-full rounded-lg max-h-96 object-cover"/>
      <div className="flex justify-start items-center gap-4">
        <p className="text-xs">
          {locale === "ar"? "المشاركة عبر": "Share Via"}
        </p>
        <FacebookShareButton
          url={`https://ecmf-eg.com${pathname}`}
          quote={locale === "ar"? blogData?.title?.ar :blogData?.title?.en}
          hashtag={blogData?.tags?.map(_=>`#${_}`)}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TelegramShareButton
          url={`https://ecmf-eg.com${pathname}`}
          title={locale === "ar"? blogData?.title?.ar :blogData?.title?.en}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={`https://ecmf-eg.com${pathname}`}
          title={locale === "ar"? blogData?.title?.ar :blogData?.title?.en}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <p className="text-black w-full" 
      dangerouslySetInnerHTML={{ __html: (locale === "ar"? blogData?.paragraph?.ar : blogData?.paragraph?.en) }}
      ></p>
    </div>}

    {blogsData[0]?.topic && <div className="flex flex-col gap-4 max-md:mt-10 max-md:mx-auto">

      <div className="border border-slate-400 p-4 w-72 rounded-lg">
        <label htmlFor="search" className='text-black'>
          {locale === "ar"? "بحث": "Search"}
        </label>
        <div className="flex items-stretch justify-center">
          <input type="text" name='search' id='search' placeholder={locale==="ar"?"اكتب هنا..":"Type here.."}
          value={searchFor} onChange={handleChangeSearch}
          className='border border-slate-400 bg-transparent ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg w-44' />
          <button className='bg-primary text-white border-none flex justify-center items-center p-2 gap-2 ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg'
          onClick={startSearch}>
            <p>{locale === "ar"? "بحث": "Search"}</p>
            <Search />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-slate-400 p-4 w-72 rounded-lg mt-10">
        <p className="text-black text-sm">
          {locale === "ar"? "أحدث المدونات": "Recent Blogs"}
        </p>
        {searchedBlogs && searchedBlogs?.map((_, i)=>{
          if(i<10)
          return <Link  href={`/blogs/${_.slug}`} key={i} className="flex justify-between w-full px-1 items-center gap-2 cursor-pointer">
            <Image src={_?.coverImg} alt={blogData?.topic || ''} width={200} height={200} className='w-20 h-20 object-fill rounded-lg'/>
            <div className="flex flex-col gap-2 w-52">
              <p className="bg-blue-100 rounded-sm text-primary text-xs w-fit px-2 py-0.5">
                {locale === "ar"? _?.topic?.ar : _?.topic?.en}
              </p>
              <p className="text-black line-clamp-2 max-w-xs font-bold">
                {locale === "ar"? _?.title?.ar : _?.title?.en}
              </p>
              <p className="text-slate-800 text-xs">
                {_?.createdAt?.split("T")[0]}
              </p>
            </div>
          </Link>
          else return ''
        })}

        <div className="flex items-center flex-wrap gap-2">
          <p className="">{locale === "ar"? "التاجات: ": "Tags: "}</p>
          {blogData?.tags && blogData?.tags?.map((_, i)=>{
            return <p key={i} className="bg-primary rounded-sm text-white text-xs w-fit px-2 py-0.5">
              {_}
            </p>
          })}
        </div>
        
      </div>
    </div>}
  </div>)
}

export default BlogsCard