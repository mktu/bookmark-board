import React from 'react'
import { Modal } from 'react-responsive-modal'
import Detail from './Container'



type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}
const DetailDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal blockScroll={false} open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-full md:w-2/3',
        }}>
            {children}
        </Modal>
    )
}

export {
    Detail,
    DetailDialog
}