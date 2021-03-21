import React from 'react'
import Sort from '@components/Common/Icon/Sort'
import Template from '@components/Common/Icon/Template'
import ColorSwatch from '@components/Common/Icon/ColorSwatch'
import { PopoverDivContainer } from '../../../Common/Popover'
import { toast } from 'react-toastify';
import { TextButton } from '../../../Common/Button'
import ListOptions from './ListOptions'
import SortOptions from './SortOptions'
import LikeOption from './LikeOption'
import VisibilityOption from './ColorOption/VisibilityOption'

type Props = {
    groupId: string
}

const Refinements: React.FC<Props> = ({
    groupId
}) => {
    const sortSucceeded = (hidePopover: () => void) => () => {
        toast.success('並び替えが完了しました！')
        hidePopover()
    }
    return (
        <div className='p-1'>
            <div className='p-2 md:p-4 w-full bg-white flex flex-row shadow'>
                <div className='ml-auto md:flex items-center'>
                    <div className='flex items-center mb-2 md:mb-0'>
                        <LikeOption className='ml-auto md:ml-0' groupId={groupId} />
                    </div>
                    <div className='flex items-center '>
                        <PopoverDivContainer placement='left-start' content={<VisibilityOption groupId={groupId} />}>
                            <TextButton className='flex items-center stroke-primary-main hover:stroke-primary-dark ml-4' >
                                <ColorSwatch className='w-6' />
                                <div className='text-sm'>色フィルタ</div>
                            </TextButton>
                        </PopoverDivContainer>
                        <PopoverDivContainer placement='left-start' render={(toggle) => <SortOptions groupId={groupId} onSortSucceeded={sortSucceeded(toggle)} />}>
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
            </div>
        </div>
    )
}

export default Refinements