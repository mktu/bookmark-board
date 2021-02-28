import React from 'react'
import { Modal } from 'react-responsive-modal';
import Share from './Container'

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const ShareDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-full md:w-2/3',
            overlay: 'bg-red-500'
        }}>
            {children}
        </Modal>
    )
}

export {
    Share,
    ShareDialog
}

export default Share

