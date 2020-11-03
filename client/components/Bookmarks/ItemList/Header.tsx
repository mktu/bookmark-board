import React, { useState } from 'react'
import { SvgIconButton } from '../../Common/Button'
import { FolderOpen, Edit, DotsVertical } from '../../Common/Icon'
import Tooltip from '../../Common/Tooltip'

type Props = {
    group: BookmarkGroup
}

const Header: React.FC<Props> = ({
    group
}) => {
    const [showRename, setShowRename] = useState(false)
    return (
        <div className='flex flex-row items-center pl-4 pr-4 pt-2 pb-2 border-b border-primary-border'
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
                {group.name}
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
                <SvgIconButton>
                    <DotsVertical strokeWidth={2} className='w-6' />
                </SvgIconButton>
            </div>

        </div >
    )
}

export default Header