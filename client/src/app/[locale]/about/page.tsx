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
import qualityControlImg from '@/images/quality-control1.png'
import objectivesImg from '@/images/objectives.png'

import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl';
import Agents from '@/components/sections/Agents';
import Footer from '@/components/Footer/Footer';
interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const locale = useLocale()
  const t = useTranslations('aboutUs')
  return <div>
    <ShortNavbar />
    <main className="py-4 sm:py-8 mx-auto">
      
      <div className="container">
        <About
          className='mt-8'
          title={t('aboutUs')}
          titleVariant='doubleBorder'
          body={t('aboutUsDescription').replaceAll('\n', '<br>')}
          img={aboutUsImg}
          roundedImg={true}
          direction='left'
        />
        <About
          id='vision'
          className='mt-8'
          title={t('ourVision')}
          titleVariant='doubleBorder'
          body={t('ourVisionDescription').replaceAll('\n', '<br>')}
          img={visionImg}
          roundedImg={true}
          direction='right'
        />
      </div>
      <div className="py-8 sm:py-16">
        <Title variant='default' className='text-center'>
          {t('subtitle')}
        </Title>
      </div>
      <div className="container">
        <About
          id='mission'
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
          id='quality'
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
    <Agents />
    <NextIntlClientProvider locale={locale}>
      <Footer />
    </NextIntlClientProvider>
  </div>
}

export default page