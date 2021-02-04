import React, { useState, useContext } from 'react'
import { InputWithIcon } from '../../Common/Input'
import { SvgIconButton } from '../../Common/Button'
import { Add, Folder } from '../../Common/Icon'
import FirebaseContext from '../../../context/FirebaseContext'
import { useProfile } from '../../../modules/profileSlice'
import { useGroupsByUser } from '../../../modules/groupSlice'
import { spliceAndInsert } from '../../../logics'
import ListItem from './ListItem'
import Presenter from './Presenter'
import Droppable from './Droppable'

const Container: React.FC = () => {
    const [newGroup, setNewGroup] = useState('')
    const [hover, setHover] = useState(-1)
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)

    const onChangeOrder = (next: number) => (id: string) => {
        const ordered = spliceAndInsert(groups.map(g => g.id), next, id)
        clientService.changeGroupOrder(ordered)
    }

    const input = (
        <InputWithIcon
            aria-label='Input New Group'
            value={newGroup}
            onChange={(e) => {
                setNewGroup(e.target.value)
            }} placeholder='新しいグループ' icon={<Folder />} />)

    const addButton = (
        <SvgIconButton
            aria-label='Add Group'
            onClick={() => {
                if (newGroup === '' || !profile.id) {
                    console.warn(`cannot add group:newGroup:${newGroup},profileId:${profile.id}`)
                    return
                }
                clientService.addGroup(newGroup, profile.id, (id) => {
                    console.log(`created ${id}.`)
                    setNewGroup('')
                })
            }}>
            <Add strokeWidth={1.5} className='w-10' />
        </SvgIconButton>
    )
    const groupList = groups.map((group, idx) => {
        return (
            <React.Fragment key={group.id}>
                {idx === 0 && (
                    <Droppable droppable={hover != -1} onChangeOrder={onChangeOrder(0)} open={hover === 0} />
                )}
                <ListItem bookmarkGroup={group} onHover={setHover} listIndex={idx} />
                <Droppable droppable={hover != -1} onChangeOrder={onChangeOrder(idx + 1)} open={hover === idx + 1} />
            </React.Fragment>
        )
    })
    return (
        <Presenter
            {...{
                input,
                addButton,
                groupList
            }}
        />
    )
}

export default Container