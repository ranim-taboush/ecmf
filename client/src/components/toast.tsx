import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Success = (msg: string) => {
    toast.success(msg, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-success',
        style: {
            minWidth: '200px',
            maxWidth: '400px',
        },
    });
}

export const Error = (msg: string) => {
    toast.error(msg, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'toast-error',
        style: {
            minWidth: '200px',
            maxWidth: '400px',
        },
    });
}