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

function Form() {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [docu, setDocu] = useState()
  const [arDocu, setArDocu] = useState()
  const [tags, setTags] = useState()
  const [form, setForm] = useState({ 
    title: "", arTitle: "" ,
    topic: "", arTopic: "",
    paragraph: "", arParagraph: "",
    tags: [""],
    coverImgAlt: "",
    coverImg: ""
 })

 useEffect(()=>{
  console.log('docu', docu)
  console.log('arDocu', arDocu)
 }, [docu])

 const sendForm = async () => {
  if(form.coverImg){
    setIsLoading(true)
    const row = {
      title: {ar: form.arTitle, en: form.title},
      topic: {ar: form.arTopic, en: form.topic},
      paragraph: {ar: arDocu, en: docu},
      tags: tags,
      coverImg: form.coverImg
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
        tags: [""],
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
  
  return (
    <form className='max-w-xl px-10 h-full flex justify-center flex-col text-slate-200 max-md:px-0'>
        <p className="text-primary text-7xl font-medium max-xl:text-5xl max-md:text-2xl max-md:text-center">Add new blog!</p>
        <p className="h-10"></p>
        <Input id="title" name="title" type="text" placeholder="Global Warming" required={true} label="Title (English)" value={form.title} onChange={handleChange} />
        <Input id="arTitle" name="arTitle" type="text" placeholder="الاحتباس الحراري" required={true} label="Title (Arabic)" value={form.arTitle} onChange={handleChange} />
        <Input id="coverImg" name="coverImg" type="file" placeholder="Lorem Ipsom..."  accept="image/*" required={true} label="Cover Image" onChange={uploadImgs} />
        <Input id="topic" name="topic" type="text" placeholder="Tech" required={true} label="Topic (English)" value={form.topic} onChange={handleChange} />
        <Input id="arTopic" name="arTopic" type="text" placeholder="التكنولوجيا" required={true} label="Topic (Arabic)" value={form.arTopic} onChange={handleChange} />
        <div className="py-2" style={{direction: "ltr"}}>
          <p className="text-white text-base sm:text-lg font-light px-1">Paragraph (English)</p>
          <Editor setDocu={setDocu} />
        </div>
        <div className="py-2">
          <p className="text-white text-base sm:text-lg font-light px-1" style={{direction: "rtl"}}>Paragraph (Arabic)</p>
          <Editor setDocu={setArDocu} />
        </div>
        <TagsInput value={tags} onChange={setTags} name="tags" placeHolder="tags" /> 

        <Button type="submit" className="mt-4 self-end" onClick={handleSubmit} isLoading={isLoading}>
          Create Blog
        </Button>
    </form>
  )
}

export default Form