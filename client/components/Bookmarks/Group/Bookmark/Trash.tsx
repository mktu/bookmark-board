import React, { useState } from 'react'
import { TextButton, OutlinedButton } from '../../../Common/Button'
import { Trash as Icon } from '../../../Common/Icon'

type Props = {
    handleDelete: () => void,
}

const Trash: React.FC<Props> = ({
    handleDelete
}) => {
    const [select, setSelect] = useState(false)
    return (
        <div>
            <TextButton fontType='none' colorType='secondary' className='flex items-center stroke-secondary-500 text-sm hover:stroke-secondary-dark' aria-label='Delete Bookmark' onClick={(e) => {
                setSelect(true)
                e.stopPropagation()
            }} >
                <Icon className='w-5' strokeWidth={2} />
                <span>このブックマークを削除</span>
            </TextButton>
            {select && (
                <div className='mt-2 text-sm text-secondary-main'>
                    <div>元に戻せませんがよろしいですか?</div>
                    <div className='mt-2 flex items-center'>
                        <TextButton fontType='none' className='ml-auto' colorType='secondary' onClick={() => { setSelect(false) }}>Cancel</TextButton>
                        <OutlinedButton colorType='secondary' className='mx-2' onClick={() => { handleDelete() }}>削除</OutlinedButton>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Trash