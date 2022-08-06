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
        <div className='flex rounded border border-primary-border py-1 px-2'>
            <div style={{ minWidth: BookmarkListImageSize }}>
                <UrlImage className='rounded' width={BookmarkListImageSize} height={BookmarkListImageSize} src={bookmark.image} />
            </div>
            <div className='ml-2 w-full overflow-hidden border-l-2 border-primary-border px-1 pl-2 text-primary-main' style={{ borderColor: bookmark.color && `rgba(${r},${g},${b},0.5)` }}>
                <Label htmlFor='title' textSize='text-xs'>タイトル</Label>
                <div id='title' className='max-w-full break-words p-1 text-sm'>{bookmark.title}</div>
                <Label htmlFor='description' textSize='text-xs'>説明</Label>
                <div id='description' className='max-w-full break-words p-1 text-xs'>{bookmark.description}</div>
                <Label htmlFor='url' textSize='text-xs'>URL</Label>
                <a target='_blank' rel='noopener noreferrer' href={bookmark.url} id='url' className='block max-w-full break-words p-1 text-sm underline'>{bookmark.url}</a>
                {bookmark.comment && (
                    <div className='flex max-w-full items-center overflow-hidden py-1 text-xs text-primary-main'>
                        <div className='mr-2 flex items-center rounded border border-primary-200 p-1'>
                            <Chat className='w-6 stroke-primary-300' />
                            <div className='mx-2 flex-1 whitespace-pre-wrap'>
                                {bookmark.comment}
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className='flex flex-col items-end'>
                <TooltipDivContainer className='flex items-center' content='URLをコピー' placement='bottom'>
                    <SvgIconButton aria-label='Copy' className='ml-2 block' onClick={(e) => {
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