import React, { useContext, useState } from 'react'
import { useBookmarkById } from '../../../../modules/bookmarkSlice'
import { Modal } from 'react-responsive-modal';
import { TextInput,TextArea } from '../../../Common/Input'
import { Label } from '../../../Common/Label'
import FirebaseContext from '../../../../context/FirebaseContext'
import { numberToDateTime } from '../../../../utils'

type Props = {
    bookmarkId: string
}

const Bookmark: React.FC<Props> = ({
    bookmarkId
}) => {
    const bookmark = useBookmarkById(bookmarkId)
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const updateBookmark = (key: keyof Bookmark) => (value: string) => {
        setStatus('loading')
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            [key]: value
        }, () => {
            setStatus('loaded')
        }, (e) => {
            setStatus('failed')
            console.error(e)
        })
    }
    if (!bookmark) {
        return <div />
    }
    return (
        <div className='flex flex-col '>
            <div className='flex items-center'>
                <div>
                    <img className='w-32 border-primary-border border' src={bookmark.image} />
                </div>
                <div className='w-full overflow-hidden p-4'>
                    <Label htmlFor='title'>Title</Label>
                    <TextInput id='title' value={bookmark.title} handleSubmit={updateBookmark('title')} />
                    <Label htmlFor='description' className='my-4'>Description</Label>
                    <TextArea id='description'  maxRows={4} value={bookmark.description} handleSubmit={updateBookmark('description')} />
                </div>
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='url'>URL</Label>
                <TextInput id='url' value={bookmark.url} handleSubmit={updateBookmark('url')} />
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='comment' className='mb-4'>ひとこと</Label>
                <TextArea id='comment' value={bookmark.comment} handleSubmit={updateBookmark('comment')} />
            </div>
            <div className='p-2 mt-8 flex flex-col items-end justify-center'>
                {status === 'loading' ? (
                    <p className=' text-primary-400 text-xs'>更新中...</p>
                ) : (
                        <p className=' text-primary-400 text-xs'>{bookmark.lastUpdate && `更新日時   ${numberToDateTime(bookmark.lastUpdate)}`}</p>
                    )}
                <p className=' text-primary-400 text-xs'>{`作成日時   ${numberToDateTime(bookmark.created)}`}</p>
            </div>
        </div>
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
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-2/3',
            overlay: 'bg-red-500'
        }}>
            {children}
        </Modal>
    )
}

export default Bookmark