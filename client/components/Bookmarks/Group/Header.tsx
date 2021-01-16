import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { SvgIconButton, SvgFillIconButton, ButtonBase } from '../../Common/Button'
import { FolderOpen, Share as ShareIcon, UserAddFill, ArrowLeft } from '../../Common/Icon'
import { TooltipDivContainer } from '../../Common/Tooltip'
import { PopoverDivContainer } from '../../Common/Popover'
import { UserPopover } from '../../PopoverMenu'
import Avatar from '../../Common/Avatar'
import { useRequestsByGroup } from '../../../modules/requestSlice'
import { ShareDialog, Share } from './Share'
import { DetailDialog, Detail } from './Detail'
import RequestUsers from './RequestUsers'
import { useBookmarkGroup } from '../../../hooks/useBookmarkGroup'

type Props = {
    groupId: string
}

const Header: React.FC<Props> = ({
    groupId
}) => {
    const router = useRouter()
    const { group, editors } = useBookmarkGroup(groupId)
    const [showDetail, setShowDetail] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const requests = useRequestsByGroup(group?.id)
    if (!group) {
        return <div />
    }
    const handleBack = () => {
        localStorage.removeItem('groupId')
        router.push(`/bookmarks`, `/bookmarks`, { shallow: true })
    }
    return (
        <div className='h-full w-full px-2 py-2 border-b border-primary-border md:flex md:items-center' >
            <div className='flex items-center max-w-full overflow-hidden' >
                <div className='flex items-center'>
                    <FolderOpen strokeWidth={1.0} className='hidden md:inline-block md:w-8' />
                    <SvgIconButton className='md:hidden' onClick={handleBack}>
                        <ArrowLeft strokeWidth={1.0} className='w-6' />
                    </SvgIconButton>
                </div>
                <ButtonBase className='text-primary-main ml-2 mr-4 overflow-hidden truncate max-w-full block' onClick={() => {
                    setShowDetail(true)
                }}>
                    <div className='font-semibold flex justify-start' >
                        {group.name}
                    </div>
                    <div className='text-sm overflow-hidden truncate max-w-full'>
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
                                <span className='text-xs text-white bg-secondary-300 rounded-full p-1 absolute' style={{ left: '-10px', top: '-10px' }}>{requests.length}</span>
                            </SvgFillIconButton>
                        </div>
                    </PopoverDivContainer>
                )}
                {editors.map(e => (
                    <PopoverDivContainer key={e.id} content={<UserPopover user={e} />} placement='bottom' className='px-1 flex items-center'>
                        <SvgIconButton aria-label='Show User'>
                            <Avatar src={e.image} width='32px' height='32px' name={e.name} />
                        </SvgIconButton>
                    </PopoverDivContainer>
                ))}
                <TooltipDivContainer className='px-2' content='共有' placement='bottom'>
                    <SvgIconButton aria-label='Share Option' onClick={() => {
                        setShowShare(true)
                    }}>
                        <ShareIcon strokeWidth={2} className='w-6' />
                    </SvgIconButton>
                </TooltipDivContainer>
            </div>

            <ShareDialog open={showShare} onClose={() => {
                setShowShare(false)
            }}>
                <Share sharable={Boolean(group.sharable)} id={groupId} />
            </ShareDialog>
            <DetailDialog open={showDetail} onClose={() => {
                setShowDetail(false)
            }}>
                <Detail group={group} />
            </DetailDialog>
        </div >
    )
}

export default Header