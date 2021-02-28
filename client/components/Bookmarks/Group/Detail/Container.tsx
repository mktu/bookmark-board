import React, { useMemo } from 'react'
import { toast } from 'react-toastify';
import WithFrame from '../../../Common/Avatar/NextImage'
import Initial from '../../../Common/Avatar/Initial'
import { OutlinedButton, ContainedButton } from '../../../Common/Button'
import TextInput from '../../../Common/Input/TextInput'
import TextArea from '../../../Common/Input/TextArea'
import { useProfile } from '../../../../modules/profileSlice'
import { numberToDateTime } from '../../../../utils'
import DangerZone from '../DangerZone'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import Presenter from './Presenter'

type Props = {
    groupId: string,
    onClose: () => void
}

const Container: React.FC<Props> = ({
    groupId,
    onClose
}) => {
    const profile = useProfile()
    const {
        editors,
        updateGroup,
        handleRemoveUser,
        handleDeleteGroup,
        handleSubmit,
        hasChange,
        group
    } = useBookmarkGroup(groupId)


    const editorComponents = useMemo(() => {
        return editors.map(e => (
            <div key={e.id} className='flex items-center'>
                <WithFrame 
                    src={e.image} 
                    width={48} 
                    height={48} 
                    className='block mr-2 my-2' 
                    name={e.name}
                    fallback={<Initial 
                        width={48} 
                        height={48} 
                        name={e.name}/>}
                    />
                <p className='text-primary-main text-center'>{e.name}</p>
                {group.owner !== e.id && (profile.id === e.id ? (
                    <OutlinedButton colorType='secondary' className='ml-auto text-sm whitespace-no-wrap'>
                        離脱する
                    </OutlinedButton>
                ) : (
                        <OutlinedButton colorType='secondary' className='ml-auto text-sm whitespace-no-wrap' onClick={() => { handleRemoveUser(e.id) }}>
                            除外
                        </OutlinedButton>
                    ))}
            </div>
        ))
    }, [editors, handleRemoveUser, profile, group.owner])

    const dangerZone = useMemo(() => profile.id === group.owner && (
        <DangerZone className='mt-6' groupName={group.name} handleDelete={handleDeleteGroup} />
    ), [profile.id, group.owner, group.name, handleDeleteGroup])

    const title = useMemo(() => (
        <TextInput label='グループ名' id='groupName' value={group.name} onChange={(e) => { updateGroup('name')(e.target.value) }} />
    ), [group.name, updateGroup])

    const description = useMemo(() => (
        <TextArea label='説明' id='description' value={group.description || ''} minRows={4} border='outlined' onChange={(e) => {
            updateGroup('description')(e.target.value)
        }} />
    ), [group.description, updateGroup])

    const update = (
        <ContainedButton disabled={!hasChange} onClick={async () => {
            try {
                await handleSubmit()
                onClose()
            } catch (error) {
                console.error(error)
                toast.error('更新に失敗しました')
            }
        }}>更新</ContainedButton>
    )

    const cancel = (
        <OutlinedButton onClick={onClose}>キャンセル</OutlinedButton>
    )

    const lastUpdate = group.lastUpdate && `最終更新 ${numberToDateTime(group.lastUpdate)}`

    if (!group) {
        return null
    }

    return <Presenter
        {...{
            editorComponents,
            title,
            description,
            dangerZone,
            update,
            cancel,
            lastUpdate
        }}
    />
}


export default Container