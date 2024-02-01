"use client"
import {useState, useEffect} from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios'
import Image from 'next/image'
import LoadingImg from '@/images/gallery/1.png'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AlertDialogSlide from './dialog'
import { Error } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'
import { useLocale } from 'next-intl'
import adminBg from '@/images/admin-page-bg.jpg'

function BlogsList() {
    const locale = useLocale()
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    axios.defaults.headers['api-key'] = ApiKey;
    axios.defaults.headers['content-type'] = "application/json";
    // axios.defaults.headers['Access-Control-Allow-Origin'] ="*";
    axios.defaults.withCredentials = true;
    
    const blogsGrid = [
        { type: "checkbox", width: "70" },
        {
          field: "_id",
          headerName: "ID",
          width: "120",
          textAlign: "Center",
          isPrimaryKey: true,
          editable: false,
        },
        {
          field: "arTitle",
          headerName: "Arabic Title",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "title",
          headerName: "English Title",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "arTopic",
          headerName: "Arabic Topic",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "topic",
          headerName: "English Topic",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "createdAt",
          headerName: "Created Date",
          width: "170",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "coverImg",
          headerName: "Image",
          width: "300",
          textAlign: "Center",
          editable: false,
          renderCell: (params) => <img src={params.value} alt='blog image' />
        },
      ];
    const [blogsData, setBlogsData] = useState([
        {
        _id: 0, title: "", arTitle: "", topic: "", arTopic: "",
        createdAt: "", coverImg: LoadingImg
        }
    ])
    const [selectedRows, setSelectedRows] = useState([]);

    
    useEffect(()=>{
        const url = `${Api}/blogs`
        const getData = async() => {
            await axios.get(url)
            .then(data=>{
                const template = data?.data?.map((_, i)=>{
                    return {
                        _id: _?._id,
                        arTitle: _?.title?.ar, arTopic: _?.topic?.ar,
                        title: _?.title?.en, topic: _?.topic?.en,
                        createdAt: _?.createdAt?.split("T")[0] || "",
                        coverImg: _?.coverImg
                    }
                })
                setBlogsData(template)
            })
            .catch(e=>{console.log(e); Error("Error while loading data")})
        }
        
        if(localStorage.getItem('seo-token')) {
          setIsLoggedIn(true)
          getData()
        }else{
          router.push('/admin/seo')
        }
    }, [])

  return (
    <div className='h-full w-full'>{
      isLoggedIn
        ?<Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={blogsData}
                getRowId={(row) => row._id}
                columns={blogsGrid}
                initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                selectionModel={selectedRows}
                
                onRowSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                setSelectedRows(selectedIDs);
                }}
            />
        </Box>
        :<div className="relative mt-4 md:mt-8 rounded-md overflow-hidden">
          <div className="absolute inset-0 ">
            <Image src={adminBg} alt='bg' width={adminBg.width} height={adminBg.height} className='w-full h-full rounded-xl blur-md' />
          </div>
          <div className="h-full w-full flex items-center justify-center text-red-400 font-bold text-2xl p-6 md:p-12"> 
            <p className='z-10'>{locale === "ar"? "يرجى تسجيل الدخول للاستمرار":"Please Login First"}</p>
          </div>
        </div>
        }
        {isLoggedIn && <AlertDialogSlide selectedIDs={selectedRows}/>}
    </div>
  )
}

export default BlogsList