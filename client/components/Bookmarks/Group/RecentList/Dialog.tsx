import { Modal } from 'react-responsive-modal'

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}
const RecentDialog: React.FC<DialogProps> = ({
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

export default RecentDialog