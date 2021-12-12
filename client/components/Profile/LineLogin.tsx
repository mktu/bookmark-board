import { VFC } from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import { OutlinedButton, ContainedButton } from '@components/Common/Button'
import Check from '@components/Common/Icon/Check'

type Props = {
    onClickLogin: () => void,
    onUnlink: ()=>void,
    authed: boolean,
    name ?:string
}

const LineLogin: VFC<Props> = ({
    onClickLogin,
    onUnlink,
    authed,
    name
}) => {
    return (
        <div className='flex justify-between items-end w-full'>
            <LoginIcon className='w-10 h-10' />
            {authed ? (
                <div className='flex overflow-x-hidden items-center w-full text-primary-main'>
                    <Check className='mx-2 w-5 h-5 rounded-full border border-primary-400 stroke-primary-400'/>
                    <div className='flex-1 mr-4 text-primary-400 truncate'>{name}</div>
                    <OutlinedButton className='text-sm' border='border-t border-l border-b' rounded='rounded-l' paddings='py-1 px-2' onClick={onClickLogin}>再認証</OutlinedButton>
                    <ContainedButton className='text-sm' rounded='rounded-r' paddings='py-1 px-2' colorType='secondary' onClick={onUnlink}>解除</ContainedButton>
                </div>
            ) : <OutlinedButton onClick={onClickLogin}>認証する</OutlinedButton>}

        </div>
    )
}

export default LineLogin