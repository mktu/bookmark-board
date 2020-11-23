import React, { useState } from 'react'
import { SvgIconButton } from '../../Common/Button'
import { FolderOpen, Edit, DotsVertical } from '../../Common/Icon'
import Tooltip from '../../Common/Tooltip'
import { Popover } from '../../Common/Popover'
import GroupMenu from './GroupMenu'
import { useGroupById } from '../../../modules/groupSlice'
import { ShareDialog, Share } from './Share'

type Props = {
    groupId : string
}

const Header: React.FC<Props> = ({
    groupId
}) => {
    const group = useGroupById(groupId)
    const [showRename, setShowRename] = useState(false)
    const [showShare, setShowShare] = useState(false)
    return (
        <div className='h-full w-full flex flex-row items-center pl-4 pr-4 pt-2 pb-2 border-b border-primary-border'
            onMouseLeave={() => {
                setShowRename(false)
            }}>
            <div>
                <SvgIconButton >
                    <FolderOpen strokeWidth={1.0} className='w-8' />
                </SvgIconButton>
            </div>
            <div className='text-primary-main font-semibold ml-2 mr-4'
                onMouseEnter={() => {
                    setShowRename(true)
                }} >
                {group && group.name}
            </div>
            {showRename && (
                <Tooltip content='名前を変更' className='text-sm'>
                    <div>
                        <SvgIconButton >
                            <Edit strokeWidth={1.2} className='w-6' />
                        </SvgIconButton>
                    </div>
                </Tooltip>
            )
            }
            <div className='ml-auto'>
                <Popover content={<GroupMenu handleShowShareSetting={()=>{
                    setShowShare(true)
                }}/>} placement='left'>
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
                <Share sharable={Boolean(group.sharable)} id={groupId}/>
            </ShareDialog>
        </div >
    )
}

export default Header