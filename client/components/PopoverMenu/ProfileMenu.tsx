import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'

const ProfileMenu = () => {
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold pt-3 pb-3 flex flex-col justify-start align-middle'>
            <TextButton className='block w-full pl-3 pr-3 text-left hover:bg-primary-50 whitespace-no-wrap'
                onClick={() => {
                    router.push('/profile')
                }}>編集</TextButton>
            <TextButton onClick={() => {
                clientService.logout(() => {
                    router.push('/signin')
                })
            }} className='block w-full pl-3 pr-3 text-left hover:bg-primary-50 whitespace-no-wrap'>ログアウト</TextButton>
        </div>
    )
}

export default ProfileMenu