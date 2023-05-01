import React from 'react'
import Folder from '@components/Common/Icon/Folder'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { PopoverDivContainer } from '@components/Common/Popover'
import FilterOption from './FilterOption'
import { Search } from '@components/Common/Icon'
import { TooltipDivContainer } from '@components/Common/Tooltip'

type Props = {
    onClickNewGroup: () => void,
    onChangeSearchWord: (text: string) => void,
    searchWord?: string
}

const Refinements: React.FC<Props> = ({
    onClickNewGroup,
    searchWord,
    onChangeSearchWord
}) => {
    return (
        <div className='flex items-center px-4 py-2 text-sm shadow'>
            <TextButton className='flex items-center py-2' aria-label='New Group' fontType='none' onClick={onClickNewGroup}>
                <Folder strokeWidth={1.5} className='mr-2 h-5 w-5' />
                <div>新しいグループ</div>
            </TextButton>
            <PopoverDivContainer placement='bottom-start' className='ml-auto flex items-center' render={(toggle) =>
                <FilterOption searchWord={searchWord} onChangeSearchWord={onChangeSearchWord} onClose={toggle} />}>
                <SvgIconButton className='ml-auto flex items-center p-2' aria-label='Filter Group'>
                    <TooltipDivContainer placement='bottom' content='グループを検索'>
                        <Search strokeWidth={searchWord ? 2.5 : 1.5} className={`h-5 w-5 stroke-primary-main ${searchWord && 'stroke-primary-dark'}`} />
                    </TooltipDivContainer>
                </SvgIconButton>
            </PopoverDivContainer>
        </div>
    )
}

export default Refinements