import React from 'react'
import { SvgIconButton } from '../../../Common/Button'
import TextInputBase from '../../../Common/Input/TextInputBase'
import { Duplicate } from '../../../Common/Icon'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { copyToClipBoard } from '../../../../utils'
import { successCopyUrl } from '../../../../utils/toast'

type Props = {
    requestUrl: string
}

const PrivateLink: React.FC<Props> = ({
    requestUrl
}) => {
    const copyToClipboard = () => {
        copyToClipBoard(requestUrl, successCopyUrl)
    }
    return (
        <div className='text-sm'>
            <div className='my-2 flex items-center'>
                <p className='hidden md:block'>共同編集リンク</p>
                <TextInputBase value={`${requestUrl}`} readOnly className='mx-2 hidden w-full flex-1 rounded border border-primary-border p-2 md:inline-block' ></TextInputBase>
                <div className='mx-2 text-primary-500 md:hidden' >共同編集リンク</div>
                <TooltipDivContainer content='URLをコピー' placement='bottom'>
                    <SvgIconButton aria-label='Copy URL' className='block' onClick={copyToClipboard}>
                        <Duplicate className='w-6' />
                    </SvgIconButton>
                </TooltipDivContainer>
            </div>
        </div>
    )
}


export default PrivateLink

