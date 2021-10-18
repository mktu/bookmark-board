import { VFC } from "react"
import { useGroupSelector } from '@hooks/useBookmarkGroup'
import { ContainedButton, TextButton } from '@components/Common/Button'

type Props = {
    handleClose : () => void,
    handleMove : (destGroupId:string) => void,
    groupId : string
}

const BulkMoveMenu: VFC<Props> = ({
    handleClose,
    handleMove,
    groupId
}) => {
    const { groups, selectedGroup, handleSelect } = useGroupSelector(groupId)
    return (
        <div className='flex flex-col justify-start p-4 align-middle bg-white rounded border border-primary-border shadow-lg'>
            <div className='overflow-y-auto w-48 max-h-64'>
                {groups.filter(v=>v.id!==groupId).map(v => (
                    <label key={v.id} className='flex items-center mb-2 text-sm font-semibold text-primary-main underline cursor-pointer'>
                        <input type='radio' checked={v.id === selectedGroup?.id} onChange={() => {
                            handleSelect(v.id)
                        }} />
                        <span className='ml-2 truncate'>{v.name}</span>
                    </label>
                ))}
            </div>
            <div className='flex justify-end items-center mt-2 text-xs'>
                <TextButton onClick={handleClose}>キャンセル</TextButton>
                <ContainedButton className='ml-2' onClick={()=>{
                    selectedGroup && handleMove(selectedGroup.id)
                }}>移動する</ContainedButton>
            </div>
        </div>
    )
}

export default BulkMoveMenu