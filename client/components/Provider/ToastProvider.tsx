import { SvgIconButton } from '@components/Common/Button';
import X from '@components/Common/Icon/X';
import React from 'react'
import { ToastContainer, cssTransition } from 'react-toastify';

const contextClass = {
    success: "bg-blue-500",
    error: "bg-red-500",
    info: "bg-gray-500",
    warning: "bg-orange-400",
    default: "bg-blue-500",
    dark: "bg-white-600 font-gray-300",
};

const Slide = cssTransition({
    enter: `Toastify--animate-icon Toastify__slide-enter`,
    exit: `Toastify--animate-icon Toastify__slide-exit`,
    collapseDuration: 300,
    appendPosition: true
});

const ToastProvider: React.FC = () => (
    <ToastContainer
        toastClassName={({ type }) => contextClass[type || "default"] +
            " flex p-2 md:p-1 min-h-10 md:rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        autoClose={5000}
        hideProgressBar
        closeButton={({ closeToast, ariaLabel }) => (
            <SvgIconButton aria-label={ariaLabel} onClick={closeToast}><X strokeWidth={2} className='mr-2 h-5 w-5 stroke-white' /></SvgIconButton>
        )}
        transition={Slide}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        icon={false}
        pauseOnHover
    />
)

export default ToastProvider