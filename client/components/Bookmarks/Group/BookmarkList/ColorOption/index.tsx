import React from 'react'
import { Modal } from 'react-responsive-modal';
import Container from './Container'

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const ColorOptionDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-1/2',
        }}>
            {children}
        </Modal>
    )
}

export {
    ColorOptionDialog,
    Container as ColorOptions
}

export default Container