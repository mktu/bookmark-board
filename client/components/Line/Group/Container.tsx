import { useGroups } from '@hooks/useLiffBookmark'
import Presenter from './Presenter'
import ListItem from './ListItem'


const Container : React.VFC = ()=> {
    const { groups, defaultGroup, error, setDefaultGroup } = useGroups()
    const groupList = groups.map(v=>(
        <ListItem key={v.id}  onCheck={()=>{
            setDefaultGroup(v.id)
        }} checked={defaultGroup===v.id} group={v}/>
    ))
    return (
        <Presenter groups={groupList} error={error}/>
    )
}

export default Container