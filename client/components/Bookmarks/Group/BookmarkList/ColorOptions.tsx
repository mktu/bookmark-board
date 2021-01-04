import React from 'react'
import { Modal } from 'react-responsive-modal';
import { TextInput, Checkbox } from '../../../Common/Input'
import { SvgFillIconButton } from '../../../Common/Button'
import { EyeOffFill, EyeFill } from '../../../Common/Icon'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'

type Props = {
    groupId: string
}

const ColorOptions: React.FC<Props> = ({
    groupId
}) => {
    const { colors, updateColor, updateColors } = useBookmarkGroup(groupId)
    return (
        <div className='bg-white p-4 rounded flex flex-col justify-start align-middle overflow-scroll'>
            <p className='text-sm text-primary-main'>色名や表示有無の設定をすることができます</p>
            <div className='flex justify-end'><Checkbox label='すべて表示' checked={Object.values(colors).every(v=>v.show)} onChange={(e)=>{
                if(e.target.checked){
                    updateColors(colors.map(v=>({...v,show:true})))
                }else{
                    updateColors(colors.map(v=>({...v,show:false})))
                }
            }}/></div>
            <div className=''>
                {colors.map(c => {
                    return (
                        <div key={c.color} className='flex items-center'>
                            {c.show ? (
                                <SvgFillIconButton aria-label='Enable' onClick={()=>{
                                    updateColor(c.color, {show:false})
                                }}>
                                    <EyeFill className='w-5 fill-primary-main' strokeWidth={1.5}/>
                                </SvgFillIconButton>
                            ) : (
                                <SvgFillIconButton aria-label='Disable' onClick={()=>{
                                    updateColor(c.color, {show:true})
                                }}>
                                    <EyeOffFill className='w-5 fill-primary-300' strokeWidth={1.5}/>
                                </SvgFillIconButton>
                            )}
                            <div className='flex items-center w-full mr-2'>
                                <TextInput aria-label='Color Name' className='w-full' value={c.name} handleSubmit={(value)=>{
                                    updateColor(c.color,{name:value})
                                }}/>
                            </div>
                            <div className='ml-auto w-5 h-5 rounded' style={{ backgroundColor: c.color }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const ColorOptionDialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} focusTrapped={false} onClose={onClose} center classNames={{
            modal: 'w-1/3',
        }}>
            {children}
        </Modal>
    )
}

export {
    ColorOptionDialog,
    ColorOptions
}

export default ColorOptions