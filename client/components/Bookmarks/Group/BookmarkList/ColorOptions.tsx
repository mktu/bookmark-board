import React, { useContext } from 'react'
import { Modal } from 'react-responsive-modal';
import { useGroupById } from '../../../../modules/groupSlice'
import { SvgIconButton, SvgFillIconButton } from '../../../Common/Button'
import { TextInput } from '../../../Common/Input'
import { Check, CheckFill } from '../../../Common/Icon'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'

type Props = {
    groupId: string
}

const ColorOptions: React.FC<Props> = ({
    groupId
}) => {
    const { group, updateColorName } = useBookmarkGroup(groupId)
    const { colors } = group
    return (
        <div className='bg-white p-4 rounded flex flex-col justify-start align-middle overflow-scroll'>
            <p className='text-sm text-primary-main'>オリジナルの色名を設定することができます</p>
            <div className=''>
                {colors && colors.map(c => {
                    return (
                        <div key={c.color} className='flex items-center'>
                            <div className='flex items-center w-full mr-2'>
                                <TextInput className='w-full' value={c.name} handleSubmit={(value)=>{
                                    updateColorName(c.color,value)
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