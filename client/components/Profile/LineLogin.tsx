import {VFC} from 'react'
import LoginIcon from '@components/Common/Icon/LineLogin'
import { OutlinedButton } from '@components/Common/Button'

type Props = {
    onClickLogin : ()=>void
}

const LineLogin : VFC<Props> = ({
    onClickLogin
})=>{
    return (
        <div className='flex justify-between items-end'>
            <LoginIcon className='w-10 h-10'/>
            <OutlinedButton onClick={onClickLogin}>認証する</OutlinedButton>
        </div>
    )
}

export default LineLogin