import React, { useState } from 'react'
import { SvgIconButton, SvgFillIconButton, ButtonBase } from '../../Common/Button'
import { FolderOpen, Share as ShareIcon, UserAddFill } from '../../Common/Icon'
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
    const { group, editors } = useBookmarkGroup(groupId)
    const [showDetail, setShowDetail] = useState(false)
    const [showShare, setShowShare] = useState(false)
    const requests = useRequestsByGroup(group?.id)
    if (!group) {
        return <div />
    }
    return (
        <div className='h-full w-full flex flex-row items-center px-2 py-2 border-b border-primary-border' >
            <ButtonBase className='flex items-center cursor-pointer max-w-full overflow-hidden' onClick={() => {
                setShowDetail(true)
            }}>
                <div>
                    <FolderOpen strokeWidth={1.0} className='w-8' />
                </div>
                <div className='text-primary-main ml-2 mr-4 overflow-hidden truncate max-w-full'>
                    <div className='font-semibold flex justify-start' >
                        {group.name}
                    </div>
                    <div className='text-sm overflow-hidden truncate max-w-full'>
                        {group.description}
                    </div>
                </div>

            </ButtonBase>

            <div className='ml-auto flex items-center'>
                {requests.length > 0 && (
                    <PopoverDivContainer className='px-2' placement='bottom' content={<RequestUsers requests={requests} />}>
                        <div>
                            <SvgFillIconButton colorType='secondary' className='relative'>
                                <UserAddFill className='w-8' />
                                <span className='text-xs text-white bg-secondary-300 rounded-full p-1 absolute' style={{ left: '-10px', top: '-10px' }}>{requests.length}</span>
                            </SvgFillIconButton>
                        </div>
                    </PopoverDivContainer>
                )}
                {editors.map(e => (
                    <PopoverDivContainer key={e.id} content={<UserPopover user={e} />} placement='bottom' className='px-1 flex items-center'>
                        <SvgIconButton>
                            <Avatar src={e.image} width='32px' height='32px' name={e.name}/>
                        </SvgIconButton>
                    </PopoverDivContainer>
                ))}
                <TooltipDivContainer className='px-2' content='共有' placement='bottom'>
                    <SvgIconButton onClick={() => {
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