import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextButton } from '@components/Common/Button'
import FirebaseContext from '@context/FirebaseContext'

const ProfileMenu = () => {
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='flex flex-col justify-start rounded border border-primary-border bg-white py-3 align-middle font-semibold shadow-lg'>
            <TextButton className='block w-full whitespace-nowrap px-3 text-left hover:bg-primary-50'
                onClick={() => {
                    router.push('/profile')
                }}>編集</TextButton>
            <TextButton onClick={() => {
                clientService.logout(() => {
                    router.push('/signin')
                })
            }} className='block w-full whitespace-nowrap px-3 text-left hover:bg-primary-50'>ログアウト</TextButton>
        </div>
    )
}

export default ProfileMenu