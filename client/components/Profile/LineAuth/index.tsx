import React from 'react'
import { Modal } from 'react-responsive-modal'
import LineAuth from './Container'

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}
const LineAuthlDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal blockScroll={false} open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-full md:w-1/3',
        }}>
            {children}
        </Modal>
    )
}

export {
    LineAuth,
    LineAuthlDialog
}