import { VFC } from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import { OutlinedButton, ContainedButton } from '@components/Common/Button'
import { addFriendLink } from '../../services/line'
import AddFriend from './LineAuth/AddFriend'
import { Dropdowns } from '@components/Common/Input'

type Props = {
    onClickLogin: () => void,
    onUnlink: () => void,
    name?: string,
    handleGroupUpdate: (value: string) => void,
    selected?: string,
    groups: BookmarkGroup[]
}

const LineLogin: VFC<Props> = ({
    onClickLogin,
    onUnlink,
    name,
    handleGroupUpdate,
    selected,
    groups
}) => {
    return (
        <div>
            <div className='flex overflow-x-hidden justify-between items-center w-full text-primary-main'>
                <LoginIcon className='mr-2 w-8 h-8' />
                <div className='mr-auto text-primary-400 truncate'>{name}</div>
                <OutlinedButton className='text-sm' border='border-t border-l border-b' rounded='rounded-l' paddings='py-1 px-2' onClick={onClickLogin}>再認証</OutlinedButton>
                <ContainedButton className='text-sm' rounded='rounded-r' paddings='py-1 px-2' colorType='secondary' onClick={onUnlink}>解除</ContainedButton>
            </div>
            <div className='flex items-center my-2 ml-auto'>
                <div className='mr-2 text-primary-400 whitespace-nowrap'>登録先グループ</div>
                <Dropdowns
                    className='ml-auto'
                    allowEmpty
                    placeholder='登録先グループを選択'
                    placement='auto-end'
                    comboStyles={{
                        width: 160
                    }}
                    poperStyles={{
                        maxHeight: 200,
                    }}
                    options={groups.map(v => ({ label: v.name, value: v.id }))}
                    selected={selected}
                    onSelect={handleGroupUpdate} />
            </div>


            <div className='flex overflow-x-hidden flex-col justify-center p-2 my-4 w-full rounded border border-primary-border border-dotted'>
                <div className='flex-1 mr-2 text-sm text-primary-400'>
                    <span role='img' aria-label='right' className='mr-1'>💡</span>
                    <span>Bookmark-Board公式アカウントを友達登録することで、LINE上からもブックマーク登録できるようになります</span>
                </div>
                <div className='ml-auto'>
                    <AddFriend link={addFriendLink} width={92} height={18} />

                </div>
            </div>
        </div>
    )
}

export default LineLogin