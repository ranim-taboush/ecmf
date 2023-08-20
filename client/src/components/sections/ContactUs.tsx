import { FC } from 'react'
import Title from '../UI/typography/Title'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Image from 'next/image'

import mapImg from '@/images/map.png'
import contactUsBg from '@/images/contact-us-bg.png'
import { useTranslations } from 'next-intl'

interface ContactUsProps {

}

const ContactUs: FC<ContactUsProps> = ({ }) => {
  const t = useTranslations('contactUs');

  return <div className='relative mt-8'>
    <div className="absolute inset-0 ">
      <Image
        src={contactUsBg}
        alt={t('title')}
        width={contactUsBg.width}
        height={contactUsBg.height}
        className='w-full h-full'
      />
    </div>
    <div className="container sm:h-screen relative py-12 sm:py-16">
      <div className="flex items-center justify-center">
        <Title variant='doubleBorder' borderDirection='right'>
          {t('title')}
        </Title>
      </div>
      <div className="h-full grid sm:grid-cols-2 items-center gap-8 sm:gap-16 mt-4 sm:-mt-4">
        <div className="">
          <p className='text-xl sm:text-3xl text-white'>
            {t('description')}
          </p>
          <div className="flex flex-col gap-6 mt-4">

            <Input
              label={t('name')}
              name='name'
              placeholder={t('namePlaceholder')}
            />
            <Input
              label={t('email')}
              name='email'
              placeholder={t('emailPlaceholder')}
            />
            <Input
              label={t('message')}
              name='message'
              placeholder={t('messagePlaceholder')}
            />
            <Button className='w-fit px-6'>
              {t('submit')}
            </Button>
          </div>

        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.217877707041!2d31.051544199999995!3d30.059288599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585b3d46b69aed%3A0xf966cc85fdd4cb55!2z2KfZhNi02LHZg9ipINin2YTZh9mG2K_Ys9mK2Kkg2YTYqti02YPZitmEINin2YTZhdi52KfYr9mG!5e0!3m2!1sar!2seg!4v1688778809107!5m2!1sar!2seg"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className='rounded-md w-full sm:w-2/3 mx-auto h-64 sm:h-1/2'
        >

        </iframe>
        {/* <Image
          src={mapImg}
          alt='Map'
          width={mapImg.width}
          height={mapImg.height}
          className='rounded-md w-full sm:w-2/3 lg:1/2 mx-auto'
        /> */}
      </div>
    </div>
  </div>
}

export default ContactUs