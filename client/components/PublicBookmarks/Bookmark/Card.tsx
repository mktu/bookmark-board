import React from 'react'
import UrlImage from '../../Common/Avatar/UrlImage'
import ChevronDoubleUp from '../../Common/Icon/ChevronDoubleUp'
import Chat from '../../Common/Icon/Chat'
import Duplicate from '../../Common/Icon/Duplicate'
import { Label } from '../../Common/Label'
import { SvgIconButton } from '../../Common/Button'
import { copyToClipBoard } from '../../../utils'
import { toast } from 'react-toastify';
import { TooltipDivContainer } from '../../Common/Tooltip'
import { hex2rgb } from '../../../utils/rgb'

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
        <div className='flex py-1 px-2 border rounded border-primary-border'>
            <div style={{ minWidth: '64px' }}>
                <UrlImage width='64px' height='64px' src={bookmark.image} />
            </div>
            <div className='ml-2 text-primary-main overflow-hidden w-full px-1 border-l-2  border-primary-border pl-2' style={{ borderColor: bookmark.color && `rgba(${r},${g},${b},0.5)` }}>
                <Label htmlFor='title' textSize='text-xs'>タイトル</Label>
                <div id='title' className='text-sm break-words max-w-full p-1'>{bookmark.title}</div>
                <Label htmlFor='description' textSize='text-xs'>説明</Label>
                <div id='description' className='text-xs break-words max-w-full p-1'>{bookmark.description}</div>
                <Label htmlFor='url' textSize='text-xs'>URL</Label>
                <a target='_blank' rel='noopener noreferrer' href={bookmark.url} id='url' className='block text-sm break-words max-w-full p-1 underline'>{bookmark.url}</a>
                {bookmark.comment && (
                    <div className='text-xs overflow-hidden max-w-full flex items-center text-primary-main py-1'>
                        <div className='border-primary-200 border rounded p-1 mr-2 flex items-center'><Chat className='w-6 stroke-primary-300' /> ひとこと</div>
                        <div className='break-words flex-1 text-sm'>
                            {bookmark.comment}
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