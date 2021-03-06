import React from 'react'
import { InfiniteHitsProvided, Hit } from 'react-instantsearch-core'
import SimpleInfiniteScroller from 'react-simple-infinite-scroller'
import ListItem from './ListItem'

type Props = {

} & InfiniteHitsProvided<Hit<BookmarkGroupIndex>>

const Hits: React.FC<Props> = ({
    hasMore,
    refineNext,
    hits,
}) => {
    return (
        <SimpleInfiniteScroller
            {...{
                canScrollDown: hasMore,
                loadMore: refineNext
            }}
        >
            <div>
                {hits.map(b => (
                    <ListItem key={b.objectID} hit={b} />
                ))}
            </div>
        </SimpleInfiniteScroller>
    )
}

export default Hits