import React from 'react'
import { AddFill, Add, ChevronDown } from '../../../Common/Icon'
import { SvgIconButton } from '../../../Common/Button'
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
    return (
        <div className='w-full relative bg-white border-t border-primary-border'>
            <div className={`overflow-hidden transition-all ease-in-out duration-200 transform ${show ? 'p-4' : 'h-0'}`}>
                <div className='flex flex-row items-center max-w-full overflow-hidden'>
                    <div>
                        <SvgIconButton className='block mr-2' onClick={() => { toggle(false) }}>
                            <ChevronDown strokeWidth='1.5px' className='w-8' />
                        </SvgIconButton>
                    </div>
                    <div className='w-full flex-1 overflow-hidden'>
                        <div className='bg-white rounded shadow focus:shadow-outline'>
                            <BookmarkInputBase placeholder={'ブックマークURLを入力'} value={bookmarkInput} onKeyPress={onKeyPress} onChange={onChangeBookmarkInput} />
                        </div>
                        {status !== 'none' && (
                            <div className='bg-white mt-2 rounded shadow focus:shadow-outline' >
                                <LinkPreview url={url} linkData={linkData} />
                            </div>
                        )}
                        {invalidUrl && (
                            <div className=' text-secondary-main text-sm p-2' >
                                無効なURLです
                            </div>
                        )}
                    </div>
                    <div className='ml-auto'>
                        <SvgIconButton className='block ml-2' onClick={submit}>
                            <Add strokeWidth='1.5px' className='w-10  stroke-primary-main hover:stroke-primary-dark' />
                        </SvgIconButton>
                    </div>
                </div>
            </div>
            {!show && (
                <div className={styles['fab']}>
                    <SvgIconButton colorType='none' className='p-0 w-10 h-10 bg-secondary-main hover:bg-secondary-700 rounded-full shadow-lg' onClick={() => { toggle(true) }}>
                        <AddFill className={'inline-block w-6 h-6'} />
                    </SvgIconButton>
                </div>
            )}
        </div>
    )
}

export default Input