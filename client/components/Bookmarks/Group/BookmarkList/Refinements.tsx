import React, { useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import Sort from '@components/Common/Icon/Sort'
import Template from '@components/Common/Icon/Template'
import ColorSwatch from '@components/Common/Icon/ColorSwatch'
import { PopoverDivContainer } from '@components/Common/Popover'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { toast } from 'react-toastify';
import { SvgIconButton } from '@components/Common/Button'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import ListOptions from './ListOptions'
import SortOptions from './SortOptions'
import LikeOption from './LikeOption'
import BulkMenu, { BulkMenuMobile, BulkMenuWeb, BulkCheckBox } from './BulkMenu'
import VisibilityOption from './ColorOption/VisibilityOption'

type Props = {
    groupId: string
}

const Refinements: React.FC<Props> = ({
    groupId
}) => {
    const { checkState, disabled } = useContext(BookmarkBulkContext)
    const hasSelection = checkState !== 'none' && !disabled
    const sortSucceeded = (hidePopover: () => void) => () => {
        toast.success('並び替えが完了しました！')
        hidePopover()
    }
    const { ref, inView } = useInView()
    return (
        <div className='p-1' ref={ref}>
            <div className='p-2 bg-white shadow'>
                <div className='flex w-full items-center'>
                    <div>
                        <BulkCheckBox />
                    </div>
                    <div className='ml-auto md:flex items-center'>
                        <div className={`${hasSelection ? 'border-r opacity-100' : 'w-0 overflow-hidden h-0 opacity-0'} hidden md:block mr-2 pr-2 transition-all ease-in-out duration-500`}>
                            <BulkMenuWeb groupId={groupId}/>
                        </div>
                        <div className='flex items-center '>
                            <LikeOption className='ml-auto md:ml-0 ' groupId={groupId} />
                            <PopoverDivContainer placement='left-start' content={<VisibilityOption groupId={groupId} />}>
                                <SvgIconButton aria-label='Color Filter' className='flex items-center ml-4' >
                                    <TooltipDivContainer content='色フィルタ' placement='bottom'>
                                        <ColorSwatch className='w-6' strokeWidth={1.5} />
                                    </TooltipDivContainer>
                                </SvgIconButton>
                            </PopoverDivContainer>
                            <PopoverDivContainer placement='left-start' render={(toggle) => <SortOptions groupId={groupId} onSortSucceeded={sortSucceeded(toggle)} />}>
                                <SvgIconButton aria-label='Sort' className='flex items-center ml-4'>
                                    <TooltipDivContainer content='並び替え' placement='bottom'>
                                        <Sort className='w-6' strokeWidth={1.5} />
                                    </TooltipDivContainer>
                                </SvgIconButton>
                            </PopoverDivContainer>
                            <PopoverDivContainer placement='left-start' content={<ListOptions groupId={groupId} />}>
                                <SvgIconButton aria-label='View Option' className='flex items-center ml-4'>
                                    <TooltipDivContainer content='表示' placement='bottom'>
                                        <Template className='w-6' strokeWidth={1.5} />
                                    </TooltipDivContainer>
                                </SvgIconButton>
                            </PopoverDivContainer>
                        </div>
                    </div>
                </div>
                <div className={`md:hidden`}>
                    <BulkMenuMobile className='mt-2 mr-4 border-t border-primary-border' groupId={groupId}/>
                </div>
            </div>
            <div className={`${hasSelection && !inView ? 'border border-primary-border rounded w-full' : 'w-0 h-0 opacity-0 overflow-hidden'} fixed top-0 left-0 z-20 `}>
                <BulkMenu groupId={groupId}/>
            </div>
        </div>
    )
}

export default Refinements