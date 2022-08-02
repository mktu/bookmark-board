import { useGroups } from '@hooks/useLiffBookmarkGroups'
import Presenter from './Presenter'
import ListItem, { NoGroup } from './ListItem'
import ListPlaceholder from './ListPlaceholder'
import NotFound from './NotFound'
import { ContainedButton, OutlinedButton } from '@components/Common/Button'


const Container: React.VFC = () => {
    const { groups, defaultGroup, error, setDefaultGroup, fetching, posting, updateDefaultGroup, onClose, } = useGroups()
    const groupList = fetching ? <ListPlaceholder /> : groups.length > 0 ? [...groups.map(v => (
        <ListItem key={v.id} onCheck={() => {
            setDefaultGroup(v.id)
        }} checked={defaultGroup === v.id} group={v} />
    )), <NoGroup key='no-group' checked={!defaultGroup} onCheck={() => {
        setDefaultGroup('')
    }} />] : []
    const submit = (
        <ContainedButton disabled={posting} onClick={() => {
            updateDefaultGroup()
        }} className='h-16 w-full'>{posting ? '更新中...' : '更新'}</ContainedButton>
    )
    const cancel = (
        <OutlinedButton onClick={onClose} disabled={posting} className='h-16 w-full bg-white'>閉じる</OutlinedButton>
    )
    if (error) {
        return <NotFound message={error} />
    }
    return (
        <Presenter groups={groupList} submit={submit} cancel={cancel} />
    )
}

export default Container