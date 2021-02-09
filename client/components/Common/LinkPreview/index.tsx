import React from 'react';
import classNames from 'classnames'
import { LoadingImg } from '../../Common/Image'
import UrlImage from '../../Common/Avatar/UrlImage'
import useLinkPreview, { LinkData as LinkDataType } from '../../../hooks/useLinkPreview'

export type LinkData = LinkDataType

const LinkPreview: React.FC<{
    url: string,
    linkData?:LinkData
    className?: string
}> = ({
    url,
    linkData,
    className
}) => {
        if(!url){
            return <></>
        }
        if (!linkData) {
            return <div className='flex items-center justify-center'><LoadingImg width='50px'/></div>;
        }
        return (
            <a className={classNames('flex flex-row text-current items-center p-2 w-full',className)} href={url} target='_blank' rel="noopener noreferrer">
                <div className='mr-2 overflow-hidden border-primary-border border'>
                    <UrlImage width='64px' height='64px' src={linkData.images[0]} name={linkData.title}/>
                </div>
                <div className='w-5/6'>
                    <div className='overflow-hidden truncate' > {linkData.title}</div>
                    <div className='overflow-hidden truncate text-xs text-primary-main' > {linkData.description}</div>
                    <div className='overflow-hidden truncate text-xs text-primary-main font-thin' > {url}</div>
                </div>
            </a>
        )
    }


export { LinkPreview, useLinkPreview };
