import React from 'react'
import UrlImage from '@components/Common/Avatar/UrlImage'
import ChevronDoubleDown from '@components/Common/Icon/ChevronDoubleDown'
import Duplicate from '@components/Common/Icon/Duplicate'
import { SvgIconButton } from '@components/Common/Button'
import { copyToClipBoard } from '@utils/index'
import { toast } from 'react-toastify';
import DefaultPresenter from './Default'
import MobilePresenter from './Mobile'
import { BookmarkListImageSize } from '@utils/constants'

type Props = {
    bookmark: Bookmark,
    color?: BookmarkColorDescription,
    showDetail: () => void
}

const ListItem: React.FC<Props> = ({
    bookmark,
    color,
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
    const origin = new URL(bookmark.url)
    const image = <UrlImage className='rounded' enableEndpoint={!bookmark.disableEndpoint} width={BookmarkListImageSize} height={BookmarkListImageSize} src={bookmark.image} name={bookmark.title} />
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
                        image,
                        color: color?.color,
                        host: origin.host,
                        url : bookmark.url
                    }}
                />
            </div>
            <div className='md:hidden'>
                <MobilePresenter
                    {...{
                        title: bookmark.title,
                        description: bookmark.description,
                        comment: bookmark.comment,
                        image,
                        color: bookmark.color,
                        host: origin.host,
                        url : bookmark.url
                    }}
                />
            </div>
        </>
    )
}

export default ListItem