"use client"
import {useState, useEffect} from 'react'
import axios from 'axios'
import Image from 'next/image'
import LoadingImg from '@/images/gallery/1.png'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AlertDialogSlide from './dialog'
import { Error } from '@/components/toast';
import { Api, ApiKey } from '@/config/api'
import { useLocale } from 'next-intl'

function ProductsList() {
    const locale = useLocale()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    axios.defaults.headers['api-key'] = ApiKey;
    axios.defaults.headers['content-type'] = "application/json";
    // axios.defaults.headers['Access-Control-Allow-Origin'] ="*";
    axios.defaults.withCredentials = true;
    
    const productsGrid = [
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
          field: "arName",
          headerName: "Arabic Name",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "enName",
          headerName: "English Name",
          width: "150",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "category",
          headerName: "Category Name",
          width: "170",
          textAlign: "Center",
          editable: false,
        },
        {
          field: "productImg",
          headerName: "Image",
          width: "300",
          textAlign: "Center",
          editable: false,
        },
      ];
    const [productsData, setProductsData] = useState([
        {
        _id: 0,
        arName: "",
        enName: "",
        category: "",
        productImg: LoadingImg
        }
    ])
    const [selectedRows, setSelectedRows] = useState([]);

    
    useEffect(()=>{
        const url = `${Api}/products/en`
        const getData = async() => {
            await axios.get(url)
            .then(data=>{
                const template = data?.data?.map((_, i)=>{
                    return {
                        _id: _?._id,
                        arName: _?.arName,
                        enName: _?.enName,
                        category: _?.category?.title?.en || "none",
                        productImg: _?.productImg
                    }
                })
                setProductsData(template)
            })
            .catch(e=>{console.log(e); Error("Error while loading data")})
        }
        
        if(localStorage.getItem('token')) {
          setIsLoggedIn(true)
          getData()
        }
    }, [])

  return (
    <div className='h-full w-full'>{
      isLoggedIn
        ?<Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={productsData}
                getRowId={(row) => row._id}
                columns={productsGrid}
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
        :<div className="h-full w-full flex items-center justify-center text-red-400 font-bold text-2xl p-6 md:p-12"> 
          <p className='z-10'>{locale === "ar"? "يرجى تسجيل الدخول للاستمرار":"Please Login First"}</p>
        </div>}
        <AlertDialogSlide selectedIDs={selectedRows}/>
    </div>
  )
}

export default ProductsList