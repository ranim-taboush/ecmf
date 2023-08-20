import Image from 'next/image'

import contactUsBg from '@/images/contact-us-page-bg.png'
import { useTranslations } from 'next-intl'
import Input from '@/components/UI/Input.jsx'
import Button from '@/components/UI/Button'

const Form = ({ }) => {
  const t = useTranslations('contactUs');

  return <div className="relative mt-4 sm:mt-8 rounded-md overflow-hidden">

    <div className="absolute inset-0 ">
      <Image
        src={contactUsBg}
        alt={t('title')}
        width={contactUsBg.width}
        height={contactUsBg.height}
        className='w-full h-full rounded-xl'
      />
    </div>
    <div className="relative h-full grid sm:grid-cols-2 items-center">
      <div className="py-12 sm:py-24 px-8 sm:px-16">
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