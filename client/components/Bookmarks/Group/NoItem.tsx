import React from 'react'
import Link from 'next/link'
import { NoItemImg } from '@components/Common/Image'
import BookmarkInput from '@components/Common/Input/BookmarkInput'
import { SvgIconButton } from '@components/Common/Button'
import Add from '@components/Common/Icon/Add'
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
        status
    } = useNewBookmark(groupId)

    let preview = null
    if (error) {
        preview = (
            <div className=' text-secondary-main text-sm p-2' >
                {error}
            </div>
        )
    }
    else if (status !== 'none') {
        preview = (
            <LinkPreview url={url} linkData={linkData} />
        )
    }
    const settingLink = `/bookmarks/${groupId}/setting`
    return (
        <div className='flex flex-col md:items-center justify-center p-4 w-full h-full bg-primary-light'>
            <p className='text-primary-main text-lg font-semibold'>
                ブックマークを追加しましょう！
            </p>
            <ul className='text-primary-dark my-4 text-sm'>
                <li>
                    <span>タイトルをクリックすることで、グループの名前を変更することができます</span>
                </li>
                <li className='text-sm'>
                    <Link href={settingLink}>
                        <a href={settingLink} className='underline inline-flex'>共有設定<Share className='w-4 stroke-primary-dark hidden md:inline-block' strokeWidth={1.5} /></a>
                    </Link>
                    <span className='ml-1'>でこのグループの公開設定や共同編集設定を行うことができます</span>
                </li>
            </ul>
            <div className='my-4 flex items-center justify-center w-full'>
                <div className='bg-white rounded-full flex items-center justify-center' style={{
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
                    <SvgIconButton className='block ml-2' onClick={submit} disabled={Boolean(error) || !url}>
                        <Add strokeWidth='1.5px' className='w-10' />
                    </SvgIconButton>
                </div>
                {preview}
            </div>
        </div>
    )
}

export default NoItem