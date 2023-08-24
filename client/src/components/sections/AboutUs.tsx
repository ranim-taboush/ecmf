import Image from 'next/image'
import { FC } from 'react'

import aboutUsImg from '@/images/about-us.png'
import visionImg from '@/images/vision.png'
import Title from '../UI/typography/Title'
import About from './About'
import { useTranslations } from 'next-intl'
interface AboutUsProps {

}

const AboutUs: FC<AboutUsProps> = ({ }) => {
  const t = useTranslations('about')
  return <section className="py-4 sm:py-8 mx-auto">
    <div className="container">
      <About
        title={t('aboutUs')}
        titleVariant='doubleBorder'
        body={t('aboutUsDescription')}
        img={aboutUsImg}
        direction='left'
      />
      <About
        className='mt-8'
        title={t('ourVision')}
        titleVariant='doubleBorder'
        body={t('ourVisionDescription').replaceAll('\n', '<br>')}
        img={visionImg}
        direction='right'
      />
    </div>
  </section>
}

export default AboutUs