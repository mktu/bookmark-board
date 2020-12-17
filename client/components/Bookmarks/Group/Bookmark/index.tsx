import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useBookmarkById } from '../../../../modules/bookmarkSlice'
import { useGroupsByUser } from '../../../../modules/groupSlice'
import { useProfile } from '../../../../modules/profileSlice'
import { Modal } from 'react-responsive-modal';
import { TextInput, TextArea, Dropdowns } from '../../../Common/Input'
import { LoadingImg } from '../../../Common/Image'
import { OutlinedButton, SvgIconButton, TextButton } from '../../../Common/Button'
import { ExternalLink, HeartFill, Refresh } from '../../../Common/Icon'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { Label } from '../../../Common/Label'
import FirebaseContext from '../../../../context/FirebaseContext'
import { numberToDateTime } from '../../../../utils'
import { fetchLinkPreview } from '../../../../logics'

type Props = {
    bookmarkId: string
}

const Bookmark: React.FC<Props> = ({
    bookmarkId
}) => {
    const profile = useProfile()
    const router = useRouter()
    const groups = useGroupsByUser(profile.id)
    const bookmark = useBookmarkById(bookmarkId)
    const group = groups.find(g => bookmark && g.id === bookmark.groupId)
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const [moveDest, setMoveDest] = useState(group)
    const updateBookmark = (key: keyof Bookmark) => (value: string) => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            [key]: value
        })
    }
    if (!bookmark) {
        return <div />
    }
    const likes = bookmark.reactions['likes'] || []
    const sentLikes = likes.includes(profile.id)
    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <div className='flex flex-col'>
                    <div>
                        {status === 'loading' ? (<LoadingImg className='w-32' />) : (
                            <img className='w-32 border-primary-border border' src={bookmark.image} />
                        )}
                    </div>
                    <TooltipDivContainer content='説明や画像の情報を再度取得します' placement='bottom'>
                        <TextButton className='my-4 text-xs flex items-center justify-center' fontType='none' onClick={() => {
                            setStatus('loading')
                            fetchLinkPreview(bookmark.url).then(result => {
                                clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
                                    title: result.title,
                                    description: result.description || '',
                                    image: result.images.length > 0 && result.images[0]
                                },()=>{
                                    setStatus('loaded')
                                },(err)=>{
                                    setStatus('failed')
                                    console.error(err)
                                })
                            })
                        }}>
                            <Refresh className='w-4 stroke-primary-500 mr-2' strokeWidth={1.5} />
                            <span>情報再取得</span>
                        </TextButton>
                    </TooltipDivContainer>

                </div>
                <div className='w-full overflow-hidden p-4'>
                    <div className='flex items-center'>
                        <div className='w-full flex-1'>
                            <Label htmlFor='title'>Title</Label>
                            <TextInput disabled={status==='loading'} id='title' value={bookmark.title} handleSubmit={updateBookmark('title')} />
                        </div>
                        <SvgIconButton onClick={() => {
                            clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
                                reactions: {
                                    ...bookmark.reactions,
                                    likes: sentLikes ? likes.filter(t => t !== profile.id) : Array.from(new Set([...likes, profile.id]))
                                }
                            })
                        }}
                            className={`flex items-end ${sentLikes ? 'fill-secondary-main hover:fill-secondary-300' : 'fill-primary-300 hover:fill-primary-main'}`}>
                            <div className={`rounded-full p-1 ${sentLikes ? 'bg-secondary-light' : 'bg-primary-light'}`}><HeartFill className='w-6' strokeWidth={0} /></div>
                            {likes.length > 0 && (
                                <div className={`text-xs ${sentLikes ? 'text-secondary-main' : 'text-primary-main'}`}>{likes.length}</div>
                            )}
                        </SvgIconButton>
                    </div>
                    <Label htmlFor='description' className='my-4'>Description</Label>
                    <TextArea id='description' disabled={status==='loading'} maxRows={4} value={bookmark.description} handleSubmit={updateBookmark('description')} />
                </div>
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='url'>URL</Label>
                <div className='flex items-center'>
                    <TextInput className='flex-1' id='url' value={bookmark.url} handleSubmit={updateBookmark('url')} />
                    <SvgIconButton onClick={() => {
                        window && window.open(
                            bookmark.url,
                            '_blank'
                        );
                    }}>
                        <ExternalLink className='w-6' strokeWidth={2} />
                    </SvgIconButton>
                </div>

            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='comment' className='mb-4'>ひとこと</Label>
                <TextArea id='comment' value={bookmark.comment} handleSubmit={updateBookmark('comment')} />
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='comment' className='mb-4'>グループを移動</Label>
                <div className='flex items-center'>
                    <Dropdowns placement='bottom' options={groups.map(g => ({ label: g.name, value: g.id }))} selected={{ label: moveDest.name, value: moveDest.id }} onSelect={(s) => {
                        setMoveDest(groups.find(g => g.id === s))
                    }} />
                    <OutlinedButton disabled={moveDest.id === group.id} className='ml-auto' colorType='secondary' onClick={() => {
                        clientService.moveGroup(bookmark, moveDest.id, () => {
                            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${group.id}`, { shallow: true })
                        })
                    }}>
                        移動する
                    </OutlinedButton>
                </div>
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