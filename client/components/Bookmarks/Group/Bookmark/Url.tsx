import React from 'react'
import { SvgIconButton } from '../../../Common/Button'
import { copyToClipBoard } from '../../../../utils'
import { toast } from 'react-toastify';
import { ExternalLink, Duplicate } from '../../../Common/Icon'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import TextInput from '../../../Common/Input/TextInput'
import classNames from 'classnames'

type Props = {
    url: string,
    className?: string,
    updateBookmark: (key: keyof Bookmark) => (value: string) => void,
    handleJumpLink: () => void,
}

const Url: React.FC<Props> = ({
    url,
    className,
    updateBookmark,
    handleJumpLink
}) => (
    <div className={classNames('flex items-center', className)}>
        <TextInput label='URL' className='flex-1' id='url' value={url} onChange={(e) => {
            updateBookmark('url')(e.target.value)
        }} />
        <TooltipDivContainer className='mx-1' placement='bottom' content='URLをコピー'>
            <SvgIconButton aria-label='Open URL in New Tab' onClick={(e) => {
                copyToClipBoard(url, () => {
                    toast.success('クリップボードにURLをコピーしました',)
                })
                e.stopPropagation()
            }} >
                <Duplicate className='w-6' strokeWidth={2} />
            </SvgIconButton>
        </TooltipDivContainer>
        <TooltipDivContainer className='mx-1' placement='bottom' content='別タブでリンクを開く'>
            <SvgIconButton aria-label='Open URL in New Tab' onClick={handleJumpLink} >
                <ExternalLink className='w-6' strokeWidth={2} />
            </SvgIconButton>
        </TooltipDivContainer>
    </div>
)

export default Url