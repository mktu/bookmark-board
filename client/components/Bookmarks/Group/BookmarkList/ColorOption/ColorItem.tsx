import React from 'react'
import { TextInput } from '../../../../Common/Input'
import { ButtonBase, TextButton, OutlinedButton } from '../../../../Common/Button'
import { hex2rgb } from '../../../../../utils'

type Props = {
    color: string,
    show: boolean,
    name: string,
    filterColor: (filter: { color: string, show: boolean }) => void,
    renameColor: (color: string, name: string) => void,
    changeOrder: (color:string, up:boolean) => void,
    handleDelete: (color:string) => void
}

const ColorItem: React.FC<Props> = ({
    color,
    show,
    name,
    filterColor,
    renameColor,
    changeOrder,
    handleDelete
}) => {
    const [r, g, b] = hex2rgb(color)
    return (
        <>
            <div className='flex items-center'>
                <TextButton onClick={() => {
                    filterColor({ color, show: !show })
                }} className='text-primary-main text-xs whitespace-no-wrap underline'>{show ? '表示' : '非表示'}</TextButton>
                {show ? (
                    <div className='mx-2'>
                        <div className='w-5 h-5 rounded' style={{ backgroundColor: color }} />
                    </div>
                ) : (
                        <div className='mx-2'>
                            <div className='w-5 h-5 rounded' style={{ backgroundColor: `rgba(${r},${g},${b},0.1)`, border: `1px solid ${color}` }}>
                                <svg className='w-full h-full' style={{ stroke: color }}>
                                    <line stroke="5, 5" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                                </svg>
                            </div>
                        </div>
                    )}
                <div className='flex items-center w-full'>
                    <TextInput aria-label='Color Name' className={`w-full ${!show && 'opacity-75'}`} value={name} handleSubmit={(value) => {
                        renameColor(color, value)
                    }} />
                </div>

                <ButtonBase onClick={()=>{
                    changeOrder(color,true)
                }} className='text-sm ml-1 px-1 text-primary-main border-l border-t border-b rounded-l border-primary-300'>
                    ↑
                </ButtonBase>
                <ButtonBase onClick={()=>{
                    changeOrder(color,false)
                }} className='text-sm mr-1 px-1 text-primary-main border rounded-r border-primary-300'>
                    ↓
                </ButtonBase>

                <OutlinedButton onClick={()=>{
                    handleDelete(color)
                }} className='text-xs ml-2 whitespace-no-wrap' paddings='px-1'>×</OutlinedButton>
            </div>
        </>
    )
}

export default ColorItem