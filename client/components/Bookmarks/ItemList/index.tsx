import React from 'react'
import { selectGroupsByUser, useGroups } from '../../../modules/groupSlice'
import { useBookmarkIdsByGroup } from '../../../modules/bookmarkSlice'
import { useRouter } from 'next/router'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import Content from './Content'

type Props = {

}
const ItemList: React.FC<Props> = () => {
    const groups = useGroups()
    const router = useRouter()
    const { ids } = router.query
    const id = ids && ids.length > 0 ? ids[0] : ''
    const bookmarkIds = useBookmarkIdsByGroup(id)
    const targetGroup = selectGroupsByUser(groups, id)
    if (!targetGroup) {
        return <div />
    }
    if (bookmarkIds.length == 0) {
        return (
            <Layout
                header={<Header group={targetGroup} />}
                contents={<NoItem groupId={targetGroup.id} />}
            />
        )
    }
    return (
        <Layout
            header={<Header group={targetGroup} />}
            contents={<Content bookmarkIds={bookmarkIds} group={targetGroup}/>}
        />
    )
}

export default ItemList