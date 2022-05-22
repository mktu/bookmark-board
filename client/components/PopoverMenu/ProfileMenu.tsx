import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextButton } from '@components/Common/Button'
import FirebaseContext from '@context/FirebaseContext'

const ProfileMenu = () => {
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='flex flex-col justify-start py-3 font-semibold align-middle bg-white rounded border border-primary-border shadow-lg'>
            <TextButton className='block px-3 w-full text-left whitespace-nowrap hover:bg-primary-50'
                onClick={() => {
                    router.push('/profile')
                }}>編集</TextButton>
            <TextButton onClick={() => {
                clientService.logout(() => {
                    router.push('/signin')
                })
            }} className='block px-3 w-full text-left whitespace-nowrap hover:bg-primary-50'>ログアウト</TextButton>
        </div>
    )
}

export default ProfileMenu