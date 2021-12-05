import { VFC } from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import { OutlinedButton } from '@components/Common/Button'
import Check from '@components/Common/Icon/Check'

type Props = {
    onClickLogin: () => void,
    authed: boolean,
    name ?:string
}

const LineLogin: VFC<Props> = ({
    onClickLogin,
    authed,
    name
}) => {
    return (
        <div className='flex justify-between items-end'>
            <LoginIcon className='w-10 h-10' />
            {authed ? (
                <div className='flex items-center text-primary-main'>
                    <Check className='mr-2 w-5 h-5 rounded-full border border-primary-400 stroke-primary-400'/>
                    <div className='mr-4 text-primary-400'>{name}</div>
                    <OutlinedButton className='text-sm' paddings='py-1 px-2' onClick={onClickLogin}>再認証</OutlinedButton>
                </div>
            ) : <OutlinedButton onClick={onClickLogin}>認証する</OutlinedButton>}

        </div>
    )
}

export default LineLogin