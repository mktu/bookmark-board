import React, { useState } from 'react'
import { OutlinedButton } from '../../Common/Button'
import TextInputBase from '../../Common/Input/TextInputBase'
import classNames from 'classnames'

type Props = {
    className?: string
    groupName: string,
    handleDelete: () => void
}

const DangerZone: React.FC<Props> = ({
    className,
    groupName,
    handleDelete
}) => {
    const [input, setInput] = useState('')
    const enableDelete = groupName === input
    return (
        <div className={classNames('p-4 relative border border-secondary-200 rounded', className)}>
            <div className='absolute text-secondary-main text-sm bg-white px-2' style={{ top: '-0.7rem', left: '1rem' }}>
                DANGER ZONE
            </div>
            <div className='text-xs text-secondary-300'>
                <p>グループを削除するにはグループ名を入力し、削除ボタンを押下してください</p>
                <p>削除したグループは元には戻せません</p>
            </div>
            <div className='flex justify-end p-2'>
                <TextInputBase value={input} onChange={(e) => {
                    setInput(e.target.value)
                }} className='block px-2 border border-primary-50 rounded mr-1 placeholder-primary-100' placeholder='グループ名を入力' />
                <OutlinedButton className='text-sm whitespace-no-wrap' disabled={!enableDelete} colorType='secondary' onClick={handleDelete}>
                    グループを削除
                </OutlinedButton>
            </div>
        </div>
    )
}

export default DangerZone