import { FC } from 'react'
import Title from '../UI/typography/Title'

import agent1 from '../../images/agent1.png'
import agent2 from '../../images/agent2.png'
import agent3 from '../../images/agent3.png'
import agent4 from '../../images/agent4.png'
import agent5 from '../../images/agent5.png'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface AgentsProps {

}

const Agents: FC<AgentsProps> = ({ }) => {
  const t = useTranslations('global')
  return <section className='container py-8 sm:py-16'>
    <Title variant='default' className='w-full text-center'>
      {t('agentsFor')}
    </Title>
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <div className="relative flex-1 w-full h-full">
        <Image
          src={agent1.src}
          alt="ECMF"
          width={agent1.width}
          height={agent1.width}
          className='w-full h-full'
        />
      </div>
      <div className="relative flex-1 w-full h-full">
        <Image
          src={agent2.src}
          alt="ECMF"
          width={agent2.width}
          height={agent2.width}
          className='w-full h-full'
        />
      </div>
      <div className="relative flex-1 w-full h-full">
        <Image
          src={agent3.src}
          alt="ECMF"
          width={agent3.width}
          height={agent3.width}
          className='w-full h-full'
        />
      </div>
      <div className="relative flex-1 w-full h-full">
        <Image
          src={agent4.src}
          alt="ECMF"
          width={agent4.width}
          height={agent4.width}
          className='w-full h-full'
        />
      </div>
      <div className="relative flex-1 w-full h-full">
        <Image
          src={agent5.src}
          alt="ECMF"
          width={agent5.width}
          height={agent5.height}
          className='w-full h-full'
        />
      </div>
    </div>

  </section>
}

export default Agents