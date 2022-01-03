import React from 'react'
import { SvgIconButton } from '@components/Common/Button'
import { Duplicate } from '@components/Common/Icon'
import Link from 'next/link'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { copyToClipBoard } from '@utils/index'
import { successCopyUrl } from '@utils/toast'

type Props = {
    sharable: boolean,
    publicUrl: string,
    publicPath: string,
    handleShare: (share: boolean) => void,
    enableSearch: (searchable: boolean) => void,
    searchable: boolean,
    hasOwnership: boolean
}

const PublicLink: React.FC<Props> = ({
    sharable,
    publicUrl,
    publicPath,
    handleShare,
    hasOwnership
}) => {
    const copyToClipboard = () => {
        copyToClipBoard(publicUrl, successCopyUrl)
    }
    return (
        <div className='text-sm'>
            {hasOwnership && (
                <div>
                    <label htmlFor='Public' className='flex items-center text-primary-main'>
                        <input id='Public' type='checkbox' checked={Boolean(sharable)} onChange={(e) => {
                            handleShare(e.target.checked)
                        }} />
                        <span className='inline-block ml-2'>公開する</span>
                    </label>
                </div>
            )}
            <div className='flex items-center my-2'>
                <p className='hidden md:block'>閲覧用リンク</p>
                <div className='flex flex-1 items-center'>
                    <div className='hidden mx-2 md:block'>
                        <Link href={publicPath} shallow>
                            {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                                (<a className='text-blue-700 underline'>{publicUrl}</a>)
                            }
                        </Link>
                    </div>
                    <div className='mx-2 md:hidden'>
                        <Link href={publicPath} shallow>
                            {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                                (<a className='text-blue-700 underline'>閲覧用リンク</a>)
                            }
                        </Link>
                    </div>
                    <TooltipDivContainer content='URLをコピー' placement='bottom'>
                        <SvgIconButton aria-label='Copy URL' className='block' onClick={copyToClipboard}>
                            <Duplicate className='w-6' />
                        </SvgIconButton>
                    </TooltipDivContainer>
                </div>
            </div>
            {/* <label htmlFor='Searchable' className='text-primary-dark text-xs flex items-center pl-1'>
                        <input id='Searchable' type='checkbox' checked={Boolean(searchable)} onChange={(e) => {
                            enableSearch(e.target.checked)
                        }} />
                        <span className='ml-2 inline-block'>一般公開：トップから検索が可能となりタイムラインにも表示されます</span>

                    </label> */}
        </div>
    )
}


export default PublicLink

