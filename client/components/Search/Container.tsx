import React from 'react'
import SimpleInfiniteScroller from 'react-simple-infinite-scroller';
import useBookmarkSearch from '../../hooks/useBookmarkSearch'
import Presenter from './Presenter'
import ListItem from './ListItem'
import Refinements from './Refinements'
import GroupItem from './GroupItem'

type Props = {

}

const Container: React.FC<Props> = () => {
    const { searchTargets, hasMore, loadMore, keyword, setKeyword } = useBookmarkSearch()
    const globalLink = '/public-search'
    return (
        <Presenter
            globalLink={globalLink}
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
                    <ul>
                        {searchTargets.map(g => (
                            <GroupItem className='my-2' key={g.id} group={g}>
                                {g.bookmarks.map(b => (
                                    <ListItem key={b.id} bookmark={b} />
                                ))}
                            </GroupItem>
                        ))}
                    </ul>
                </SimpleInfiniteScroller>
            )}
        />
    )
}

export default Container