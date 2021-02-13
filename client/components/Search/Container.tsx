import React from 'react'
import SimpleInfiniteScroller from 'react-simple-infinite-scroller';
import useBookmarkSearch from '../../hooks/useBookmarkSearch'
import Presenter from './Presenter'
import ListItem from './ListItem'
import Refinements from './Refinements'

type Props = {

}

const Container: React.FC<Props> = () => {
    const { bookmarks, hasMore, loadMore, keyword, setKeyword } = useBookmarkSearch()
    return (
        <Presenter
            searchRefinements={
                <Refinements
                    keyword={keyword}
                    setKeyword={setKeyword}
                />
            }
            bookmarkList={(
                <SimpleInfiniteScroller
                    {...{
                        canScrollDown: hasMore,
                        loadMore
                    }}
                >
                    <div>
                        {bookmarks.map(b => (
                            <ListItem key={b.id} bookmark={b} />
                        ))}
                    </div>
                </SimpleInfiniteScroller>
            )}
        />
    )
}

export default Container