import React from 'react'
import { Label } from '@components/Common/Label'
import TwitterIcon from '@components/Common/Icon/Twitter'
import { TwitterUrl } from '@utils/constants'
import styles from './index.module.scss'
import classNames from 'classnames'

type Props = {
    avatar: React.ReactNode,
    modifyImage?: React.ReactNode,
    uploadingImage?: React.ReactNode,
    failedUpload?: React.ReactNode,
    name: React.ReactNode,
    twitterInput: React.ReactNode,
    commentInput: React.ReactNode,
    submit: React.ReactNode,
    updateDate: React.ReactNode,
    lineLogin: React.ReactNode,
    lineAuth: React.ReactNode,
    groupSelectorForLine?: React.ReactNode,
    addFriendLink?: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    avatar,
    modifyImage,
    uploadingImage,
    failedUpload,
    name,
    twitterInput,
    commentInput,
    submit,
    updateDate,
    lineLogin,
    lineAuth,
}) => {
    return (
        <div className={classNames('p-6 w-full h-full',styles['wrapper'])}> {/** tbd tailwindcss 3.0 md:w-[768px] */}
            <div className='w-full md:flex'>
                <div className='flex flex-col items-center'>
                    {avatar}
                    <div className='flex justify-center items-center p-4'>
                        {modifyImage}
                        {uploadingImage}
                        {failedUpload}
                    </div>
                </div>
                <div className='overflow-x-hidden p-4 w-full'>
                    {name}
                    <Label className='my-2'>SNS</Label>
                    <div className='flex items-center'>
                        <div><TwitterIcon width={48} height={48} /></div>
                        <div className='hidden mx-2 text-primary-300 md:block'>{TwitterUrl}</div>
                        {twitterInput}
                    </div>
                    <Label className='my-2'>LINE</Label>
                    <div className='my-2'>
                        <div>{lineLogin}</div>
                    </div>
                    {commentInput}
                    <div className='flex flex-col justify-center items-end my-2'>
                        {submit}
                        <p className='text-xs text-primary-400'>
                            {updateDate}
                        </p>
                    </div>
                </div>
            </div>
            {lineAuth}
        </div>
    )
}

export default Presenter