import React from 'react'
import Folder from '@components/Common/Icon/Folder'
import { TextButton } from '@components/Common/Button'

type Props = {
    onClickNewGroup: () => void
}

const Refinements: React.VFC<Props> = ({
    onClickNewGroup
}) => {
    return (
        <div className='flex items-center py-2 px-4 text-sm shadow'>
            <TextButton className='flex items-center py-2' aria-label='New Group' fontType='none' onClick={onClickNewGroup}>
                <Folder strokeWidth={1.5} className='mr-2 w-5 h-5' />
                <div>新しいグループ</div>
            </TextButton>
            {/* <PopoverDivContainer placement='left-start' className='flex items-center ml-auto' content={<SortOption />}>
                <SvgIconButton className='flex items-center p-2 ml-auto' aria-label='Sort Group'>
                    <Filter strokeWidth={1.5} className='w-5 h-5 stroke-primary-main' />
                </SvgIconButton>
            </PopoverDivContainer> */}
        </div>
    )
}

export default Refinements