"use client"
import { useState, useEffect } from "react"
// import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from "axios"
import { useRouter } from "next/navigation"
import { Success, Error } from '@/components/toast';
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'
import { Api, ApiKey } from '@/config/api'
import { storage } from '../../../../../api/firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { TagsInput } from "react-tag-input-component"; 
// import TipTabInput from '@/components/tiptab/tiptabInput'
import { Editor } from "@/components/tiptab/editor";
import { useLocale } from 'next-intl'
import adminBg from '@/images/admin-page-bg.jpg'
import Image from "next/image"

function Form() {
  const locale = useLocale()
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [docu, setDocu] = useState()
  const [arDocu, setArDocu] = useState()
  const [tags, setTags] = useState()
  const [form, setForm] = useState({ 
    title: "", arTitle: "" ,
    topic: "", arTopic: "",
    paragraph: "", arParagraph: "",
    tags: [""],
    slug: "",
    coverImgAlt: "",
    coverImg: ""
 })

 useEffect(()=>{
  if(localStorage.getItem('seo-token')) {
    setIsLoggedIn(true)
  }else{
    router.push('/admin/seo')
  }
 }, [])

 const sendForm = async () => {
  if(form.coverImg){
    setIsLoading(true)
    const row = {
      title: {ar: form.arTitle, en: form.title},
      topic: {ar: form.arTopic, en: form.topic},
      paragraph: {ar: arDocu, en: docu},
      tags: tags,
      slug: form.slug,
      coverImgAlt: form.coverImgAlt,
      coverImg: form.coverImg,
    };
      await axios.post(`${Api}/blog`, 
      {...row}, 
      {headers: { "accesstoken": localStorage.getItem('seo-token')}}
      )
      .then(data=> {
        Success('Blog added success')
      setForm(({ 
        title: "", arTitle: "" ,
        topic: "", arTopic: "",
        paragraph: "", arParagraph: "",
        tags: [""], slug: "",
        coverImgAlt: "",
        coverImg: ""
      }))
      setDocu('')
      setArDocu('')
      location.reload()
      })
      .catch(e=>{
        console.log(e)
        Error('register failed')
        Error(e?.response?.data)
      })
      setIsLoading(false)
  }else{
    Error("Image is required")
  }
 }

  const handleSubmit = async (e) => {
    e.preventDefault()
    sendForm()
  }

  const handleChange = (e) => {
    setForm(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  const uploadImgs =async(e) =>{
    const fileRef = ref(storage, 'images/' +  Date.now() + e.target.files[0].name)
    uploadBytes(fileRef, e.target.files[0]).then(async data=>{
      await getDownloadURL(data.ref).then(async url=>{
        Success("Image upload success")
        setForm(prev=>({
          ...prev, coverImg: url
        }))
      })
    })
  }
  
  return (<div className="w-full h-full">
    {isLoggedIn
    ?<form className='max-w-xl px-10 h-full flex justify-center flex-col text-slate-200 max-md:px-0'>
      <p className="text-primary text-7xl font-medium max-xl:text-5xl max-md:text-2xl max-md:text-center">Add new blog!</p>
      <p className="h-10"></p>
      <Input id="title" name="title" type="text" placeholder="Global Warming" required={true} label="Title (English)" value={form.title} onChange={handleChange} />
      <Input id="arTitle" name="arTitle" type="text" placeholder="الاحتباس الحراري" required={true} label="Title (Arabic)" value={form.arTitle} onChange={handleChange} />
      <Input id="coverImg" name="coverImg" type="file" placeholder="Lorem Ipsom..."  accept="image/*" required={true} label="Cover Image" onChange={uploadImgs} />
      <Input id="title" name="coverImgAlt" type="text" placeholder="Global Warming Image" required={true} label="Cover Image Alt" value={form.coverImgAlt} onChange={handleChange} />
      <Input id="title" name="slug" type="text" placeholder="must be unique" required={true} label="Slug" value={form.slug} onChange={handleChange} />
      <Input id="topic" name="topic" type="text" placeholder="Tech" required={true} label="Topic (English)" value={form.topic} onChange={handleChange} />
      <Input id="arTopic" name="arTopic" type="text" placeholder="التكنولوجيا" required={true} label="Topic (Arabic)" value={form.arTopic} onChange={handleChange} />
      <div className="py-2">
        <p className="text-white text-base sm:text-lg font-light px-1">Paragraph (English)</p>
        <Editor setDocu={setDocu} />
      </div>
      <div className="py-2">
        <p className="text-white text-base sm:text-lg font-light px-1">Paragraph (Arabic)</p>
        <Editor setDocu={setArDocu} />
      </div>
      <p className="text-white text-base sm:text-lg font-light px-1 mt-2">Tags List</p>
      <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="tags" /> 

      <Button type="submit" className="mt-4 self-end" onClick={handleSubmit} isLoading={isLoading}>
        Create Blog
      </Button>
    </form>
    :<div className="relative mt-4 md:mt-8 rounded-md overflow-hidden">
      <div className="absolute inset-0 ">
        <Image src={adminBg} alt='bg' width={adminBg.width} height={adminBg.height} className='w-full h-full rounded-xl blur-md' />
      </div>
      <div className="h-full w-full flex items-center justify-center text-red-400 font-bold text-2xl p-6 md:p-12"> 
        <p className='z-10'>{locale === "ar"? "يرجى تسجيل الدخول للاستمرار":"Please Login First"}</p>
      </div>
    </div>}
  </div>
  )
}

export default Form