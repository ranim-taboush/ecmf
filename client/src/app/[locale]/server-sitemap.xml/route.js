import { getServerSideSitemap } from 'next-sitemap';
import axios from 'axios';
import { lines } from '@/data/lines'; // index ===> lines->lines.length - 1
import { Api } from '@/config/api'
// import load from '../../api/load';
const URL = "https://www.ecmf-eg.com";

async function getData() {
    // Fetch data from external API
    // const res = await fetch('https://api.github.com/repos/vercel/next.js')
    // const repo = await res.json()
    // Pass data to the page via props
    const data = []
    console.log('here is the function start')
    await axios.get(`${Api}/products/en`)
    .then(async products=>{
      // console.log('products', products.data)
      await axios.get(`${Api}/blogs`)
      .then(blogs=>{
      console.log('blogs', blogs)
        data.push({
          lines: lines.map((_, i)=>i), 
          products: products?.data?.map(_=>_?.arName), 
          // blogs: blogs?.data?.map((_)=>(/^[a-zA-Z]+$/.test(_?.slug)?_?.slug :encodeURI(_?.slug)))
          blogs: blogs?.data?.map((_)=>(_.slug))
        })
      }).catch(e=> console.log(e))
    }).catch(e=> console.log(e))

    return data[0]
}

export async function GET() {
    const products = [], blogs = [], lines = [], routes = [], errors = []
    for(let i=0; i<2; i++){
        let locale = i==0? 'en': 'ar'
        await getData().then(data=>{
          console.log('data', data)
          data?.products?.forEach(_=>
            products.push({
              url: `${URL}/${locale}/0/products/${encodeURI(_)}`,
              lastModified: new Date().toISOString(),
              priority: .6,
            })
          )
          data?.blogs?.forEach(_=>
            blogs.push({
              url: `${URL}/${locale}/blogs/${encodeURI(_)}`,
              lastModified: new Date().toISOString(),
              priority: .6,
            })
          )
          data?.lines?.forEach(_=>
            lines.push({
              url: `${URL}/${locale}/lines/${encodeURI(_)}`,
              lastModified: new Date().toISOString(),
              priority: .6,
            })
          )
        }).catch(e=>{ errors.push({message: e.message}) })

        // static pages
        const siteStaticRoutes = ["", "about", "blogs", "terms-of-sale", "0/products", "lines", "products"]
        siteStaticRoutes.forEach(element => {
        if(element === ""){
          routes.push({
            url: `${URL}/${locale}`,
            lastModified: new Date().toISOString(),
            priority: 1
          })
        }else{
          routes.push({
            url: `${URL}/${locale}/${element}`,
            lastModified: new Date().toISOString(),
            priority: .8
          })
        }
    });
    }
    // console.log('blogs', blogs)
    // console.log('lines', lines)
    // console.log('products', products)
    console.log('errors', errors)

  return getServerSideSitemap([...routes, ...products, ...lines, ...blogs])
}
