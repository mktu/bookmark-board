import React from 'react'
import { Modal } from 'react-responsive-modal';
import Container from './Container'

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

export const Dialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} blockScroll center focusTrapped={false} onClose={onClose} classNames={{
            modal: 'w-full md:w-1/3',
        }} styles={{
            modal: {
                margin: 0
            }
        }}>
            {children}
        </Modal>
    )
}

export default Container