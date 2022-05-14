import useBookmarkSearch from '@hooks/useBookmarkSearch'
import InfiniteScroll from 'react-infinite-scroller';
import BookmarkListItem from '../Home/BookmarkListItem'
import Presenter from './Presenter'

const Container: React.FC = () => {
    const { ungroupedTargets, hasMore, loadMore } = useBookmarkSearch(30, 30)
    const list = (
        <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore} useWindow={false}>
            {ungroupedTargets.map(b => (
               <div key={b.id} className='my-2 text-primary-main'>
                    <BookmarkListItem bookmark={b} />
               </div>
            ))}
        </InfiniteScroll>
    )

    return <Presenter bookmarkList={list} />
}

export default Container