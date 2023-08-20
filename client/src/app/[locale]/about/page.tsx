/* eslint-disable react-hooks/rules-of-hooks */
import ShortNavbar from '@/components/ShortNavbar'
import Title from '@/components/UI/typography/Title'
import Image from 'next/image'
import { FC } from 'react'
import parse from 'html-react-parser';

import About from '@/components/sections/About';

import aboutUsImg from '@/images/about-us.png'
import visionImg from '@/images/vision.png'
import companyIdentificationImg from '@/images/company-identification.png'
import qualityAssuranceImg from '@/images/quality-assurance.png'
import qualityControlImg from '@/images/quality-control.png'
import objectivesImg from '@/images/objectives.png'

import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import Agents from '@/components/sections/Agents';
import Footer from '@/components/Footer/Footer';
import Browse from '@/components/sections/Browse';
interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('aboutUs')
  return <div>
    <ShortNavbar />
    <main className="py-4 sm:py-8 mx-auto">
      <div className='max-sm:container flex flex-col sm:flex-row items-center gap-8'>
        <div className="relative flex-1">
          <Image
            src={aboutUsImg}
            alt={'About Us'}
            width={aboutUsImg.width}
            height={aboutUsImg.height}
            className='w-full h-auto flex-1'
          />
        </div>
        <div className="sm:w-1/2 sm:mx-8 ">
          <div className="flex items-start">
            <Title variant='doubleBorder' borderDirection='right' className='pl-0'>
              {t('aboutUs')}
            </Title>
          </div>
          <p className='mt-4 ltr:pl-4 rtl:pl-4 sm:p-0'>
            {t('aboutUsDescription')}
          </p>
        </div>

      </div>
      <div className='max-sm:container mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-8'>
        <div className="sm:w-1/2 sm:mx-8">
          <div className="flex items-start">
            <Title variant='doubleBorder' borderDirection='left' className='pr-0'>
              {t('ourVision')}
            </Title>
          </div>
          <p className='mt-4 ltr:pl-4 rtl:pl-4 sm:p-0'>
            {parse(t('ourVisionDescription').replaceAll('\n', '<br>'))}
          </p>
        </div>
        <div className="relative flex-1">
          <Image
            src={visionImg}
            alt={'vision'}
            width={visionImg.width}
            height={visionImg.height}
            className='w-full h-auto flex-1'
          />
        </div>
      </div>
      <div className="py-8 sm:py-16">
        <Title variant='default' className='text-center'>
          {t('subtitle')}
        </Title>
      </div>
      <div className="container">
        <About
          className='mt-8'
          title={t('companyIdentification')}
          titleVariant='doubleBorder'
          body={t('companyIdentificationDescription').replaceAll('\n', '<br>')}
          img={companyIdentificationImg}
          roundedImg={true}
          direction='right'
        />
        <About
          className='mt-8'
          title={t('qualityAssurance')}
          titleVariant='doubleBorder'
          body={t('qualityAssuranceDescription').replaceAll('\n', '<br>')}
          img={qualityAssuranceImg}
          roundedImg={true}
          direction='left'
        />
        <About
          className='mt-8'
          title={t('qualityControl')}
          titleVariant='doubleBorder'
          body={t('qualityControlDescription').replaceAll('\n', '<br>')}
          img={qualityControlImg}
          roundedImg={true}
          direction='right'
        />
      </div>
    </main>
    <NextIntlClientProvider locale={locale}>
      <div className="relative">
        <Browse />
      </div>
    </NextIntlClientProvider>
    <Agents />
    <Footer />
  </div>
}

export default page