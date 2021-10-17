import React, { useContext } from 'react'
import classNames from 'classnames'
import Trash from '@components/Common/Icon/Trash'
import ColorSwatch from '@components/Common/Icon/ColorSwatch'
import Reply from '@components/Common/Icon/Reply'
import Check from '@components/Common/Icon/Check'
import { TextButton, ContainedButton } from '@components/Common/Button'
import { PopoverDivContainer } from '@components/Common/Popover'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import Selector from './ColorOption/Selector'
import BulkMoveMenu from './BulkMoveMenu'

const BulkDelete: React.VFC<Parameters<typeof TextButton>[0]> = ({ className, ...props }) => (
    <TextButton aria-label='Color Filter' className={classNames('flex items-center', className)} {...props}>
        <Trash className='mr-1 w-6 stroke-primary-main' strokeWidth={1.5} />
        <div className='text-sm'>削除</div>
    </TextButton>
)

const BulkColor: React.VFC<Parameters<typeof TextButton>[0]> = ({ className, ...props }) => (
    <TextButton aria-label='Color Filter' className={classNames('flex items-center', className)} {...props}>
        <ColorSwatch className='mr-1 w-6 stroke-primary-main' strokeWidth={1.5} />
        <div className='text-sm'>色設定</div>
    </TextButton>
)

const BulkMove: React.VFC<Parameters<typeof TextButton>[0]> = ({ className, ...props }) => (
    <TextButton aria-label='Move' className={classNames('flex items-center', className)} {...props}>
        <Reply className='mr-1 w-6 stroke-primary-main' strokeWidth={1.5} />
        <div className='text-sm'>移動</div>
    </TextButton>
)

const Confirm: React.VFC<{ onSubmit: () => void, onCancel: () => void, text: string }> = ({ onCancel, onSubmit, text }) => (
    <div className='p-4 md:text-sm bg-white border border-primary-border'>
        <div className=' text-primary-dark'>選択アイテムを削除します</div>
        <div className='flex items-center my-2'>
            <ContainedButton onClick={onSubmit} className='mx-1'>{text}</ContainedButton>
            <TextButton onClick={onCancel}>キャンセル</TextButton>
        </div>
    </div>
)

type Toggle = () => void

const BulkDeletePopoverContainer: React.VFC<{ className?: string, onSubmit: (toggle: Toggle) => void, disabled?:boolean }> = ({ onSubmit, className, disabled }) => (
    <PopoverDivContainer className={className} render={(toggle) => (
        <Confirm text='削除する' onCancel={() => {
            toggle()
        }} onSubmit={() => { onSubmit(toggle) }} />
    )}>
        <BulkDelete disabled={disabled}/>
    </PopoverDivContainer>
)

const BulkColorOptionContainer: React.VFC<{ className?: string, groupId: string, handleSelectColor: (color: string, toggle: Toggle) => void, disabled?:boolean }> =
    ({ className, groupId, handleSelectColor, disabled }) => (
        <PopoverDivContainer className={className} render={(toggle) => (
            <Selector groupId={groupId} handleSelectColor={(color) => { handleSelectColor(color, toggle) }} />
        )}>
            <BulkColor disabled={disabled}/>
        </PopoverDivContainer>
    )

const BulkMoveOptionContainer: React.VFC<{ className?: string, groupId: string, handleMove: (destGroupId : string) => void, disabled?:boolean }> =
    ({ className, groupId, handleMove, disabled }) => (
        <PopoverDivContainer className={className} render={(toggle) => (
            <BulkMoveMenu groupId={groupId} handleClose={toggle} handleMove={handleMove}/>
        )}>
            <BulkMove disabled={disabled}/>
        </PopoverDivContainer>
    )

const useBulkMenu = () => {
    const { deleteBookmarks, updateColors, checkState, disabled, moveGroup } = useContext(BookmarkBulkContext)
    const onDelete = (toggle: () => void) => {
        deleteBookmarks().finally(toggle)
    }
    const onUpdateColors = (color : string, toggle: () => void) => {
        updateColors(color).finally(toggle)
    }
    return {
        onDelete,
        onUpdateColors,
        moveGroup,
        disabled : disabled || checkState === 'none'
    }
}

export const BulkCheckBox: React.VFC<{ className?: string }> = ({ className }) => {
    const { checkState, checkAll, disabled } = useContext(BookmarkBulkContext)
    return (
        <TextButton disabled={disabled} className={classNames('flex items-center', className)} onClick={() => {
            checkAll(checkState !== 'filled')
        }}>
            <Check className={classNames('w-6 rounded  mr-2', checkState !== 'filled' ?
                'stroke-primary-main hover:stroke-primary-dark border border-primary-300'
                : 'stroke-primary-light bg-primary-500 hover:bg-primary-main')} strokeWidth={checkState === 'filled' ? 2 : 1} />
            <div className='text-sm'>{checkState === 'filled' ? '選択解除' : '全て選択'}</div>
        </TextButton>
    )
}

export const BulkMenuFixedHeader: React.VFC<{ className?: string, groupId: string }> = ({ className, groupId }) => {
    const { onDelete, onUpdateColors, disabled ,moveGroup } = useBulkMenu()

    return (
        <div className={classNames('flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} disabled={disabled}/>
            <BulkColorOptionContainer className='ml-4' groupId={groupId} handleSelectColor={onUpdateColors} disabled={disabled}/>
            <BulkMoveOptionContainer className='mx-4' groupId={groupId} handleMove={moveGroup} disabled={disabled}/>
        </div>
    )
}

export const BulkMenuMobile: React.VFC<{ className?: string, groupId: string }> = ({ className, groupId }) => {
    const { onDelete, onUpdateColors, disabled ,moveGroup } = useBulkMenu()

    return (
        <div className={classNames('py-1 w-full flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} disabled={disabled}/>
            <BulkColorOptionContainer className='ml-4' groupId={groupId} handleSelectColor={onUpdateColors} disabled={disabled}/>
            <BulkMoveOptionContainer className='mx-4' groupId={groupId} handleMove={moveGroup} disabled={disabled}/>
        </div>
    )
}

export const BulkMenuWeb: React.VFC<{ className?: string, groupId: string }> = ({ className, groupId }) => {
    const { onDelete, onUpdateColors, disabled, moveGroup } = useBulkMenu()

    return (
        <div className={classNames('w-full flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} disabled={disabled}/>
            <BulkColorOptionContainer className='ml-4' groupId={groupId} handleSelectColor={onUpdateColors} disabled={disabled}/>
            <BulkMoveOptionContainer className='mx-4' groupId={groupId} handleMove={moveGroup} disabled={disabled}/>
        </div>
    )
}


export default BulkMenuFixedHeader