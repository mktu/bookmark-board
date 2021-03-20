import React from 'react'
import { Label } from '@components/Common/Label'
import TwitterIcon from '@components/Common/Icon/Twitter'
import { TwitterUrl } from '@utils/constants'

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
    updateDate
}) => {
    return (
        <div className='w-full h-full p-6'>
            <div className='w-full md:flex'>
                <div className='flex flex-col items-center'>
                    {avatar}
                    <div className='flex items-center justify-center p-4'>
                        {modifyImage}
                        {uploadingImage}
                        {failedUpload}
                    </div>
                </div>
                <div className='p-4'>
                    {name}
                    <Label className='my-2'>SNS</Label>
                    <div className='flex items-center'>
                        <div><TwitterIcon width={48} height={48} /></div>
                        <div className='hidden md:block mx-2 text-primary-300'>{TwitterUrl}</div>
                        {twitterInput}
                    </div>
                    {commentInput}
                    <div className='flex flex-col items-end justify-cenrter my-2'>
                        {submit}
                        <p className='text-primary-400 text-xs'>
                            {updateDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter