"use client"
import { useState } from "react"
// import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import axios from "axios"
import { useRouter } from "next/navigation"
import { Success, Error } from '@/components/toast';
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'
import { Api, ApiKey } from '@/config/api'
// import Swal from 'sweetalert2'

function Form() {
  axios.defaults.headers['api-key'] = ApiKey;
  axios.defaults.headers['content-type'] = "application/json";
  const router = useRouter()
  const [form, setForm] = useState({ password: "", username: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${Api}/seo/login`, {...form})
    .then(data=> {
      localStorage.setItem('seo-token', data?.data?.tokens[ data?.tokens?.length-1 || [0]])
      Success('Loggedin success')
      router.replace('/admin/seo/view-blog')
    })
    .catch(e=>{
      console.log(e)
      Error('register failed')
      Error(e?.response?.data)
    })
  }

  const handleChange = (e) => {
    setForm(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <form className='max-w-xl px-10 h-full flex justify-center flex-col text-slate-200'>
        <p className="text-primary text-7xl font-medium">Welcome!</p>
        <p className="">Enter your email and password to login</p>
        <p className="h-10"></p>
        <Input id="username" name="username" type="username" placeholder="Your username" required={true} label="User Name" value={form.username} onChange={handleChange} />
        <Input id="password" name="password" type="password" required={true} label="Password" value={form.password} onChange={handleChange} />
        {/* <ToggleBox id="remember" isChecked={isChecked} label="Remember me" onChange={()=>setIsChecked(prev=>!prev)} /> */}
        <Button type="submit" className="mt-4 self-end" onClick={handleSubmit}>
          Login
        </Button>
    </form>
  )
}

export default Form