import { useLocale } from 'next-intl';
import Title from '../UI/typography/Title'
import Image from 'next/image';

import ceo1 from '../../images/ceo1.jpg'
import ceo2 from '../../images/ceo2.jpg'
import ceo3 from '../../images/ceo3.jpg'

const Managers = () => {
  const locale = useLocale();

  const data = [
    {arName: "احمد محمد احمد محمد", 
    enName: "Ahmed Mohammed Ahmed Mohammed",
    arLine: "يجب ان تؤمن بحلمك مهما كانت الظروف", 
    enLine: "You must believe in your dream no matter the circumstances", 
    img: ceo1},
    {arName: "احمد محمد احمد محمد", 
    enName: "Ahmed Mohammed Ahmed Mohammed",
    arLine: "يجب ان تؤمن بحلمك مهما كانت الظروف", 
    enLine: "You must believe in your dream no matter the circumstances", 
    img: ceo2},
    {arName: "احمد محمد احمد محمد", 
    enName: "Ahmed Mohammed Ahmed Mohammed",
    arLine: "يجب ان تؤمن بحلمك مهما كانت الظروف", 
    enLine: "You must believe in your dream no matter the circumstances", 
    img: ceo3},
  ]

  const ManagerCard = ({arName, enName, arLine, enLine, img, arRole, enRole}) => {
    return <div className=' rounded-md bg-slate-200 shadow-lg px-4 py-6 mx-auto mt-3 md:py-8 md:px-6 w-1/5 min-w-[150px] flex flex-col justify-around items-center text-center'>
      <div className='w-4/5 md:h-36 sm:h-24 h-16 rounded-full relative'>
        <Image src={img || ceo1} alt='arRole' fill style={{borderRadius:"50%"}}/>
      </div>
      <p className="text-black text-xs sm:text-sm md:text-base">{locale === 'ar'? arName: enName}</p>
      <p className="text-primary text-xs sm:text-sm md:text-base">{locale === 'ar'? arRole ||"مدير": enRole ||"Manager"}</p>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base">{locale === 'ar'? arLine: enLine}</p>
    </div>
  }
  
  return <section className='mt-4 py-8 h-screen'>
    <div className="flex items-center justify-center">
      <Title variant='doubleBorder' borderDirection='right'>
        {locale === "ar"? "المدراء التنفيذيين": "CEOs"}
      </Title>
    </div>
    <div className="flex justify-between items-center max-w-[80%] m-auto mt-6 flex-wrap">
      {data.map((_, i)=>{
        return <ManagerCard key={i} {...data[i]}/>
      })}
    </div>

  </section>
}

export default Managers