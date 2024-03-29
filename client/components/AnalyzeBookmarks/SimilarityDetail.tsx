import { CSSProperties } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useBookmarkSimilarity from '@hooks/useBookmarkSimilarity'
import ExternalLink from '@components/Common/Icon/ExternalLink'
import { SvgIconButton, OutlinedButton } from '@components/Common/Button'
import UrlImage, { NotFound } from '@components/Common/Avatar/UrlImage'

type Props = {
    bookmarkSimilarity: ReturnType<typeof useBookmarkSimilarity>['selectedBookmarkSimilarity']
}

const SimilarityDetail: React.VFC<Props> = ({
    bookmarkSimilarity
}) => {
    const router = useRouter()
    const { bookmark, targetGroup, originalSimilarity, targetSimilarity, currentGroupId, currentGroup } = bookmarkSimilarity
    if (!bookmark || !targetGroup) {
        return <div>NOT FOUND</div>
    }
    const imageStyle: CSSProperties = {
        width: `min(${480}px,90vw)`,
        height: `calc(min(${480}px,90vw)/1.91)`
    }
    const myGroupLink = `/bookmarks/${currentGroupId}`
    const targetGroupLink = `/bookmarks/${targetGroup.id}`
    return (
        <div className='w-full'>
            <a className='flex w-full px-4 py-2 text-primary-main underline md:overflow-x-hidden' href={bookmark.url}>
                <SvgIconButton className='mr-2'>
                    <ExternalLink className='h-5 w-5' strokeWidth={2} />
                </SvgIconButton>
                <span className='text-primary-dark md:truncate'>
                    {bookmark.title}
                </span>

            </a>
            <div className=' flex justify-center px-4 py-2'>
                <UrlImage className='rounded border-primary-border p-1 md:border' enableEndpoint={false} objectFit='cover' src={bookmark?.image || ''}
                    style={imageStyle}
                    fallback={(
                        <div className='w-full text-xs text-secondary-main'>
                            <NotFound style={imageStyle} text={`画像が見つかりません`} />
                        </div>)} />
            </div>
            <div className='w-full px-4 py-2 text-sm'>
                <div className='font-semibold text-primary-main'>説明:</div>
                <div className='mb-2'>{bookmark.description || '-'}</div>
                <div className='font-semibold text-primary-main'>ひとこと:</div>
                <div className='mb-2'>{bookmark.comment || '-'}</div>
                <div className='mb-2 font-semibold text-primary-main'>類似度:</div>
                <div className='mb-2 ml-2'>
                    <Link href={myGroupLink} className='text-primary-main underline'>{currentGroup.name}(現在)</Link>
                    <span className='mx-2'>{Math.floor(originalSimilarity * 100)}%</span>
                </div>
                <div className='mb-2 ml-2'>
                    <Link href={targetGroupLink} className='text-primary-main underline'>{targetGroup.name}</Link>
                    <span className='mx-2'>{Math.floor(targetSimilarity * 100)}%</span>
                </div>

            </div>
            <div className='flex justify-end p-2'>
                <OutlinedButton className='mr-2 md:hidden' onClick={() => {
                    router.push(`/analyze`)
                }}>
                    戻る
                </OutlinedButton>
                <OutlinedButton className='' onClick={() => {
                    router.push(`/bookmarks/${currentGroup.id}/${bookmark.id}`)
                }}>ブックマークを編集する</OutlinedButton>
            </div>
        </div>
    );
}

export default SimilarityDetail