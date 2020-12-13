import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import { FolderOpen } from '../../Common/Icon'
import styles from './ListItem.module.scss'
import { useRouter } from 'next/router'
import FirebaseContext from '../../../context/FirebaseContext'
import classNames from 'classnames'

type Props = {
    bookmarkGroup: BookmarkGroup
}

const ListItem: React.FC<Props> = ({
    bookmarkGroup
}) => {
    const { clientService } = useContext(FirebaseContext)

    const [{ isOver }, drop] = useDrop({
        accept: 'LIST',
        drop: (_, monitor) => {
            const i = monitor.getItem()
            clientService.moveGroup(i, bookmarkGroup.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })
    if (!bookmarkGroup || !bookmarkGroup.id) {
        return <div />
    }
    const router = useRouter()
    const { ids } = router.query
    const selected = Boolean(ids) && ids[0] === bookmarkGroup.id
    return (
        <button ref={drop} onClick={() => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${bookmarkGroup.id}`, { shallow: true })
        }} className={classNames(`w-full flex flex-row text-primary-main items-center p-2 cursor-pointer hover:text-primary-dark hover:bg-primary-hover focus:outline-none ${selected && 'bg-primary-hover'}`,
        isOver && 'border-dotted border-primary-main border-2')}>
            <div className={styles['listitem-icon']}>
                <FolderOpen />
            </div>
            <div className='ml-2'>{bookmarkGroup.name}</div>
        </button>
    )
}

export default ListItem