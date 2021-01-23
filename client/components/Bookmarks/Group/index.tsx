import React from 'react'
import { useBookmarkIdsByRefinements } from '../../../modules/bookmarkSlice'
import { useGroupById } from '../../../modules/groupSlice'
import { useRefinementById } from '../../../modules/groupRefinementSlice'
import { useRouter } from 'next/router'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import BookmarkList from './BookmarkList'
import Bookmark, { Dialog } from './Bookmark'
import { DefaultSize, MobileSize } from '../../Layout/responsive'
import { ShareDialog, Share } from './Share'
import { DetailDialog, Detail } from './Detail'
import { ColorOptionDialog, ColorOptions } from './BookmarkList/ColorOption'
import useBookmarkRouteRedirect from '../../../hooks/useBookmarkRouteRedirect'

type Props = {
    groupId: string,
    bookmarkId: string,
}
const Group: React.FC<Props> = ({
    groupId,
    bookmarkId,
}) => {
    const router = useRouter()
    const group = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    const hasFilter = refinements?.colorMasks?.length > 0 || false
    const bookmarkIds = useBookmarkIdsByRefinements(refinements)
    useBookmarkRouteRedirect(groupId, group)
    const jumpToGroupRoot = () => {
        router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}`, { shallow: true })
    }
    let alternativeMode = bookmarkId && 'bookmark'
    if (bookmarkId === 'setting') {
        alternativeMode = 'setting'
    }
    if (bookmarkId === 'share') {
        alternativeMode = 'share'
    }
    if (bookmarkId === 'colors') {
        alternativeMode = 'colors'
    }
    if (!groupId) {
        return <div />
    }
    if (bookmarkIds.length == 0 && !hasFilter) {
        return (
            <Layout
                header={<Header groupId={groupId} />}
                contents={<NoItem groupId={groupId} />}
            />
        )
    }
    // can use react-responsive because these component never rendered in server side
    const alternatives = {
        setting: (
            <>
                <DefaultSize>
                    <DetailDialog open onClose={jumpToGroupRoot}>
                        <Detail group={group} onClose={jumpToGroupRoot}/>
                    </DetailDialog>
                </DefaultSize>
                <MobileSize>
                    <Detail group={group} onClose={jumpToGroupRoot}/>
                </MobileSize>
            </>
        ),
        share: (
            <>
                <DefaultSize>
                    <ShareDialog open onClose={jumpToGroupRoot}>
                        <Share sharable={Boolean(group.sharable)} id={groupId} />
                    </ShareDialog>
                </DefaultSize>
                <MobileSize>
                    <Share sharable={Boolean(group.sharable)} id={groupId} />
                </MobileSize>
            </>
        ),
        bookmark: (
            <>
                <DefaultSize>
                    <Dialog open={Boolean(bookmarkId)} onClose={jumpToGroupRoot}>
                        <Bookmark bookmarkId={bookmarkId} onClose={jumpToGroupRoot}/>
                    </Dialog>
                </DefaultSize>
                <MobileSize>
                    <Bookmark bookmarkId={bookmarkId} onClose={jumpToGroupRoot}/>
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
    }
    return (
        <Layout
            header={<Header groupId={groupId} />}
            contents={<BookmarkList bookmarkIds={bookmarkIds} groupId={groupId} />}
            alternative={Boolean(alternativeMode)}
            alternativeContent={alternatives[alternativeMode]}
        />
    )
}

export default Group