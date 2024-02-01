
import { NextIntlClientProvider, useLocale, useTranslations } from 'next-intl'
import Footer from '@/components/Footer/Footer'
import AdminNavbar from '@/components/AdminNavbar'
import Title from '@/components/UI/typography/Title'
import BlogsList from './blogs-list'

function View() {
    const locale = useLocale()
    const t = useTranslations('viewBlogs')

    return <div className='overflow-hidden'>
        <NextIntlClientProvider locale={locale}>
          <AdminNavbar />
        </NextIntlClientProvider>
        <main className="py-4 sm:py-8 container mx-auto">
            <div className="flex flex-col items-center justify-center">
                <Title variant='doubleBorder' className='text-center my-8 pl-0' borderDirection='right'>
                    {t('title')}
                </Title>
                <NextIntlClientProvider locale={locale}>
                    <BlogsList />
                </NextIntlClientProvider>
            </div>
        </main>
        <NextIntlClientProvider locale={locale}>
            <Footer />
        </NextIntlClientProvider>
    </div>
}

export default View