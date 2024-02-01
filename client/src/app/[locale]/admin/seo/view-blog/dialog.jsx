"use client"
import {useState, useEffect} from 'react'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Success, Error } from '@/components/toast';
import { useRouter } from 'next/navigation';
import { Api, ApiKey } from '@/config/api'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  
export default function AlertDialogSlide({selectedIDs}) {
    const router = useRouter();
    axios.defaults.headers['api-key'] = ApiKey;
    axios.defaults.headers['content-type'] = "application/json";
    // axios.defaults.headers['Access-Control-Allow-Origin'] ="*";
    axios.defaults.withCredentials = true;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isDelete = false) => {
        setOpen(false);
        if (isDelete && selectedIDs != []){
            selectedIDs.forEach(async id=>{
                const url = `${Api}/blog/${id}`
                await axios.delete(url)
                .then(data=>{
                    Success(`Blog Deleted`)
                    location.reload()
                }).catch(e=>{console.log(e); Error("Error while deleting data")})
            })
        }
    };

    return (
        <div className='w-full h-full'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Delete Selected Blogs
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Delete this product permenantly from the database?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>handleClose(false)}>No</Button>
                <Button onClick={()=>handleClose(true)}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}