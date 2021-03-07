import React, { useMemo } from 'react'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import BookmarkList from './BookmarkList'
import Home from './Home'
import Bookmark, { Dialog } from './Bookmark'
import { DefaultSize, MobileSize } from '@components/Layout/responsive'
import { ShareDialog, Share } from './Share'
import { DetailDialog, Detail } from './Detail'
import { ColorOptionDialog, ColorOptions } from './BookmarkList/ColorOption'
import useBookmarkGroupRoot from '@hooks/useBookmarkGroupRoot'

type Props = {
    groupId: string,
    bookmarkId: string,
}
const Group: React.FC<Props> = ({
    groupId,
    bookmarkId,
}) => {
    const {
        group,
        bookmarkIds,
        hasFilter,
        alternativeMode,
        status,
        bookmarkStatus,
        jumpToGroupRoot,
    } = useBookmarkGroupRoot(groupId, bookmarkId)
    // can use react-responsive because these component never rendered in server side
    const alternatives = useMemo(() => ({
        setting: (
            <>
                <DefaultSize>
                    <DetailDialog open onClose={jumpToGroupRoot}>
                        <Detail groupId={groupId} onClose={jumpToGroupRoot} />
                    </DetailDialog>
                </DefaultSize>
                <MobileSize>
                    <Detail groupId={groupId} onClose={jumpToGroupRoot} />
                </MobileSize>
            </>
        ),
        share: (
            <>
                <DefaultSize>
                    <ShareDialog open onClose={jumpToGroupRoot}>
                        <Share groupId={groupId} onClose={jumpToGroupRoot} />
                    </ShareDialog>
                </DefaultSize>
                <MobileSize>
                    <Share groupId={groupId} onClose={jumpToGroupRoot} />
                </MobileSize>
            </>
        ),
        bookmark: (
            <>
                <DefaultSize>
                    <Dialog open={Boolean(bookmarkId)} onClose={jumpToGroupRoot}>
                        <Bookmark bookmarkId={bookmarkId} onClose={jumpToGroupRoot} />
                    </Dialog>
                </DefaultSize>
                <MobileSize>
                    <Bookmark bookmarkId={bookmarkId} onClose={jumpToGroupRoot} />
                </MobileSize>
            </>
        ),
        colors: (
            <>
                <DefaultSize>
                    <ColorOptionDialog open onClose={jumpToGroupRoot}>
                        <ColorOptions groupId={groupId} onClose={jumpToGroupRoot} />
                    </ColorOptionDialog>
                </DefaultSize>
                <MobileSize>
                    <ColorOptions groupId={groupId} onClose={jumpToGroupRoot} />
                </MobileSize>
            </>
        )
    }), [jumpToGroupRoot, groupId, bookmarkId])
    const bookmarkList = useMemo(()=><BookmarkList bookmarkIds={bookmarkIds} groupId={groupId} />,[bookmarkIds,groupId])
    const header = useMemo(()=><Header groupId={groupId} />,[groupId])
    const noItem = useMemo(()=><NoItem groupId={groupId} />,[groupId])
    
    if(status!=='loaded' || bookmarkStatus !== 'loaded'){
        return <div />
    }
    if (!groupId || !group) {
        return <Home />
    }
    if (bookmarkIds.length == 0 && !hasFilter) {
        return (
            <Layout
                header={header}
                contents={noItem}
                alternative={Boolean(alternativeMode)}
                alternativeContent={alternatives[alternativeMode]}
            />
        )
    }
    return (
        <Layout
            header={header}
            contents={bookmarkList}
            alternative={Boolean(alternativeMode)}
            alternativeContent={alternatives[alternativeMode]}
        />
    )
}

export default Group