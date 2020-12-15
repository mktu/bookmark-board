import React from 'react'
import { UrlImage } from '../../Common/Avatar'
import { Duplicate, Chat, ChevronDoubleUp } from '../../Common/Icon'
import { Label } from '../../Common/Label'
import { SvgIconButton, TextButton } from '../../Common/Button'
import { copyToClipBoard } from '../../../utils'
import { toast } from 'react-toastify';
import { TooltipDivContainer } from '../../Common/Tooltip'

type Props = {
    bookmark: Bookmark,
    showSimple: () => void
}

const ListCard: React.FC<Props> = ({
    bookmark,
    showSimple
}) => {
    return (
        <div className='flex py-1 px-2 border rounded border-primary-border'>
            <UrlImage width='64px' height='64px' src={bookmark.image} />
            <div className='ml-2 text-primary-main overflow-hidden w-full px-1'>
                <Label htmlFor='title' textSize='xs'>タイトル</Label>
                <div id='title' className='text-sm break-words max-w-full p-1'>{bookmark.title}</div>
                <Label htmlFor='description' textSize='xs'>説明</Label>
                <div id='description' className='text-xs break-words max-w-full p-1'>{bookmark.description}</div>
                <Label htmlFor='url' textSize='xs'>URL</Label>
                <div id='url' className='text-sm break-words max-w-full p-1'>{bookmark.url}</div>
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
                    <SvgIconButton className='block ml-2' onClick={(e) => {
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
                        <SvgIconButton onClick={(e) => {
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