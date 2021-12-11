import React from 'react'
import { Label } from '@components/Common/Label'
import TwitterIcon from '@components/Common/Icon/Twitter'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import Help from '@components/Common/Icon/Help'
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
    lineLogin: React.ReactNode,
    lineAuth: React.ReactNode,
    groupSelectorForLine: React.ReactNode,
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
    groupSelectorForLine
}) => {
    return (
        <div className='p-6 w-full h-full'>
            <div className='md:flex w-full'>
                <div className='flex flex-col items-center'>
                    {avatar}
                    <div className='flex justify-center items-center p-4'>
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
                    <div className='my-3'>
                        <div>{lineLogin}</div>
                        <div className='flex justify-end items-center mt-2'>
                            <div className='mr-2 mb-1 text-sm text-primary-main'>登録先グループ</div>
                            {groupSelectorForLine}
                            <TooltipDivContainer className='hidden md:block ml-2' content='Line Bot利用時のブックマーク登録先グループです。'>
                                <Help className='w-5 h-5 stroke-primary-main' />
                            </TooltipDivContainer>
                        </div>

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