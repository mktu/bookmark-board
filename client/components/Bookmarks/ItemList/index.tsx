import React from 'react'
import { useBookmarkIdsByGroup } from '../../../modules/bookmarkSlice'
import { useRouter } from 'next/router'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import Content from './Content'

type Props = {

}
const ItemList: React.FC<Props> = () => {
    const router = useRouter()
    const { ids } = router.query
    const groupId = ids && ids.length > 0 ? ids[0] : ''
    const bookmarkIds = useBookmarkIdsByGroup(groupId)
    if (!groupId) {
        return <div />
    }
    if (bookmarkIds.length == 0) {
        return (
            <Layout
                header={<Header groupId={groupId} />}
                contents={<NoItem groupId={groupId} />}
            />
        )
    }
    return (
        <Layout
            header={<Header groupId={groupId} />}
            contents={<Content bookmarkIds={bookmarkIds} groupId={groupId}/>}
        />
    )
}

export default ItemList