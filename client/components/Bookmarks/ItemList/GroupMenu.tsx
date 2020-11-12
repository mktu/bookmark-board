import {useContext} from 'react'
import { useRouter } from 'next/router'
import { TextButton } from '../../Common/Button'
import FirebaseContext from '../../../context/FirebaseContext'

const GroupMenu = () => {
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold pt-3 pb-3 flex flex-col justify-start align-middle'>
            <TextButton className='block w-full pl-3 pr-3 text-left hover:bg-primary-50'>削除</TextButton>
        </div>
    )
}

export default GroupMenu