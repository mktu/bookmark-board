import React from 'react'
import { NoItemImg } from '../../Common/Image'
import { BookmarkInput } from '../../Common/Input'
import { SvgIconButton } from '../../Common/Button'
import { Add } from '../../Common/Icon'
import { LinkPreview } from '../../Common/LinkPreview'
import useNewBookmark from '../../../hooks/useNewBookmark'

type Props = {
    groupId: string
}

const NoItem: React.FC<Props> = ({
    groupId
}) => {
    const {
        bookmarkInput,
        onKeyPress,
        onChangeBookmarkInput,
        submit,
        url,
        linkData
    } = useNewBookmark(groupId)
    return (
        <div className='flex flex-col items-center justify-center p-4 w-full h-full bg-primary-light'>
            <p className='mb-4 text-primary-main'>
                ブックマークはまだ登録されていません
            </p>
            <div className='bg-white rounded-full p-12 flex items-center justify-center'>
                <NoItemImg width={200} />
            </div>
            <div className='w-6/12 mt-4'>
                <div className='flex flex-row items-center'>
                    <BookmarkInput 
                        placeholder={'ブックマークURLを入力'} 
                        value={bookmarkInput} 
                        onChange={onChangeBookmarkInput} 
                        onKeyPress={onKeyPress}
                        />
                    <SvgIconButton className='block ml-2' onClick={submit}>
                        <Add strokeWidth='1.5px' className='w-10' />
                    </SvgIconButton>
                </div>
                <LinkPreview url={url} linkData={linkData} />
                {status==='failed' && (
                    <div>無効なURLです</div>
                )}
            </div>
        </div>
    )
}

export default NoItem