import React, { useEffect } from 'react'
import { useBookmarkIdsByRefinements } from '../../../modules/bookmarkSlice'
import { useGroupById, useGroupStatus } from '../../../modules/groupSlice'
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

type Props = {
    groupId: string,
    bookmarkId: string,
    settingMode?: boolean,
    shareMode?: boolean
}
const Group: React.FC<Props> = ({
    groupId,
    bookmarkId,
    settingMode,
    shareMode
}) => {
    const router = useRouter()
    const group = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    const hasFilter = refinements?.colorMasks?.length > 0 || false
    const bookmarkIds = useBookmarkIdsByRefinements(refinements)
    const status = useGroupStatus()
    const jumpToGroupRoot = () => {
        router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}`, { shallow: true })
    }
    useEffect(() => {
        if (!localStorage) {
            return
        }
        if (!groupId) {
            const lastGroupId = localStorage.getItem('groupId')
            if (lastGroupId) {
                router.replace(`/bookmarks/[[...ids]]`, `/bookmarks/${lastGroupId}`, { shallow: true })
                localStorage.removeItem('groupId')
            }
            return
        }
        if (status === 'loading') {
            return
        }
        if (!group) {
            router.replace(`/bookmarks`, `/bookmarks`, { shallow: true })
            return
        }
        localStorage.setItem('groupId', group.id)
    }, [group, status, groupId])

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
    return (
        <>
            <Layout
                header={<Header groupId={groupId} />}
                contents={<BookmarkList bookmarkIds={bookmarkIds} groupId={groupId} />}
                alternative={Boolean(bookmarkId) || settingMode || shareMode}
                alternativeContent={settingMode ?
                    <>
                        <DefaultSize>
                            <DetailDialog open={settingMode} onClose={jumpToGroupRoot}>
                                <Detail group={group} />
                            </DetailDialog>
                        </DefaultSize>
                        <MobileSize>
                            <Detail group={group} />
                        </MobileSize>
                    </> : shareMode ?
                        <>
                            <DefaultSize>
                                <ShareDialog open={shareMode} onClose={jumpToGroupRoot}>
                                    <Share sharable={Boolean(group.sharable)} id={groupId} />
                                </ShareDialog>
                            </DefaultSize>
                            <MobileSize>
                                <Share sharable={Boolean(group.sharable)} id={groupId} />
                            </MobileSize>
                        </> :
                        <>
                            <DefaultSize>
                                <Dialog open={Boolean(bookmarkId)} onClose={jumpToGroupRoot}>
                                    <Bookmark bookmarkId={bookmarkId} />
                                </Dialog>
                            </DefaultSize>
                            <MobileSize>
                                <Bookmark bookmarkId={bookmarkId} />
                            </MobileSize>
                        </>
                }
            />
        </>
    )
}

export default Group