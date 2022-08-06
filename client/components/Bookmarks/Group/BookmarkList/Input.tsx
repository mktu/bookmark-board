import React from 'react'
import AddFill from '@components/Common/Icon/AddFill'
import Add from '@components/Common/Icon/Add'
import ChevronDown from '@components/Common/Icon/ChevronDown'
import Exclamation from '@components/Common/Icon/Exclamation'
import { SvgIconButton, SvgFillIconButton } from '@components/Common/Button'
import { BookmarkInputBase } from '@components/Common/Input'
import { LinkPreview } from '@components/Common/LinkPreview'
import styles from './index.module.scss'
import useNewBookmark from '@hooks/useNewBookmark'

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
        linkData,
        bookmarkInput,
        error,
        warn,
        onChangeBookmarkInput,
        submit,
        onKeyPress
    } = useNewBookmark(groupId)

    let preview = null

    if (error) {
        preview = (
            <div className='p-2 text-sm text-secondary-main' >
                {error}
            </div>
        )
    }
    else if (warn) {
        preview = (
            <div className='flex items-center p-2 text-sm text-coral-500' >
                <span><Exclamation className='mr-2 h-5 w-5 stroke-coral-500' fill='none' /></span>
                {warn}
            </div>
        )
    }
    else if (status !== 'none') {
        preview = (
            <div className='mt-2 rounded bg-white shadow focus:ring' >
                <LinkPreview url={url} linkData={linkData} />
            </div>
        )
    }


    return (
        <div className='relative w-full border-t border-primary-border bg-white'>
            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${show ? 'p-4' : 'h-0'}`}>
                <div className='flex max-w-full flex-row items-center overflow-hidden'>
                    <div>
                        <SvgIconButton aria-label='Hide Input' className='mx-1 hidden md:block' onClick={() => { toggle(false) }}>
                            <ChevronDown strokeWidth='1.5px' className='w-8' />
                        </SvgIconButton>
                    </div>
                    <div className='w-full flex-1 overflow-hidden'>
                        <div className='rounded bg-white shadow focus:ring'>
                            <BookmarkInputBase aria-label='Input Bookmark URL' placeholder={'ブックマークURLを入力'} value={bookmarkInput} onKeyPress={onKeyPress} onChange={onChangeBookmarkInput} />
                        </div>
                        {preview}
                    </div>
                    <div className='ml-auto'>
                        <SvgIconButton disabled={Boolean(error) || !url} aria-label='Add New Bookmark' className='mx-1 block' onClick={submit}>
                            <Add strokeWidth='1.5px' className='w-10 stroke-primary-main hover:stroke-primary-dark' />
                        </SvgIconButton>
                    </div>
                </div>
            </div>
            {!show && (
                <div className={styles['fab']}>
                    <SvgFillIconButton
                        aria-label='Add New'
                        colorType='none'
                        className='h-12 w-12 rounded-full fill-secondary-500 hover:fill-secondary-main'
                        onClick={() => { toggle(true) }}>
                        <AddFill />
                    </SvgFillIconButton>
                </div>
            )}
        </div>
    )
}

export default Input