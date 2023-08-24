import Link from 'next/link';

const LittleNav = ({title, locale}) => {

  return <side className='container pt-12 pb-8 mx-auto flex items-start justify-between'>
    <div className="flex justify-start items-center gap-3">
      <Link href='/services' className=' text-gray-400 hover:text-gray-600'>
        {locale === 'ar' ? title?.ar || "خط التقطيع" : title?.en || "Cutting Line"}
      </Link>
      <span> | </span>
      <p className=' text-primary'>
        { (locale === 'ar' ? "منتجات " : "Products Of ")+(locale === 'ar' ? title?.ar || "خط التقطيع" : title?.en || "Cutting Line")}
      </p>
    </div>
  </side>
}

export default LittleNav