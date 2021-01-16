import React from 'react'
import UrlImage from '../../../Common/Avatar/UrlImage'
import ChevronDoubleDown from '../../../Common/Icon/ChevronDoubleDown'
import Duplicate from '../../../Common/Icon/Duplicate'
import { SvgIconButton } from '../../../Common/Button'
import { copyToClipBoard } from '../../../../utils'
import { toast } from 'react-toastify';
import DefaultPresenter from './Default'
import MobilePresenter from './Mobile'

type Props = {
    bookmark: Bookmark,
    showDetail: () => void
}

const ListItem: React.FC<Props> = ({
    bookmark,
    showDetail
}) => {
    const copyButton = (
        <SvgIconButton aria-label='Copy' className='block' onClick={(e) => {
            copyToClipBoard(bookmark.url, () => {
                toast.success('クリップボードにURLをコピーしました',)
            })
            e.stopPropagation()
            e.preventDefault()
        }}>
            <Duplicate className='w-6 stroke-primary-500' strokeWidth='1.5px' />
        </SvgIconButton>)
    const detailButton = (
        <SvgIconButton aria-label='Detail' onClick={(e) => {
            showDetail()
            e.preventDefault()
            e.stopPropagation()
        }}><ChevronDoubleDown className='w-4' strokeWidth={2} /></SvgIconButton>
    )
    const image = <UrlImage enableEndpoint={!bookmark.disableEndpoint} width='64px' height='64px' src={bookmark.image} name={bookmark.title} />
    return (
        <>
            <div className='hidden md:block'>
                <DefaultPresenter
                    {...{
                        title: bookmark.title,
                        description: bookmark.description,
                        comment: bookmark.comment,
                        copyButton,
                        detailButton,
                        image
                    }}
                />
            </div>
            <div className='md:hidden'>
                <MobilePresenter
                    {...{
                        title: bookmark.title,
                        description: bookmark.description,
                        comment: bookmark.comment,
                        copyButton,
                        detailButton,
                        image
                    }}
                />
            </div>
        </>
    )
}

export default ListItem