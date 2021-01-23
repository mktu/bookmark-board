import React, { useState } from 'react'
import { Sort, Template, ColorSwatch } from '../../../Common/Icon'
import { PopoverDivContainer } from '../../../Common/Popover'
import { TextButton } from '../../../Common/Button'
import ListOptions from './ListOptions'
import SortOptions from './SortOptions'
import { ColorOptionDialog, ColorOptions } from './ColorOption'

type Props = {
    groupId: string
}

const Refinements: React.FC<Props> = ({
    groupId
}) => {
    const [showColor, setShowColor] = useState(false)
    const onCloseColorOption = () => { setShowColor(false) }
    return (
        <div className='p-1'>
            <div className='p-4 w-full bg-white flex flex-row shadow'>
                <div></div>
                <div className='ml-auto flex items-center'>
                    <div>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark' onClick={() => { setShowColor(true) }}>
                            <ColorSwatch className='w-6' />
                            <div className=' text-sm'>色設定</div>
                        </TextButton>
                    </div>
                    <PopoverDivContainer placement='left-start' content={<SortOptions groupId={groupId} />}>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4'>
                            <Sort className='w-6' />
                            <div className=' text-sm'>並び替え</div>
                        </TextButton>
                    </PopoverDivContainer>
                    <PopoverDivContainer placement='left-start' content={<ListOptions groupId={groupId} />}>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4'>
                            <Template className='w-6' />
                            <div className=' text-sm'>表示</div>
                        </TextButton>
                    </PopoverDivContainer>
                </div>
            </div>
            <ColorOptionDialog open={showColor} onClose={onCloseColorOption}>
                <ColorOptions groupId={groupId} onClose={onCloseColorOption}/>
            </ColorOptionDialog>
        </div>
    )
}

export default Refinements