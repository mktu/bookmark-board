import React, { useMemo, useCallback } from 'react'
import { toast } from 'react-toastify';
import WithFrame from '@components/Common/Avatar/NextImage'
import Initial from '@components/Common/Avatar/Initial'
import { OutlinedButton, ContainedButton, SvgIconButton } from '@components/Common/Button'
import TextInput from '@components/Common/Input/TextInput'
import TextArea from '@components/Common/Input/TextArea'
import ArrowLeft from '@components/Common/Icon/ArrowLeft'
import { useProfile } from '@modules/profileSlice'
import { numberToDateTime } from '../../../../utils'
import DangerZone from '../DangerZone'
import { useBookmarkGroup } from '@hooks/useBookmarkGroup'
import { useAlgoliaRegister } from '@hooks/useAlgoliaRegister'
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
        leaveGroup,
        hasChange,
        group
    } = useBookmarkGroup(groupId)
    const { handleUpdateAlgolia } = useAlgoliaRegister(groupId, group?.searchable)
    const onUpdate = useCallback(async () => {
        try {
            const { after, before } = await handleSubmit()
            handleUpdateAlgolia(after, before).catch(console.error)
            onClose()
        } catch (error) {
            console.error(error)
            toast.error('更新に失敗しました')
        }
    }, [handleSubmit, handleUpdateAlgolia, onClose])


    const editorComponents = useMemo(() => {
        return editors.map(e => (
            <div key={e.id} className='flex items-center'>
                <WithFrame
                    src={e.image}
                    width={48}
                    height={48}
                    className='my-2 mr-2 block'
                    name={e.name}
                    fallback={<Initial
                        width={48}
                        height={48}
                        name={e.name} />}
                />
                <p className='text-center text-primary-main'>{e.name}</p>
                {group.owner !== e.id && (profile.id === e.id ? (
                    <OutlinedButton colorType='secondary' className='ml-auto whitespace-nowrap text-sm' onClick={async () => {
                        await leaveGroup()
                        onClose()
                    }}>
                        離脱する
                    </OutlinedButton>
                ) : profile.id === group.owner && (
                    <OutlinedButton colorType='secondary' className='ml-auto whitespace-nowrap text-sm' onClick={() => { handleRemoveUser(e.id) }}>
                        除外
                    </OutlinedButton>
                ))}
            </div>
        ))
    }, [editors, handleRemoveUser, profile, group.owner, onClose, leaveGroup])

    const dangerZone = useMemo(() => profile.id === group.owner && (
        <DangerZone className='mt-6' groupName={group.name} handleDelete={async () => {
            try {
                await handleDeleteGroup()
                toast.success('グループを削除しました')
            } catch (error) {
                console.error(error)
                toast.error('削除に失敗しました')
            }
        }} />
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
        <ContainedButton disabled={!hasChange} onClick={onUpdate}>更新</ContainedButton>
    )

    const cancel = (
        <OutlinedButton onClick={onClose}>キャンセル</OutlinedButton>
    )

    const back = (
        <SvgIconButton onClick={onClose}>
            <ArrowLeft className='h-5 w-5' />
        </SvgIconButton>
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
            back,
            lastUpdate
        }}
    />
}


export default Container