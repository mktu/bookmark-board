import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRouter } from 'next/router'
import { PlaceHolderImg } from '../../../Common/Image'
import { ExternalLink, Duplicate, Trash, Chat, Refresh } from '../../../Common/Icon'
import { SvgIconButton, HeartButton } from '../../../Common/Button'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { useGroupById } from '../../../../modules/groupSlice'
import { copyToClipBoard, numberToDateTime } from '../../../../utils'
import { toast } from 'react-toastify';
import { useBookmark } from '../../../../hooks/useBookmark'

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
    const { 
        bookmark,
        sentLikes,
        handleLikes,
        deleteBookmark,
        handleJumpLink
     } = useBookmark(bookmarkId)
    const { description } = bookmark
    const group = useGroupById(bookmark.groupId)
    const { listViewMask = [] } = group || {}
    const [{ dragging }, drag] = useDrag({
        item: {
            id: bookmark.id,
            name: bookmark.title,
            idx: bookmark.idx,
            groupId: bookmark.groupId,
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
        }} className={`w-full ${dragging && 'hidden'} flex items-center cursor-pointer`} role='button' onClick={() => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${bookmark.groupId}/${bookmark.id}`, { shallow: true })
        }} style={bookmark.color ?{
            borderLeft : `5px solid ${bookmark.color}`
        }:{}}>
            <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50'>
                <div className='mr-2 pr-2 overflow-hidden border-primary-border border-r flex items-center'>
                    {bookmark.image ? (
                        <img src={bookmark.image} className='w-16' />
                    ) : (
                            <PlaceHolderImg className='w-16' />
                        )}
                </div>
                <div className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1'>
                    <div className='overflow-hidden truncate max-w-full'>{bookmark.title || bookmark.url}</div>
                    {!listViewMask.includes('description') && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}
                    {!listViewMask.includes('url') && (<div className='overflow-hidden truncate text-xs text-primary-main font-thin max-w-full' > {bookmark.url}</div>)}
                    {!listViewMask.includes('comment') && bookmark.comment && (
                        <div className='text-xs text-primary-main font-thin max-w-full flex items-center py-1' >
                            <Chat className='w-6 stroke-primary-300 mr-1' strokeWidth={2} />
                            <div className='overflow-hidden truncate flex-1'>
                                {bookmark.comment}
                            </div>
                        </div>)}
                    {!listViewMask.includes('lastUpdate') && bookmark.lastUpdate && (<div className='mt-auto pt-1 overflow-hidden truncate text-xs text-primary-main font-thin max-w-full flex items-center' > 
                    <span className='mr-1'><Refresh className='w-4 stroke-primary-main'/></span>
                    <span>{numberToDateTime(bookmark.lastUpdate)}</span>
                    </div>)}
                </div>
                <div className='ml-auto flex flex-col justify-start'>
                    <div className='flex items-start'>
                        <TooltipDivContainer content='コピー' placement='bottom'>
                            <SvgIconButton className='mx-1' onClick={(e) => {
                                copyToClipBoard(bookmark.url, () => {
                                    toast.success('クリップボードにURLをコピーしました',)
                                })
                                e.stopPropagation()
                            }}>
                                <Duplicate className='w-5' strokeWidth={1.5} />
                            </SvgIconButton>
                        </TooltipDivContainer>
                        <TooltipDivContainer content='URLを開く' placement='bottom'>
                            <SvgIconButton className='mx-1' onClick={(e) => {
                                e.stopPropagation()
                                handleJumpLink()
                            }}>
                                <ExternalLink className='w-5' strokeWidth={1.5} />
                            </SvgIconButton>
                        </TooltipDivContainer>
                        <TooltipDivContainer content='削除' placement='bottom'>
                            <SvgIconButton className='mx-1' onClick={(e) => {
                                e.stopPropagation()
                                deleteBookmark()
                            }}>
                                <Trash className='w-5' strokeWidth={1.5} />
                            </SvgIconButton>
                        </TooltipDivContainer>
                    </div>
                    <div className='mt-auto flex items-center justify-end'>
                        <HeartButton
                            size='w-4'
                            active={sentLikes}
                            onClick={(e)=>{
                                e.stopPropagation()
                                handleLikes()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem