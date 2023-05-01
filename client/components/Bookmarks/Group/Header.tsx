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
import Emoji from '@components/Common/Emoji'

type Props = {
    groupId: string,
}

const Header: React.FC<Props> = ({
    groupId,
}) => {
    const router = useRouter()
    const { group, editors, handleSubmit } = useBookmarkGroup(groupId)

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
        <div className='flex h-full w-full flex-col gap-2 border-b border-primary-border bg-white p-1'>
            <SvgIconButton className='flex items-center gap-1 text-sm text-primary-main underline md:hidden' onClick={handleBack}>
                <ArrowLeft strokeWidth={1.0} className='w-4' />
                グループ一覧に戻る
            </SvgIconButton>
            <div className='flex w-full items-center' >
                <div className='flex max-w-full items-center overflow-hidden p-1' >
                    <div className='flex items-center'>
                        <div>
                            <Emoji selected={group.emojiIcon} onSelectEmoji={(emoji) => {
                                handleSubmit({ emojiIcon: emoji })
                            }} />
                        </div>
                    </div>
                    <ButtonBase className='mr-4 ml-2 block flex-1 overflow-hidden truncate text-left text-primary-main' onClick={jumpTo('setting')}>
                        <div className='max-w-full overflow-hidden truncate font-semibold underline' >
                            {group.name}
                        </div>
                        <div className='hidden max-w-full overflow-hidden truncate text-sm md:block'>
                            {group.description}
                        </div>
                    </ButtonBase>
                </div>
                <div className='ml-auto flex items-center justify-end'>
                    {requests.length > 0 && (
                        <PopoverDivContainer className='px-2' placement='bottom' content={<RequestUsers requests={requests} />}>
                            <div>
                                <SvgFillIconButton aria-label='Show Requesting User' colorType='secondary' className='relative'>
                                    <UserAddFill className='w-8' />
                                    <span className='absolute rounded-full bg-secondary-300 p-1 text-xs text-white' style={{ left: '-10px', top: '-10px' }}>{requests.length}</span>
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
        </div>
    )
}

export default Header