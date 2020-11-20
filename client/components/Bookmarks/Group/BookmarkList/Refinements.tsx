import React from 'react'
import { Sort, Template } from '../../../Common/Icon'
import { Popover } from '../../../Common/Popover'
import { SvgIconButton, TextButton } from '../../../Common/Button'
import ListOptions from './ListOptions'

type Props = {
    groupId : string
}

const Refinements: React.FC<Props> = ({
    groupId
}) => {
    return (
        <div className='p-1'>
            <div className='p-4 w-full bg-white flex flex-row shadow'>
                <div></div>
                <div className='ml-auto flex items-center'>
                    <div>
                        <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark'>
                            <Sort className='w-8' />
                            <div className=' text-sm'>並び替え</div>
                        </TextButton>
                    </div>
                    <div>
                        <Popover placement='left-start' content={<ListOptions groupId={groupId}/>}>
                            <div>
                                <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4'>
                                    <Template className='w-8' />
                                    <div className=' text-sm'>表示</div>
                                </TextButton>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Refinements