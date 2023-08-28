"use client"
import Image from 'next/image'
import contactUsBg from '@/images/contact-us-page-bg.png'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'

const Form = ({ }) => {
  const locale = useLocale()
  const localTime = new Date().toLocaleString('en-CA').split(', ') //2023-08-27, 9:29:04 a.m.
  const today = localTime[0]
  const [date, setDate] = useState(today)
  const [time, setTime] = useState("09:00")
  
    const contactEn ={
      "title" : "Contact Us",
      "description" : "Get in touch with us",
      "name" : "Name",
      "namePlaceholder" : "Hamed Osama",
      "email" : "Email",
      "emailPlaceholder" : "hamed@trendlix.com",
      "message" : "Message",
      "messagePlaceholder" : "Type your query here.....",
      "date": "Date",
      "time": "Time", 
      "comment": "Comment",
      "commentPlaceholder": "Type your comment here",
      "submit" : "Send"
    }
    const contactAr ={
      title : "تواصل معنا",
      description : "ابق على تواصل معنا",
      name : "الاسم",
      namePlaceholder : "حامد اسامه",
      email : "البريد الالكتروني",
      emailPlaceholder : "hamed@trendlix.com",
      message : "التعليق",
      messagePlaceholder : "اكتب ما تريده",
      date: "التاريخ",
      time: "الوقت",
      comment: "التعليق",
      commentPlaceholder: "اكتب تعليقك هنا",
      submit : "ارسال"
    }

  return <div className="relative mt-4 sm:mt-8 rounded-md overflow-hidden">

    <div className="absolute inset-0 ">
      <Image
        src={contactUsBg}
        alt={locale ==='ar'? contactAr.title: contactEn.title}
        width={contactUsBg.width}
        height={contactUsBg.height}
        className='w-full h-full rounded-xl'
      />
    </div>
    <div className="relative h-full grid sm:grid-cols-2 items-center">
      <div className="py-12 sm:py-24 px-8 sm:px-16">
        <p className='text-xl sm:text-3xl text-white'>
        {locale ==='ar'? contactAr.description: contactEn.description}
        </p>
        <div className="flex flex-col gap-6 mt-4">

        <Input
              label={locale === 'ar'? contactAr.name: contactEn.name}
              name='name'
              placeholder={locale === 'ar'? contactAr.namePlaceholder: contactEn.namePlaceholder}
            />
            <Input
              label={locale === 'ar'? contactAr.email: contactEn.email}
              name='email'
              placeholder={locale === 'ar'? contactAr.emailPlaceholder: contactEn.emailPlaceholder}
            />
            <Input
              label={locale === 'ar'? contactAr.message: contactEn.message}
              name='message'
              placeholder={locale === 'ar'? contactAr.messagePlaceholder: contactEn.messagePlaceholder}
              className=" !h-36"
            />
            <div className="grid grid-cols-4">
              <div className='col-span-2'>
              <Input
                label={locale === 'ar'? contactAr.date: contactEn.date}
                name='date'
                type="date"
                min={today}
                max={`${parseInt(today.split("-")[0])+2}-${today.split('-')[1]}-${today.split('-')[2]}`}
                value={date}
                onChange={(e)=> {setDate(e.target.value); }}
              />
              </div>
              <div className='col-span-1'></div>
              <div className='col-span-1'>
                <Input
                  label={locale === 'ar'? contactAr.time: contactEn.time}
                  name='time'
                  type="time"
                  value={time}
                  onChange={(e)=> {setTime(e.target.value); }}
                />
              </div>
            </div>
            <Input
              label={locale === 'ar'? contactAr.comment: contactEn.comment}
              name='comment'
              placeholder={locale === 'ar'? contactAr.commentPlaceholder: contactEn.commentPlaceholder}
              style={{height: "56px"}}
            />
            <Button className='w-fit px-6'>
              {locale === 'ar'? contactAr.submit: contactEn.submit}
            </Button>
        </div>

      </div>
      <div className="w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.217877707041!2d31.051544199999995!3d30.059288599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585b3d46b69aed%3A0xf966cc85fdd4cb55!2z2KfZhNi02LHZg9ipINin2YTZh9mG2K_Ys9mK2Kkg2YTYqti02YPZitmEINin2YTZhdi52KfYr9mG!5e0!3m2!1sar!2seg!4v1687783898541!5m2!1sar!2seg"
          width="100%"
          height="100%"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className='max-sm:h-96'
        >
        </iframe>
      </div>
    </div>
  </div>
}

export default Form