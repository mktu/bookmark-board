import React, { useState, useContext } from 'react'
import { InputWithIcon } from '../../Common/Input'
import { SvgIconButton } from '../../Common/Button'
import { Add, Folder } from '../../Common/Icon'
import FirebaseContext from '../../../context/FirebaseContext'
import { useProfile } from '../../../modules/profileSlice'
import { useGroupsByUser } from '../../../modules/groupSlice'
import ListItem from './ListItem'

type Props = {

}

const GroupList: React.FC<Props> = () => {
    const [newGroup, setNewGroup] = useState('')
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    return (
        <div className='bg-white w-full h-full flex flex-col border-primary-border border-r'>
            <div className='border-primary-border flex flex-row justify-between p-1 items-center text-primary-main'>
                <div className='p-2 w-full'>
                    <InputWithIcon
                        aria-label='Input New Group'
                        value={newGroup}
                        onChange={(e) => {
                            setNewGroup(e.target.value)
                        }} placeholder='新しいグループ' icon={<Folder />} />
                </div>
                <div>
                    <SvgIconButton 
                        aria-label='Add Group'
                        onClick={()=>{
                        if(newGroup==='' || !profile.id){
                            console.warn(`cannot add group:newGroup:${newGroup},profileId:${profile.id}`)
                            return
                        }
                        clientService.addGroup(newGroup, profile.id, (id)=>{
                            console.log(`created ${id}.`)
                            setNewGroup('')
                        })
                    }}>
                        <Add strokeWidth='1.5px' className='w-10'/>
                    </SvgIconButton>
                </div>
            </div>
            <div className='overflow-scroll h-full'>
                {groups.map(group=>(
                    <ListItem key={group.id} bookmarkGroup={group}/>
                ))}
            </div>
        </div>
    )
}

export default GroupList