import React from 'react'
import { UrlImage } from '../Common/Avatar'
import { ExternalLink, Duplicate } from '../Common/Icon'
import { SvgIconButton } from '../Common/Button'
import { copyToClipBoard } from '../../utils'
import { toast } from 'react-toastify';
import Tooltip from '../Common/Tooltip'

type Props = {
    bookmark: Bookmark
}

const ListItem: React.FC<Props> = ({
    bookmark
}) => {
    return (
        <div className='flex py-1 px-2 items-center border rounded border-primary-border'>
            <UrlImage width='64px' height='64px' src={bookmark.image} />
            <div className='ml-2 text-primary-main overflow-hidden w-full'>
                <div className='text-sm overflow-hidden truncate max-w-full'>{bookmark.title}</div>
                <div className='text-xs overflow-hidden truncate max-w-full'>{bookmark.description}</div>
            </div>
            <Tooltip content='URLをコピー' placement='bottom'>
                <div>
                    <SvgIconButton className='block ml-2' onClick={(e)=>{
                        copyToClipBoard(bookmark.url,()=>{
                            toast.success('クリップボードにURLをコピーしました',)
                        })
                        e.stopPropagation()
                    }}>
                        <Duplicate className='w-6 stroke-primary-500' strokeWidth='1.5px' />
                    </SvgIconButton>
                </div>
            </Tooltip>
            <Tooltip content='リンクを開く' placement='bottom'>
                <div>
                    <SvgIconButton className='block ml-2' onClick={() => {
                        window && window.open(
                            bookmark.url,
                            '_blank' 
                        );
                    }}>
                        <ExternalLink className='w-6 stroke-primary-500' strokeWidth='1.5px' />
                    </SvgIconButton>
                </div>
            </Tooltip>

        </div>
    )
}

export default ListItem