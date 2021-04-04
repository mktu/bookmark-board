import React from 'react'
import { OutlinedButton, SvgIconButton } from '@components/Common/Button'
import { Duplicate, XFill } from '@components/Common/Icon'
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
    searchable: boolean
}

const PublicLink: React.FC<Props> = ({
    sharable,
    publicUrl,
    publicPath,
    handleShare,
}) => {
    const copyToClipboard = () => {
        copyToClipBoard(publicUrl, successCopyUrl)
    }
    return (
        <div className='text-sm'>
            <div>
                <label htmlFor='Public' className='text-primary-main flex items-center'>
                    <input id='Public' type='checkbox' checked={Boolean(sharable)} onChange={(e) => {
                        handleShare(e.target.checked)
                    }} />
                    <span className='ml-2 inline-block'>公開する</span>
                </label>
            </div>
            <div className='flex items-center my-2'>
                <p className='hidden md:block'>閲覧用リンク</p>
                <Link href={publicPath} shallow>
                    {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                        (<a className='hidden md:inline-block underline text-blue-700 mx-2'>{publicUrl}</a>)
                    }
                </Link>
                <Link href={publicPath} shallow>
                    {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                        (<a className='md:hidden underline text-blue-700 mx-2'>閲覧用リンク</a>)
                    }
                </Link>

                <TooltipDivContainer content='URLをコピー' placement='bottom'>
                    <SvgIconButton aria-label='Copy URL' className='block' onClick={copyToClipboard}>
                        <Duplicate className='w-6' />
                    </SvgIconButton>
                </TooltipDivContainer>
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

