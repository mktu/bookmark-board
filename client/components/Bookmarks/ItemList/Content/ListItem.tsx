import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { PlaceHolderImg } from '../../../Common/Image'
import { ExternalLink, CheckFill } from '../../../Common/Icon'
import { SvgIconButton, ButtonBase } from '../../../Common/Button'
import { useBookmarkById } from '../../../../modules/bookmarkSlice'

export type HoverItem = {
    id: string,
    idx: number,
    direction: 'toUpper' | 'toLower'
}
type Props = {
    bookmarkId: string,
    setHover: (idx: number) => void,
}

const ListItem: React.FC<Props> = ({
    bookmarkId,
    setHover,
}) => {
    const bookmark = useBookmarkById(bookmarkId)
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
            setHover(bookmark.idx)
        },
        end: () => {
            setHover(-1)
        }
    })
    const [_, drop] = useDrop({
        accept: 'LIST',
        hover: (_, monitor) => {
            if (monitor.getDifferenceFromInitialOffset().y < 0) {
                setHover(bookmark.idx)
            }
            else {
                setHover(bookmark.idx + 1)
            }
        }
    })

    const [showCheck, setShowCheck] = useState(false)

    return (
        <div ref={(v) => {
            drag(v)
            drop(v)
        }} className={`w-full ${dragging && 'hidden'} flex items-center cursor-pointer`} onMouseOver={() => { setShowCheck(true) }} onMouseLeave={() => { setShowCheck(false) }}>
            <div className='p-2 flex items-center bg-white w-full shadow hover:bg-gray-50'>
                <div className={true ? 'w-0' :  `overflow-hidden`}>
                    <SvgIconButton variant='inherit' className={`mr-2 pr-2 border-primary-border border-r`}>
                        <CheckFill className='w-8 fill-primary-200 hover:fill-primary-main' />
                    </SvgIconButton>
                </div>
                <div className='mr-2 pr-2 overflow-hidden border-primary-border border-r'>
                    {bookmark.image ? (
                        <img src={bookmark.image} className='w-16' />
                    ) : (
                            <PlaceHolderImg className='w-16' />
                        )}
                </div>
                <div className='flex flex-col items-start w-8/12'>
                    <div className='overflow-hidden truncate max-w-full'>{bookmark.title || bookmark.url}</div>
                    <div className='overflow-hidden truncate text-xs text-primary-main max-w-full' > {bookmark.description}</div>
                    <div className='overflow-hidden truncate text-xs text-primary-main font-thin max-w-full' > {bookmark.url}</div>
                </div>
                <div className='ml-auto'>
                    <SvgIconButton onClick={() => {
                        window && window.open(
                            bookmark.url,
                            '_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                        <ExternalLink className='w-6' strokeWidth='1.5px' />
                    </SvgIconButton>
                </div>
            </div>
        </div>
    )
}

export default ListItem