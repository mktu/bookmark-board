import React, { useState, useContext, useCallback } from 'react'
import { SvgIconButton } from '@components/Common/Button'
import { Add, Folder } from '@components/Common/Icon'
import FirebaseContext from '@context/FirebaseContext'
import { useProfile } from '@modules/profileSlice'
import { useGroupsByUser } from '@modules/groupSlice'
import useNewBookmarkGroup from '@hooks/useNewBookmarkGroup'
import { spliceAndInsert } from '../../../logics'
import ListItem from './ListItem'
import Presenter from './Presenter'
import Droppable from './Droppable'
import Input from './Input'

const Container: React.FC = () => {
    const [hover, setHover] = useState(-1)
    const [scrollToBottom, setScrollToBottom] = useState<{scroller:()=>void}>()
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const { newGroup, setNewGroup, submit, error } = useNewBookmarkGroup()

    const onChangeOrder = (next: number) => (id: string) => {
        const ordered = spliceAndInsert(groups.map(g => g.id), next, id)
        clientService.changeGroupOrder(ordered)
    }

    const registScroller = useCallback((cb:()=>void)=>{
        setScrollToBottom({scroller:cb})
    },[])

    const input = (
        <Input
            aria-label='Input New Group'
            value={newGroup}
            onChange={(e) => {
                setNewGroup(e.target.value)
            }} 
            onKeyPress={(e)=>{
                if (e.key == 'Enter') {
                    submit()
                    e.preventDefault()
                }
            }}
            placeholder='新しいグループ' icon={<Folder />} />)

    const addButton = (
        <SvgIconButton
            disabled={Boolean(error) || !newGroup}
            aria-label='Add Group'
            onClick={async ()=>{
                await submit()
                scrollToBottom && scrollToBottom.scroller()
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
                error,
                input,
                addButton,
                groupList,
                registScroller
            }}
        />
    )
}

export default Container