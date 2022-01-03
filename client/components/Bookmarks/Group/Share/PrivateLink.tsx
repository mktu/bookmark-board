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
            <div className='flex items-center my-2'>
                <p className='hidden md:block'>共同編集リンク</p>
                <TextInputBase value={`${requestUrl}`} readOnly className='hidden flex-1 p-2 mx-2 w-full rounded border border-primary-border md:inline-block' ></TextInputBase>
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

