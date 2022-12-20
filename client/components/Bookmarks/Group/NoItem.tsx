import React from 'react'
import Link from 'next/link'
import { NoItemImg } from '@components/Common/Image'
import BookmarkInput from '@components/Common/Input/BookmarkInput'
import { SvgIconButton } from '@components/Common/Button'
import Add from '@components/Common/Icon/Add'
import Exclamation from '@components/Common/Icon/Exclamation'
import Share from '@components/Common/Icon/Share'
import { LinkPreview } from '@components/Common/LinkPreview'
import useNewBookmark from '@hooks/useNewBookmark'

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
        linkData,
        error,
        status,
        warn
    } = useNewBookmark(groupId)

    let preview = null
    if (error) {
        preview = (
            <div className=' p-2 text-sm text-secondary-main' >
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
            <LinkPreview url={url} linkData={linkData} />
        )
    }
    const shareLink = `/bookmarks/${groupId}/share`
    return (
        <div className='flex h-full w-full flex-col justify-center bg-primary-light p-4 md:items-center'>
            <p className='text-lg font-semibold text-primary-main'>
                ブックマークを追加しましょう！
            </p>
            <ul className='my-4 text-sm text-primary-dark'>
                <li>
                    <span>タイトルをクリックすることで、グループの名前を変更することができます</span>
                </li>
                <li className='text-sm'>
                    <Link href={shareLink} className='inline-flex underline'>
                        共有設定<Share className='hidden h-5 w-4 stroke-primary-dark md:inline-block' strokeWidth={1.5} />
                    </Link>
                    <span className='ml-1'>でこのグループの公開設定や共同編集設定を行うことができます</span>
                </li>
            </ul>
            <div className='my-4 flex w-full items-center justify-center'>
                <div className='flex items-center justify-center rounded-full bg-white' style={{
                    width: 300, height: 300
                }}>
                    <NoItemImg width={200} height={200} />
                </div>
            </div>
            <div className='w-full md:w-6/12'>
                <div className='flex items-center'>
                    <BookmarkInput
                        placeholder={'ブックマークURLを入力'}
                        value={bookmarkInput}
                        onChange={onChangeBookmarkInput}
                        onKeyPress={onKeyPress}
                    />
                    <SvgIconButton className='ml-2 block' onClick={submit} disabled={Boolean(error) || !url}>
                        <Add strokeWidth='1.5px' className='w-10' />
                    </SvgIconButton>
                </div>
                {preview}
            </div>
        </div>
    );
}

export default NoItem