import React, { useState } from 'react'
import TextInput from '../../../../Common/Input/TextInput'
import { ContainedButton } from '../../../../Common/Button'

type Props = {
    handleAddColor: (name: string, color: string) => void,
    reachedLimit: boolean
}

const ColorInput: React.FC<Props> = ({
    handleAddColor,
    reachedLimit
}) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    return (
        <div>
            <div className='flex items-center'>
                <TextInput aria-label='New Color' placeholder='グループ名を入力' value={name} className='w-full flex-1' onChange={(e) => { setName(e.target.value) }} />
                {color ? (
                    <label htmlFor='NewColor' className='ml-auto h-5 w-5 rounded' style={{ backgroundColor: color }}>
                    </label>
                ) : (
                    <label htmlFor='NewColor' className='ml-2 rounded border border-primary-border p-2 text-xs text-primary-main' >
                        色を選択
                    </label>
                )}

                <input id='NewColor' type='color' className='w-0 opacity-0' value={color} onChange={(e) => {
                    setColor(e.target.value)
                }} />
                <ContainedButton onClick={() => {
                    handleAddColor(name, color)
                    setName('')
                    setColor('')
                }} disabled={!name || !color || reachedLimit} className='ml-4 text-xs'>追加</ContainedButton>
            </div>
            {reachedLimit && (
                <div className='p-2 text-xs text-secondary-main'>登録できる色数が上限に達しています</div>
            )}
        </div>
    )
}

export default ColorInput