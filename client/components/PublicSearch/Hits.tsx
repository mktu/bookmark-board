import React from 'react'
import { InfiniteHitsProvided, Hit } from 'react-instantsearch-core'
import InfiniteScroll from 'react-infinite-scroller';
import ListItem from './ListItem'

type Props = {

} & InfiniteHitsProvided<Hit<BookmarkGroupIndex>>

const Hits: React.FC<Props> = ({
    hasMore,
    refineNext,
    hits,
}) => {
    return (
        <InfiniteScroll
            {...{
                hasMore,
                loadMore: refineNext
            }}
        >
            <div>
                {hits.map(b => (
                    <ListItem key={b.objectID} hit={b} />
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default Hits