import { useMemo } from 'react'
import useBookmarkSimilarity from '@hooks/useBookmarkSimilarity'
import FolderOpen from '@components/Common/Icon/FolderOpen'
import SimilarityListItem from './SimilarityListItem'
import SimilarityListMobile from './SimilarityListMobile'
import NotFound from './NotFound'
import SimilarityListPlaceholder from './SimilarityListPlaceholder'
import { checkIsTouch } from '@utils/dnd'

type Props = ReturnType<typeof useBookmarkSimilarity>

const isTouch = checkIsTouch()

const ListItem = isTouch ? SimilarityListMobile : SimilarityListItem

const SimilarityList: React.VFC<Props> = ({
    similarity,
    bookmarkSimilarities,
    addIgnore,
    allFetched,
    moveBookmark
}) => {
    const header = useMemo(() => (
        <div className='z-10 p-2 w-full bg-white border-b border-primary-border shadow'>
            <h2 className='my-1 font-semibold text-primary-main'>Bookmark Advice</h2>
            <div className='text-sm text-primary-main'>
                <span>タイトル・コメントの類似度に基づき、グルーピングの手助けします</span>
                ({similarity?.updated} 分析)</div>
        </div>
    ),[similarity])
    const listView = useMemo(() => allFetched ? bookmarkSimilarities.length > 0 ? (
        <ul className='overflow-y-auto p-2 max-w-full h-full bg-white'>
            {bookmarkSimilarities.map(g => (
                <li key={g.groupId} className='py-2'>
                    <div className='flex items-center text-primary-main'>
                        <FolderOpen className='mr-2 w-5 h-5 stroke-primary-main' />
                        <div>{g.groupName}</div>
                    </div>
                    <ul className='px-2 max-w-full'>{g.similarities.map(b => b.bookmark && (
                        <li key={b.bookmarkId} className='mt-1'>
                            <ListItem diff={b.diff} moveBookmark={moveBookmark} addIgnore={addIgnore} bookmark={b.bookmark} detailPath={`/analyze/${b.bookmarkId}`} targetGroup={b.targetGroup} />
                        </li>
                    ))}</ul>
                </li>
            ))}
        </ul>
    ): <NotFound /> : (
        <SimilarityListPlaceholder />
    ), [bookmarkSimilarities, addIgnore, allFetched, moveBookmark])
    return (
        <div className='flex flex-col w-full h-full'>
            {header}
            {listView}
        </div>
    )
}

export default SimilarityList