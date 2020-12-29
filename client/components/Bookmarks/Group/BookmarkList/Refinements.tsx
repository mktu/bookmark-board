import React, { useState } from 'react'
import { Sort, Template, ColorSwatch } from '../../../Common/Icon'
import { Popover } from '../../../Common/Popover'
import { TextButton } from '../../../Common/Button'
import ListOptions from './ListOptions'
import {ColorOptionDialog, ColorOptions} from './ColorOptions'

type Props = {
    groupId: string
}

const Refinements: React.FC<Props> = ({
    groupId
}) => {
    const [showColor, setShowColor] = useState(false)
    return (
        <div className='p-1'>
            <div className='p-4 w-full bg-white flex flex-row shadow'>
                <div></div>
                <div className='ml-auto flex items-center'>
                    <div>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark' onClick={()=>{setShowColor(true)}}>
                            <ColorSwatch className='w-6' />
                            <div className=' text-sm'>色設定</div>
                        </TextButton>
                    </div>
                    <div>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4'>
                            <Sort className='w-6' />
                            <div className=' text-sm'>並び替え</div>
                        </TextButton>
                    </div>
                    <div>
                        <Popover placement='left-start' content={<ListOptions groupId={groupId} />}>
                            <div>
                                <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4'>
                                    <Template className='w-6' />
                                    <div className=' text-sm'>表示</div>
                                </TextButton>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
            <ColorOptionDialog open={showColor} onClose={()=>{setShowColor(false)}}>
                <ColorOptions groupId={groupId}/>
            </ColorOptionDialog>
        </div>
    )
}

export default Refinements