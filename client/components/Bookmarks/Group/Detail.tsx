import React, { useMemo } from 'react'
import { Modal } from 'react-responsive-modal'
import Avatar, { GroupImage } from '../../Common/Avatar'
import { Label } from '../../Common/Label'
import { OutlinedButton, ContainedButton } from '../../Common/Button'
import { TextInput, TextArea } from '../../Common/Input'
import { useProfile } from '../../../modules/profileSlice'
import { numberToDateTime } from '../../../utils'
import DangerZone from './DangerZone'
import { useBookmarkGroup } from '../../../hooks/useBookmarkGroup'

type Props = {
    group?: BookmarkGroup,
    onClose: () => void
}

const Detail: React.FC<Props> = ({
    group,
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
        group: editGroup
    } = useBookmarkGroup(group?.id)


    const editorComponents = useMemo(() => {
        return editors.map(e => (
            <div key={e.id} className='flex items-center'>
                <Avatar src={e.image} width='48px' height='48px' className='block mr-2 my-2' name={e.name} />
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

    const groupImage = useMemo(() => (
        <GroupImage width='48px' height='48px' src={group.imageUrl} />
    ), [group.imageUrl])

    const dangerZone = useMemo(() => profile.id === group.owner && (
        <DangerZone className='mt-6' groupName={group.name} handleDelete={handleDeleteGroup} />
    ), [profile.id, group.owner, group.name, handleDeleteGroup])

    const title = useMemo(() => (
        <TextInput label='グループ名' id='groupName' value={editGroup.name} onChange={(e) => { updateGroup('name')(e.target.value) }} />
    ), [editGroup.name, updateGroup])

    const description = useMemo(() => (
        <TextArea label='説明' id='description' value={editGroup.description || ''} minRows={4} borderType='square' onChange={(e) => {
            updateGroup('description')(e.target.value)
        }} />
    ), [editGroup.description, updateGroup])

    if (!group) {
        return null
    }

    return (
        <div className='w-full p-2'>
            <div className='flex items-center'>
                <div>
                    {groupImage}
                </div>
                <div className='w-full'>
                    {title}
                </div>
                <div className='ml-auto px-2'>
                    <OutlinedButton className='text-sm whitespace-no-wrap'>
                        画像を変更
                    </OutlinedButton>
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    {description}
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    <Label textSize='text-xs'>編集者</Label>
                </div>
                <div className='p-2 w-full'>
                    {editorComponents}
                </div>
            </div>
            {dangerZone}
            <div className='mt-4 flex justify-end text-primary-main'>
                <OutlinedButton onClick={onClose} className='mx-2'>キャンセル</OutlinedButton>
                <ContainedButton disabled={!hasChange} onClick={() => {
                    handleSubmit(onClose)
                }}>更新</ContainedButton>
            </div>
            <div className='mt-2 flex justify-end text-xs text-primary-main'>
                <div>
                    {group.lastUpdate && `最終更新 ${numberToDateTime(group.lastUpdate)}`}
                </div>
            </div>
        </div>
    )
}


type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}
const DetailDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal blockScroll={false} open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-full md:w-2/3',
        }}>
            {children}
        </Modal>
    )
}

export {
    Detail,
    DetailDialog
}