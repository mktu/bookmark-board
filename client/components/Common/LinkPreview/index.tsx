import React from 'react';
import classNames from 'classnames'
import { LoadingImg } from '@components/Common/Image'
import UrlImage from '@components/Common/Avatar/UrlImage'
import useLinkPreview, { LinkData as LinkDataType } from '@hooks/useLinkPreview'
import { BookmarkListImageSize } from '@utils/constants'

export type LinkData = LinkDataType

const LinkPreview: React.FC<{
    url: string,
    linkData?: LinkData
    className?: string
}> = ({
    url,
    linkData,
    className
}) => {
        if (!url) {
            return <></>
        }
        if (!linkData) {
            return <div className='flex items-center justify-center'><LoadingImg width='50px' /></div>;
        }
        return (
            <a className={classNames('flex text-current items-center p-2 w-full', className)} href={url} target='_blank' rel="noopener noreferrer">
                <div className='mr-2 overflow-hidden'>
                    <UrlImage className='rounded border border-primary-border' width={BookmarkListImageSize} height={BookmarkListImageSize} src={linkData.images[0]} name={linkData.title} />
                </div>
                <div className='w-full flex-1 overflow-hidden'>
                    <div className='overflow-hidden truncate' > {linkData.title}</div>
                    <div className='overflow-hidden truncate text-xs text-primary-main' > {linkData.description}</div>
                    <div className='overflow-hidden truncate text-xs font-thin text-primary-main' > {url}</div>
                </div>
            </a>
        )
    }


export { LinkPreview, useLinkPreview };
