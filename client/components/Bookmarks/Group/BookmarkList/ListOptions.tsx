import React, { useContext } from 'react'
import { useGroupById } from '../../../../modules/groupSlice'
import FirebaseContext from '../../../../context/FirebaseContext'

type Props = {
    groupId: string
}

const ListOptions: React.FC<Props> = ({
    groupId
}) => {
    const { clientService } = useContext(FirebaseContext)
    const { listViewMask = [] } = useGroupById(groupId)
    const maskDescription = listViewMask.includes('description')
    const maskUrl = listViewMask.includes('url')
    const maskComment = listViewMask.includes('comment')
    const createChangeEvent = (type: ListViewMask) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: ListViewMask[] = e.target.checked ? listViewMask.filter(v => v !== type) : [...listViewMask, type]
        clientService.modifyGroup(groupId, { listViewMask: value })
    }
    return (
        <div className='bg-white p-4 rounded shadow-lg border border-primary-border font-semibold  flex flex-col justify-start align-middle'>
            <p className='text-sm text-primary-main'>表示する項目を選択</p>
            <label className='flex flex-row cursor-pointer items-center mt-2' htmlFor='description'>
                <input id='description' type='checkbox' className='block mr-2 hover:bg-primary-50' defaultChecked={!maskDescription} 
                onChange={createChangeEvent('description')} />
                <span>説明</span>
            </label>
            <label className='flex flex-row items-center mt-2'>
                <input type='checkbox' className='block mr-2 hover:bg-primary-50 cursor-pointer' defaultChecked={!maskUrl} 
                onChange={createChangeEvent('url')} />
                <span>URL</span>
            </label>
            <label className='flex flex-row items-center mt-2'>
                <input type='checkbox' className='block mr-2 hover:bg-primary-50 cursor-pointer' defaultChecked={!maskUrl} 
                onChange={createChangeEvent('lastUpdate')} />
                <span>更新日時</span>
            </label>
            <label className='flex flex-row items-center mt-2'>
                <input type='checkbox' className='block mr-2 hover:bg-primary-50 cursor-pointer' defaultChecked={!maskComment} 
                onChange={createChangeEvent('comment')} />
                <span>ひとこと</span>
            </label>
        </div>
    )
}

export default ListOptions