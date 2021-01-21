import React, { useState } from 'react'
import TextInput from '../../../Common/Input/TextInput'
import { ContainedButton } from '../../../Common/Button'

type Props = {
    handleAddColor : (name:string,color:string)=>void
}

const ColorInput: React.FC<Props> = ({
    handleAddColor
}) => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    return (
        <div>
            <div className='flex items-center'>
                <TextInput placeholder='グループ名を入力'  value={name} className='w-full flex-1' handleSubmit={setName} />
                {color ? (
                    <label htmlFor='NewColor' className='ml-auto w-5 h-5 rounded' style={{ backgroundColor: color }}>
                    </label>
                ) : (
                        <label htmlFor='NewColor' className='ml-2 text-xs text-primary-main border border-primary-border rounded p-2' >
                            色を入力
                        </label>
                    )}

                <input id='NewColor' type='color' className='invisible w-0' value={color} onChange={(e) => {
                    setColor(e.target.value)
                }} />
                <ContainedButton onClick={()=>{
                    handleAddColor(name,color)
                    setName('')
                    setColor('')
                }} disabled={!name || !color} className='ml-4'>追加</ContainedButton>
            </div>
            
        </div>
    )
}

export default ColorInput