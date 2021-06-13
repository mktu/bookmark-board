import React from 'react'
import { Modal } from 'react-responsive-modal';

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const Dialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} blockScroll focusTrapped={false} onClose={onClose} classNames={{
            modal: 'w-full',
        }} styles={{
            modal : {
                margin : 0
            }
        }}>
            {children}
        </Modal>
    )
}

export default Dialog