import React from 'react'
import UrlImage from '@components/Common/Avatar/UrlImage'
import ChevronDoubleUp from '@components/Common/Icon/ChevronDoubleUp'
import Chat from '@components/Common/Icon/Chat'
import Duplicate from '@components/Common/Icon/Duplicate'
import { Label } from '@components/Common/Label'
import { SvgIconButton } from '@components/Common/Button'
import { copyToClipBoard } from '@utils/index'
import { toast } from 'react-toastify';
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { hex2rgb } from '@utils/rgb'
import { BookmarkListImageSize } from '@utils/constants'

type Props = {
    bookmark: Bookmark,
    showSimple: () => void
}

const ListCard: React.FC<Props> = ({
    bookmark,
    showSimple
}) => {
    const [r, g, b] = hex2rgb(bookmark.color)
    return (
        <div className='flex py-1 px-2 rounded border border-primary-border'>
            <div style={{ minWidth: BookmarkListImageSize }}>
                <UrlImage className='rounded' width={BookmarkListImageSize} height={BookmarkListImageSize} src={bookmark.image} />
            </div>
            <div className='overflow-hidden px-1 pl-2 ml-2 w-full text-primary-main border-l-2 border-primary-border' style={{ borderColor: bookmark.color && `rgba(${r},${g},${b},0.5)` }}>
                <Label htmlFor='title' textSize='text-xs'>タイトル</Label>
                <div id='title' className='p-1 max-w-full text-sm break-words'>{bookmark.title}</div>
                <Label htmlFor='description' textSize='text-xs'>説明</Label>
                <div id='description' className='p-1 max-w-full text-xs break-words'>{bookmark.description}</div>
                <Label htmlFor='url' textSize='text-xs'>URL</Label>
                <a target='_blank' rel='noopener noreferrer' href={bookmark.url} id='url' className='block p-1 max-w-full text-sm underline break-words'>{bookmark.url}</a>
                {bookmark.comment && (
                    <div className='flex overflow-hidden items-center py-1 max-w-full text-xs text-primary-main'>
                        <div className='flex items-center p-1 mr-2 rounded border border-primary-200'>
                            <Chat className='w-6 stroke-primary-300' />
                            <div className='flex-1 mx-2 whitespace-pre-wrap'>
                                {bookmark.comment}
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='flex flex-col items-end'>
                <TooltipDivContainer className='flex items-center' content='URLをコピー' placement='bottom'>
                    <SvgIconButton aria-label='Copy' className='block ml-2' onClick={(e) => {
                        copyToClipBoard(bookmark.url, () => {
                            toast.success('クリップボードにURLをコピーしました',)
                        })
                        e.stopPropagation()
                        e.preventDefault()
                    }}>
                        <Duplicate className='w-6 stroke-primary-500' strokeWidth='1.5px' />
                    </SvgIconButton>
                </TooltipDivContainer>
                <div className='mt-auto'>
                    <TooltipDivContainer className='mt-auto' content='簡易表示' placement='bottom'>
                        <SvgIconButton aria-label='Detail' onClick={(e) => {
                            showSimple()
                            e.preventDefault()
                            e.stopPropagation()
                        }}><ChevronDoubleUp className='w-4' strokeWidth={2} /></SvgIconButton>
                    </TooltipDivContainer>
                </div>
            </div>

        </div>
    )
}

export default ListCard