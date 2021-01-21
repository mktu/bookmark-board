import React from 'react'
import { Modal } from 'react-responsive-modal';
import { TextInput, Checkbox } from '../../../Common/Input'
import { SvgFillIconButton, ContainedButton, SvgIconButton } from '../../../Common/Button'
import { EyeOffFill, EyeFill, XCircle} from '../../../Common/Icon'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import ColorInput from './ColorInput'

type Props = {
    groupId: string,
    onClose: () => void
}

const ColorOptions: React.FC<Props> = ({
    groupId,
    onClose
}) => {
    const { colors, updateColor, filterColor, filterColors, hasChange, handleAddColor, handleDeleteColor, handleSubmit } = useBookmarkGroup(groupId)
    
    return (
        <div className='bg-white p-4 rounded flex flex-col justify-start align-middle overflow-scroll'>
            <p className='text-sm text-primary-main'>色名や表示有無の設定をすることができます</p>
            <div className='flex justify-end'><Checkbox label='すべて表示' checked={Object.values(colors).every(v => v.show)} onChange={(e) => {
                if (e.target.checked) {
                    filterColors(true)
                } else {
                    filterColors(false)
                }
            }} /></div>
            <div className=''>
                {colors.map(c => {
                    return (
                        <div key={c.name} className='flex items-center'>
                            {c.show ? (
                                <SvgFillIconButton aria-label='Enable' onClick={() => {
                                    filterColor(c.color, false)
                                }}>
                                    <EyeFill className='w-5 fill-primary-main' strokeWidth={1.5} />
                                </SvgFillIconButton>
                            ) : (
                                    <SvgFillIconButton aria-label='Disable' onClick={() => {
                                        filterColor(c.color, true)
                                    }}>
                                        <EyeOffFill className='w-5 fill-primary-300' strokeWidth={1.5} />
                                    </SvgFillIconButton>
                                )}
                            <div className='flex items-center w-full'>
                                <TextInput aria-label='Color Name' className='w-full' value={c.name} handleSubmit={(value) => {
                                    updateColor(c.color, { name: value })
                                }} />
                            </div>
                            <div className='mx-2 w-5 h-5 rounded ' style={{ backgroundColor: c.color }} />
                            <SvgIconButton onClick={()=>{
                                handleDeleteColor(c.color)
                            }}>
                                <XCircle className='w-6'/>
                            </SvgIconButton>
                        </div>
                    )
                })}
            </div>
            <div className='flex items-center max-w-full overflow-hidden mt-6'>
                <h3 className='text-primary-main text-sm font-semibold  block'>色を新規追加</h3>
                <div className='ml-2 border-b border-primary-border w-full flex-1'/>
            </div>
            <ColorInput handleAddColor={handleAddColor}/>
            <ContainedButton disabled={!hasChange} onClick={()=>{handleSubmit(()=>{
                onClose()
            })}} className='mt-8'>変更を保存</ContainedButton>
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
            modal: 'w-1/2',
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