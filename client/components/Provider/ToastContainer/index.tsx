import React from 'react'
import { ToastContainer } from 'react-toastify';

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

const Container: React.FC<Props> = () => (
    <ToastContainer
        toastClassName={({ type }) => contextClass[type || "default"] +
            " flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
)

export default Container