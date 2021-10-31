import React from 'react'
import { ToastContainer, Slide } from 'react-toastify';

type Props = {

}

const contextClass = {
    success: "bg-blue-500",
    error: "bg-red-500",
    info: "bg-gray-500",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

const ToastProvider: React.FC<Props> = () => (
    <ToastContainer
        className='md:opacity-90'
        toastClassName={({ type }) => contextClass[type || "default"] +
            " flex p-2 md:p-1 min-h-10 md:rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        autoClose={5000}
        hideProgressBar
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
)

export default ToastProvider