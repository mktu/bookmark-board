import React from 'react'
import { Modal } from 'react-responsive-modal';
import Container from './Container'

type Props = {
    bookmarkId: string,
    onClose: () => void
}

const Bookmark: React.FC<Props> = ({
    bookmarkId,
    onClose
}) => {
    if (!bookmarkId) {
        return <div />
    }
    return (
        <Container bookmarkId={bookmarkId} onClose={onClose}/>
    )
}

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
        <Modal open={open} showCloseIcon={false} onClose={onClose} center classNames={{
            modal: 'w-2/3',
            overlay: 'bg-red-500'
        }}>
            {children}
        </Modal>
    )
}

export default Bookmark