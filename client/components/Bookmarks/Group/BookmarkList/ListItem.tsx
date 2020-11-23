import React, { useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRouter } from 'next/router'
import { PlaceHolderImg } from '../../../Common/Image'
import { ExternalLink, Duplicate, Trash } from '../../../Common/Icon'
import { SvgIconButton } from '../../../Common/Button'
import { useBookmarkById } from '../../../../modules/bookmarkSlice'
import { useGroupById } from '../../../../modules/groupSlice'
import { copyToClipBoard } from '../../../../utils'
import { toast } from 'react-toastify';
import FirebaseContext from '../../../../context/FirebaseContext'

type Props = {
    bookmarkId: string,
    setHover: (idx: number) => void,
    idx: number
}

const ListItem: React.FC<Props> = ({
    bookmarkId,
    setHover,
    idx
}) => {
    const router = useRouter()
    const bookmark = useBookmarkById(bookmarkId)
    const { description } = bookmark
    const { clientService } = useContext(FirebaseContext)
    const group = useGroupById(bookmark.groupId)
    const { listViewMask = [] } = group || {}
    const [{ dragging }, drag] = useDrag({
        item: {
            id: bookmark.id,
            name: bookmark.title,
            idx: bookmark.idx,
            type: 'LIST'
        },
        collect: (monitor) => ({
            dragging: monitor.isDragging(),
        }),
        begin: () => {
            setHover(idx)
        },
        end: () => {
            setHover(-1)
        }
    })
    const [, drop] = useDrop({
        accept: 'LIST',
        hover: (_, monitor) => {
            if (monitor.getDifferenceFromInitialOffset().y < 0) {
                setHover(idx)
            }
            else {
                setHover(idx + 1)
            }
        }
    })
    return (
        <div ref={(v) => {
            drag(v)
            drop(v)
        }} className={`w-full ${dragging && 'hidden'} flex items-center cursor-pointer`} onClick={() => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${bookmark.groupId}/${bookmark.id}`, { shallow: true })
        }}>
            <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50'>
                <div className='mr-2 pr-2 overflow-hidden border-primary-border border-r flex items-center'>
                    {bookmark.image ? (
                        <img src={bookmark.image} className='w-16' />
                    ) : (
                            <PlaceHolderImg className='w-16' />
                        )}
                </div>
                <div className='flex flex-col items-start justify-center w-8/12'>
                    <div className='overflow-hidden truncate max-w-full'>{bookmark.title || bookmark.url}</div>
                    {!listViewMask.includes('description') && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}
                    {!listViewMask.includes('url') && (<div className='overflow-hidden truncate text-xs text-primary-main font-thin max-w-full' > {bookmark.url}</div>)}
                </div>
                <div className='ml-auto flex items-center'>
                    <SvgIconButton className='block' onClick={(e) => {
                        copyToClipBoard(bookmark.url,()=>{
                            toast.success('クリップボードにURLをコピーしました',)
                        })
                        e.stopPropagation()
                    }}>
                        <Duplicate className='w-6' strokeWidth='1.5px' />
                    </SvgIconButton>
                    <SvgIconButton className='block ml-3' onClick={() => {
                        window && window.open(
                            bookmark.url,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                        <ExternalLink className='w-6' strokeWidth='1.5px' />
                    </SvgIconButton>
                    <SvgIconButton className='block ml-3' onClick={() => {
                        clientService.deleteBookmark(bookmark.groupId, bookmark.id)
                    }}>
                        <Trash className='w-6' strokeWidth='1.5px' />
                    </SvgIconButton>
                </div>
            </div>
        </div>
    )
}

export default ListItem