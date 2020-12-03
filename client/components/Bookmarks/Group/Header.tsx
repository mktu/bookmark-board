import React, { useState } from 'react'
import { SvgIconButton } from '../../Common/Button'
import { FolderOpen, DotsVertical } from '../../Common/Icon'
import { Popover } from '../../Common/Popover'
import { TooltipDivContainer } from '../../Common/Tooltip'
import Avatar from '../../Common/Avatar'
import GroupMenu from './GroupMenu'
import { useGroupById } from '../../../modules/groupSlice'
import { useEditorsByIds } from '../../../modules/editorsSlice'
import { ShareDialog, Share } from './Share'
import { DetailDialog, Detail } from './Detail'

type Props = {
    groupId: string
}

const Header: React.FC<Props> = ({
    groupId
}) => {
    const group = useGroupById(groupId)
    const editors = useEditorsByIds(group ? group.users : []).slice(0, 5)
    const [showDetail, setShowDetail] = useState(false)
    const [showShare, setShowShare] = useState(false)
    if (!group) {
        return <div />
    }
    return (
        <div className='h-full w-full flex flex-row items-center px-2 py-2 border-b border-primary-border' >
            <div className='flex items-center cursor-pointer max-w-full overflow-hidden' onClick={() => {
                setShowDetail(true)
            }}>
                <div>
                    <FolderOpen strokeWidth={1.0} className='w-8' />
                </div>
                <div className='text-primary-main ml-2 mr-4 overflow-hidden truncate max-w-full'>
                    <div className='font-semibold' >
                        {group.name}
                    </div>
                    <div className='text-sm overflow-hidden truncate max-w-full'>
                        {group.description}
                    </div>
                </div>

            </div>

            <div className='ml-auto flex items-center'>
                {editors.map(e => (
                    <TooltipDivContainer key={e.id} content={e.name} placement='bottom' className='px-1'>
                        <SvgIconButton>
                            <Avatar src={e.image} width='32px' height='32px' />
                        </SvgIconButton>
                    </TooltipDivContainer>
                ))}
                <Popover content={<GroupMenu handleShowShareSetting={() => {
                    setShowShare(true)
                }} />} placement='left'>
                    <div>
                        <SvgIconButton>
                            <DotsVertical strokeWidth={2} className='w-6' />
                        </SvgIconButton>
                    </div>
                </Popover>
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