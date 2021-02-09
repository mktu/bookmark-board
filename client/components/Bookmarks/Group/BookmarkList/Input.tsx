import React from 'react'
import { AddFill, Add, ChevronDown } from '../../../Common/Icon'
import { SvgIconButton, SvgFillIconButton } from '../../../Common/Button'
import { BookmarkInputBase } from '../../../Common/Input'
import { LinkPreview } from '../../../Common/LinkPreview'
import styles from './index.module.scss'
import useNewBookmark from '../../../../hooks/useNewBookmark'

type Props = {
    groupId: string,
    show: boolean,
    toggle: (show: boolean) => void
}

const Input: React.FC<Props> = ({
    groupId,
    show,
    toggle
}) => {
    const {
        url,
        status,
        invalidUrl,
        linkData,
        bookmarkInput,
        onChangeBookmarkInput,
        submit,
        onKeyPress
    } = useNewBookmark(groupId)

    let preview = null
    if (invalidUrl || status === 'failed') {
        preview = (
            <div className=' text-secondary-main text-sm p-2' >
                無効なURLです
            </div>
        )
    }
    else if (status !== 'none') {
        preview = (
            <div className='bg-white mt-2 rounded shadow focus:shadow-outline' >
                <LinkPreview url={url} linkData={linkData} />
            </div>
        )
    }
    return (
        <div className='w-full relative bg-white border-t border-primary-border'>
            <div className={`overflow-hidden transition-all ease-in-out duration-200 transform ${show ? 'p-4' : 'h-0'}`}>
                <div className='flex flex-row items-center max-w-full overflow-hidden'>
                    <div>
                        <SvgIconButton aria-label='Hide Input' className='block mx-1' onClick={() => { toggle(false) }}>
                            <ChevronDown strokeWidth='1.5px' className='w-8' />
                        </SvgIconButton>
                    </div>
                    <div className='w-full flex-1 overflow-hidden'>
                        <div className='bg-white rounded shadow focus:shadow-outline'>
                            <BookmarkInputBase aria-label='Input Bookmark URL' placeholder={'ブックマークURLを入力'} value={bookmarkInput} onKeyPress={onKeyPress} onChange={onChangeBookmarkInput} />
                        </div>
                        {preview}
                    </div>
                    <div className='ml-auto'>
                        <SvgIconButton aria-label='Add New Bookmark' className='block mx-1' onClick={submit}>
                            <Add strokeWidth='1.5px' className='w-10  stroke-primary-main hover:stroke-primary-dark' />
                        </SvgIconButton>
                    </div>
                </div>
            </div>
            {!show && (
                <div className={styles['fab']}>
                    <SvgFillIconButton aria-label='Add New' colorType='none' className='fill-secondary-500 hover:fill-secondary-main w-12 h-12 rounded-full' onClick={() => { toggle(true) }}>
                        <AddFill />
                    </SvgFillIconButton>
                </div>
            )}
        </div>
    )
}

export default Input