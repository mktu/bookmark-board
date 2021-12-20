import { VFC, useState, useEffect } from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import { OutlinedButton, ContainedButton, SvgIconButton, TextButton } from '@components/Common/Button'
import { addFriendLink } from '../../services/line'
import AddFriend from './LineAuth/AddFriend'
import { Dropdowns } from '@components/Common/Input'
import { isMessageHidden, setMessageVisibility } from '@utils/localStorages/messages'
import XCircle from '@components/Common/Icon/XCircle'
import Help from '@components/Common/Icon/Help'

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
    const [hideMessage, setVisibility] = useState(false)
    useEffect(() => {
        setVisibility(isMessageHidden('line-add-friend'))
    }, [])
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


            <div className='flex flex-col justify-center my-4 w-full'>
                {!hideMessage && (
                    <div className='relative flex-1 p-2 mr-2 mb-2 w-full text-sm text-primary-400 rounded border border-primary-border border-dotted'>
                        <span role='img' aria-label='right' className='mr-1'>💡</span>
                        <span>Bookmark-Board公式アカウントを友達登録することで、LINE上からもブックマーク登録できるようになります</span>
                        <SvgIconButton className='absolute -top-1 -right-1 w-5 h-5' onClick={() => {
                            setMessageVisibility('line-add-friend', true)
                            setVisibility(true)
                        }} ><XCircle className='bg-white stroke-primary-400' /></SvgIconButton>
                    </div>
                )}

                <div className='flex items-center ml-auto'>
                    {hideMessage && (
                        <div className='flex justify-end items-center mr-2'>
                            <Help className='w-5 h-5 stroke-primary-main' />
                            <TextButton fontType='none' className='text-sm underline' onClick={() => {
                                setMessageVisibility('line-add-friend', false)
                                setVisibility(false)
                            }}>
                                LINE連携について
                            </TextButton>
                        </div>
                    )}
                    <AddFriend link={addFriendLink} width={92} height={18} />
                </div>
            </div>
        </div>
    )
}

export default LineLogin