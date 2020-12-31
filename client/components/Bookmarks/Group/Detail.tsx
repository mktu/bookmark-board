import React from 'react'
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
    group: BookmarkGroup
}

const Detail: React.FC<Props> = ({
    group
}) => {
    const profile = useProfile()
    const {
        editors,
        updateGroup,
        handleRemoveUser,
        handleDeleteGroup
    } = useBookmarkGroup(group.id)

    return (
        <div className='w-full px-2'>
            <div className='flex items-center'>
                <div>
                    <GroupImage width='48px' height='48px' src={group.imageUrl} />
                </div>
                <div className='w-full'>
                    <Label textSize='text-xs' htmlFor='groupName'>グループ名</Label>
                    <TextInput id='groupName' value={group.name} handleSubmit={updateGroup('name')} />
                </div>
                <div className='ml-auto px-2'>
                    <OutlinedButton className='text-sm whitespace-no-wrap'>
                        画像を変更
                    </OutlinedButton>
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    <Label textSize='text-xs' htmlFor='description' className='mb-2'>説明</Label>
                    <TextArea id='description' value={group.description || ''} minRows={4} borderType='square' handleSubmit={updateGroup('description')} />
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    <Label textSize='text-xs'>編集者</Label>
                </div>
                <div className='p-2 w-full'>
                    {editors.map(e => (
                        <div key={e.id} className='flex items-center'>
                            <Avatar src={e.image} width='48px' height='48px' className='block mr-2 my-2' name={e.name}/>
                            <p className='text-primary-main text-center'>{e.name}</p>
                            {group.owner !== e.id && (profile.id === e.id ? (
                                <ContainedButton className='ml-auto text-sm whitespace-no-wrap'>
                                    離脱する
                                </ContainedButton>
                            ) : (
                                    <ContainedButton className='ml-auto text-sm whitespace-no-wrap' onClick={()=>{handleRemoveUser(e.id)}}>
                                        除外
                                    </ContainedButton>
                                ))}

                        </div>
                    ))}
                </div>
            </div>
            <DangerZone className='mt-6' groupName={group.name} handleDelete={handleDeleteGroup} />
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
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-2/3',
        }}>
            {children}
        </Modal>
    )
}

export {
    Detail,
    DetailDialog
}