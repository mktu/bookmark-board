import React, { useContext } from 'react'
import classNames from 'classnames'
import Trash from '@components/Common/Icon/Trash'
import ColorSwatch from '@components/Common/Icon/ColorSwatch'
import Check from '@components/Common/Icon/Check'
import { TextButton, ContainedButton } from '@components/Common/Button'
import { PopoverDivContainer } from '@components/Common/Popover'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import Selector from './ColorOption/Selector'

const BulkDelete: React.VFC<Parameters<typeof TextButton>[0]> = ({ className, ...props }) => (
    <TextButton aria-label='Color Filter' className={classNames('flex items-center', className)} {...props}>
        <Trash className='w-6 mr-1 stroke-primary-main' strokeWidth={1.5} />
        <div className='text-sm'>一括削除</div>
    </TextButton>
)

const BulkColor: React.VFC<Parameters<typeof TextButton>[0]> = ({ className, ...props }) => (
    <TextButton aria-label='Color Filter' className={classNames('flex items-center', className)} {...props}>
        <ColorSwatch className='w-6 mr-1 stroke-primary-main' strokeWidth={1.5} />
        <div className='text-sm'>一括色設定</div>
    </TextButton>
)

const Confirm: React.VFC<{ onSubmit: () => void, onCancel: () => void, text: string }> = ({ onCancel, onSubmit, text }) => (
    <div className='p-4 bg-white border border-primary-border md:text-sm'>
        <div className='text-primary-dark '>選択アイテムを削除します</div>
        <div className='flex items-center my-2'>
            <ContainedButton onClick={onSubmit} className='mx-1'>{text}</ContainedButton>
            <TextButton onClick={onCancel}>キャンセル</TextButton>
        </div>
    </div>
)

type Toggle = () => void

const BulkDeletePopoverContainer: React.VFC<{ className?: string, onSubmit: (toggle: Toggle) => void }> = ({ onSubmit, className }) => (
    <PopoverDivContainer className={className} render={(toggle) => (
        <Confirm text='削除する' onCancel={() => {
            toggle()
        }} onSubmit={() => { onSubmit(toggle) }} />
    )}>
        <BulkDelete />
    </PopoverDivContainer>
)

const CulkColorOptionContainer: React.VFC<{ className?: string, groupId: string, handleSelectColor: (color: string, toggle: Toggle) => void }> =
    ({ className, groupId, handleSelectColor }) => (
        <PopoverDivContainer className={className} render={(toggle) => (
            <Selector groupId={groupId} handleSelectColor={(color) => { handleSelectColor(color, toggle) }} />
        )}>
            <BulkColor />
        </PopoverDivContainer>
    )

const useBulkMenu = () => {
    const { deleteBookmarks, updateColors } = useContext(BookmarkBulkContext)
    const onDelete = (toggle: () => void) => {
        deleteBookmarks().finally(toggle)
    }
    const onUpdateColors = (color : string, toggle: () => void) => {
        updateColors(color).finally(toggle)
    }
    return {
        onDelete,
        onUpdateColors
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
    const { onDelete, onUpdateColors } = useBulkMenu()

    return (
        <div className={classNames('p-2 bg-white flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} />
            <CulkColorOptionContainer className='mx-4' groupId={groupId} handleSelectColor={onUpdateColors}/>
        </div>
    )
}

export const BulkMenuMobile: React.VFC<{ className?: string, groupId: string }> = ({ className, groupId }) => {
    const { onDelete, onUpdateColors } = useBulkMenu()

    return (
        <div className={classNames('p-2 w-full flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} />
            <CulkColorOptionContainer className='mx-4' groupId={groupId} handleSelectColor={onUpdateColors}/>
        </div>
    )
}

export const BulkMenuWeb: React.VFC<{ className?: string, groupId: string }> = ({ className, groupId }) => {
    const { onDelete, onUpdateColors } = useBulkMenu()

    return (
        <div className={classNames('w-full flex items-center', className)}>
            <BulkDeletePopoverContainer onSubmit={onDelete} />
            <CulkColorOptionContainer className='mx-4' groupId={groupId} handleSelectColor={onUpdateColors}/>
        </div>
    )
}


export default BulkMenuFixedHeader