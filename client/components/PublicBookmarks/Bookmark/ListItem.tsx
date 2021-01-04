import React from 'react'
import UrlImage from '../../Common/Avatar/UrlImage'
import ChevronDoubleDown from '../../Common/Icon/ChevronDoubleDown'
import Chat from '../../Common/Icon/Chat'
import Duplicate from '../../Common/Icon/Duplicate'
import { SvgIconButton } from '../../Common/Button'
import { copyToClipBoard } from '../../../utils'
import { toast } from 'react-toastify';
import { TooltipDivContainer } from '../../Common/Tooltip'

type Props = {
    bookmark: Bookmark,
    showDetail: () => void
}

const ListItem: React.FC<Props> = ({
    bookmark,
    showDetail
}) => {
    return (
        <div className='flex py-1 px-2 border rounded border-primary-border items-center'>
            <UrlImage width='64px' height='64px' src={bookmark.image} name={bookmark.title}/>
            <div className='ml-2 overflow-hidden w-full  h-full'>
                <div className='text-sm overflow-hidden truncate max-w-full text-primary-dark'>{bookmark.title}</div>
                <div className='text-xs overflow-hidden truncate max-w-full text-primary-main'>{bookmark.description}</div>
                {bookmark.comment && (
                    <div className='text-xs overflow-hidden truncate max-w-full flex items-center text-primary-main py-1'>
                        <div className='border-primary-200 border rounded p-1 mr-2 flex items-center'><Chat className='w-6 stroke-primary-300' /> ひとこと</div>
                        <div className='overflow-hidden truncate flex-1 text-sm'>
                            {bookmark.comment}
                        </div>
                    </div>
                )}
            </div>
            <div className='ml-2 flex flex-col justify-center items-center' style={{ minHeight: '64px' }}>
                <TooltipDivContainer content='URLをコピー' placement='bottom' className='flex items-start'>
                    <SvgIconButton aria-label='Copy' className='block' onClick={(e) => {
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
                    <TooltipDivContainer content='詳細を表示' placement='bottom' className='flex items-start'>
                        <SvgIconButton aria-label='Detail' onClick={(e) => {
                            showDetail()
                            e.preventDefault()
                            e.stopPropagation()
                        }}><ChevronDoubleDown className='w-4' strokeWidth={2} /></SvgIconButton>
                    </TooltipDivContainer>
                </div>
            </div>
        </div>
    )
}

export default ListItem