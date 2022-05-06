import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { checkIsTouch } from '@utils/dnd'
import InfiniteScroll from 'react-infinite-scroller';
import useBookmarkSearch from '../../hooks/useBookmarkSearch'
import Presenter from './Presenter'
import ListItem from './ListItem'
import Refinements from './Refinements'
import GroupItem from './GroupItem'

const Container: React.FC = () => {
    const router = useRouter()
    const { grouping } = router.query
    const enableGrouping = grouping !== 'false'
    const { searchTargets, ungroupedTargets, hasMore, loadMore, keyword, setKeyword } = useBookmarkSearch()
    const globalLink = '/public-search'

    const listItem = useMemo(() => enableGrouping ? searchTargets.map(g => (
        <GroupItem className='my-2' key={g.id} group={g}>
            {g.bookmarks.map(b => (
                <ListItem key={b.id} bookmark={b} groupName={g.name} grouping={enableGrouping}/>
            ))}
        </GroupItem>
    )) : ungroupedTargets.map((b) => (
        <ListItem key={b.id} bookmark={b} groupName={b.groupName} grouping={enableGrouping}/>
    )), [searchTargets, ungroupedTargets, enableGrouping])

    return (
        <Presenter
            globalLink={globalLink}
            searchRefinements={
                <Refinements
                    grouping={enableGrouping}
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onChangeGroupng={(enable) => {
                        if (enableGrouping !== enable) {
                            router.push({
                                pathname: '/search',
                                query: { grouping: enable }
                            })
                        }
                    }}
                />
            }
            bookmarkList={(
                <InfiniteScroll
                    {...{
                        pageStart: 0,
                        hasMore,
                        loadMore,
                        useWindow: checkIsTouch()
                    }}
                >
                    <ul>
                        {listItem}
                    </ul>
                </InfiniteScroll>
            )}
        />
    )
}

export default Container