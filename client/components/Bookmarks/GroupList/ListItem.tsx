import React from 'react'
import { FolderOpen } from '../../Common/Icon'
import styles from './ListItem.module.scss'
import { useRouter } from 'next/router'

type Props = {
    bookmarkGroup: BookmarkGroup
}

const ListItem: React.FC<Props> = ({
    bookmarkGroup
}) => {
    const router = useRouter()
    const { ids } = router.query
    const selected = Boolean(ids) && ids[0] === bookmarkGroup.id
    return (
        <button onClick={()=>{
            router.push(`/bookmarks/[[...ids]]`,`/bookmarks/${bookmarkGroup.id}`, {shallow:true})
        }} className={`w-full flex flex-row text-primary-main items-center p-2 cursor-pointer hover:text-primary-dark hover:bg-primary-hover focus:outline-none ${selected && 'bg-primary-hover'}`}>
            <div className={styles['listitem-icon']}>
                <FolderOpen/>
            </div>
            <div className='ml-2'>{bookmarkGroup.name}</div>
        </button>
    )
}

export default ListItem