import { useGroups } from '@hooks/useLiffBookmark'
import Presenter from './Presenter'
import ListItem from './ListItem'
import ListPlaceholder from './ListPlaceholder'
import { ContainedButton, OutlinedButton } from '@components/Common/Button'


const Container : React.VFC = ()=> {
    const { groups, defaultGroup, error, setDefaultGroup, fetching, posting, updateDefaultGroup, onClose } = useGroups()
    const groupList = fetching ? <ListPlaceholder />  : groups.map(v=>(
        <ListItem key={v.id}  onCheck={()=>{
            setDefaultGroup(v.id)
        }} checked={defaultGroup===v.id} group={v}/>
    ))
    const submit = (
        <ContainedButton disabled={posting} onClick={()=>{
            updateDefaultGroup()
        }} className='w-full h-16'>{posting ? '更新中...' : '更新'}</ContainedButton>
    )
    const cancel = (
        <OutlinedButton onClick={onClose} disabled={posting} className='w-full h-16 bg-white'>閉じる</OutlinedButton>
    )
    return (
        <Presenter groups={groupList} error={error} submit={submit} cancel={cancel}/>
    )
}

export default Container