import React from 'react'
import { useRouter } from 'next/router'
import { SvgIconButton, SvgFillIconButton, ButtonBase } from '../../Common/Button'
import { Share as ShareIcon, UserAddFill, ArrowLeft } from '../../Common/Icon'
import { TooltipDivContainer } from '../../Common/Tooltip'
import { PopoverDivContainer } from '../../Common/Popover'
import { UserPopover } from '../../PopoverMenu'
import Avatar from '../../Common/Avatar/NextImage'
import Initial from '../../Common/Avatar/Initial'
import { useRequestsByGroup } from '../../../modules/requestSlice'

import RequestUsers from './RequestUsers'
import { useBookmarkGroup } from '../../../hooks/useBookmarkGroup'

type Props = {
    groupId: string,
}

const Header: React.FC<Props> = ({
    groupId,
}) => {
    const router = useRouter()
    const { group, editors } = useBookmarkGroup(groupId)

    const requests = useRequestsByGroup(group?.id)
    if (!group) {
        return <div />
    }
    const handleBack = () => {
        localStorage.removeItem('groupId')
        router.push(`/bookmarks`, `/bookmarks`, { shallow: true })
    }
    const jumpTo = (place: string) => () => {
        router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}/${place}`)
    }

    return (
        <div className='flex items-center py-2 px-2 w-full h-full border-b border-primary-border' >
            <div className='flex overflow-hidden items-center max-w-full' >
                <div className='flex items-center'>
                    <SvgIconButton className='md:hidden' onClick={handleBack}>
                        <ArrowLeft strokeWidth={1.0} className='w-6' />
                    </SvgIconButton>
                </div>
                <ButtonBase className='block overflow-hidden flex-1 mr-4 ml-2 text-left text-primary-main truncate' onClick={jumpTo('setting')}>
                    <div className='overflow-hidden max-w-full font-semibold truncate' >
                        {group.name}
                    </div>
                    <div className='hidden md:block overflow-hidden max-w-full text-sm truncate'>
                        {group.description}
                    </div>
                </ButtonBase>
            </div>

            <div className='flex justify-end items-center ml-auto'>
                {requests.length > 0 && (
                    <PopoverDivContainer className='px-2' placement='bottom' content={<RequestUsers requests={requests} />}>
                        <div>
                            <SvgFillIconButton aria-label='Show Requesting User' colorType='secondary' className='relative'>
                                <UserAddFill className='w-8' />
                                <span className='absolute p-1 text-xs text-white bg-secondary-300 rounded-full' style={{ left: '-10px', top: '-10px' }}>{requests.length}</span>
                            </SvgFillIconButton>
                        </div>
                    </PopoverDivContainer>
                )}
                {editors.map(e => (
                    <PopoverDivContainer key={e.id} content={<UserPopover user={e} />} placement='bottom' className='flex items-center px-1'>
                        <SvgIconButton aria-label='Show User'>
                            <Avatar
                                src={e.image}
                                width={32}
                                height={32}
                                name={e.name}
                                fallback={<Initial
                                    width={32}
                                    height={32}
                                    name={e.name}
                                />}
                            />
                        </SvgIconButton>
                    </PopoverDivContainer>
                ))}
                <TooltipDivContainer className='px-2' content='共有' placement='bottom'>
                    <SvgIconButton aria-label='Share Option' onClick={jumpTo('share')}>
                        <ShareIcon strokeWidth={2} className='w-6' />
                    </SvgIconButton>
                </TooltipDivContainer>
            </div>


        </div >
    )
}

export default Header