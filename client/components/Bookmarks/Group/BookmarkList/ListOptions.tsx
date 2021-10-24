import React from 'react'
import { useRefinementById } from '@modules/groupRefinementSlice'
import { saveRefinement } from '@utils/localStorages/group'

type Props = {
    groupId: string
}

const ListOptions: React.FC<Props> = ({
    groupId
}) => {
    const { listViewMask = [] } = useRefinementById(groupId)
    const maskDescription = listViewMask.includes('description')
    const maskUrl = listViewMask.includes('url')
    const maskComment = listViewMask.includes('comment')
    const createChangeEvent = (type: ListViewMask) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: ListViewMask[] = e.target.checked ? listViewMask.filter(v => v !== type) : [...listViewMask, type]
        saveRefinement(groupId, {
            listViewMask : value
        })
    }
    return (
        <div className='flex flex-col justify-start p-4 font-semibold align-middle bg-white rounded border border-primary-border shadow-lg'>
            <p className='text-sm text-primary-main'>表示する項目を選択</p>
            <label className='flex flex-row items-center mt-2 cursor-pointer' htmlFor='description'>
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
                <input type='checkbox' className='block mr-2 hover:bg-primary-50 cursor-pointer' defaultChecked={!maskComment} 
                onChange={createChangeEvent('comment')} />
                <span>ひとこと</span>
            </label>
        </div>
    )
}

export default ListOptions