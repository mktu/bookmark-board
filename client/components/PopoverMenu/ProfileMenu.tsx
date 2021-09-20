import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextButton } from '@components/Common/Button'
import FirebaseContext from '@context/FirebaseContext'

const ProfileMenu = () => {
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='flex flex-col justify-start pt-3 pb-3 font-semibold align-middle bg-white rounded border border-primary-border shadow-lg opacity-80'>
            <TextButton className='block pr-3 pl-3 w-full text-left hover:bg-primary-50 whitespace-no-wrap'
                onClick={() => {
                    router.push('/profile')
                }}>編集</TextButton>
            <TextButton onClick={() => {
                clientService.logout(() => {
                    router.push('/signin')
                })
            }} className='block pr-3 pl-3 w-full text-left hover:bg-primary-50 whitespace-no-wrap'>ログアウト</TextButton>
        </div>
    )
}

export default ProfileMenu