import React from 'react'
import Sort from '@components/Common/Icon/Sort'
import Folder from '@components/Common/Icon/Folder'
import { TextButton } from '@components/Common/Button'


type Props = {
    onClickNewGroup : ()=>void
}

const Refinements: React.VFC<Props> = ({
    onClickNewGroup
}) => {
    return (
        <div className='flex items-center py-2 px-4 text-sm shadow'>
            <TextButton className='flex items-center' aria-label='New Group' fontType='none' onClick={onClickNewGroup}>
                <Folder strokeWidth={1.5} className='mr-2 w-5 h-5' />
                <div>新しいグループ</div>
            </TextButton>
            <TextButton className='flex items-center p-2 ml-auto rounded-full' aria-label='Sort Group' fontType='none'>
                <Sort strokeWidth={1.5} className='w-5 h-5 stroke-primary-main' />
                <div className='md:hidden xl:block'>並び替え</div>
            </TextButton>
        </div>
    )
}

export default Refinements