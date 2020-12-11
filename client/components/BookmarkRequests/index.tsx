import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { WelcomeImg } from '../Common/Image'
import { ContainedButton, OutlinedButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'
import { useRequestListener } from '../../hooks'
type Props = {

}

const BookmarkRequests: React.FC<Props> = () => {
    const router = useRouter()
    const [error, setError] = useState<Error>()
    const [group, setGroup] = useState<BookmarkGroup>()
    const { id } = router.query
    const groupId = id as string ?? ''
    const { clientService } = useContext(FirebaseContext)
    const { latestStatus, exceededLimit } = useRequestListener(groupId)
    useEffect(() => {
        clientService.getGroup(groupId, (group) => {
            setGroup(group)
        }, () => {
            setError(new Error('グループは見つかりませんでした'))
        }, setError)
    }, [clientService])

    useEffect(() => {
        if (latestStatus === 'accepted') {
            router.push(`/bookmarks/${groupId}`)
        }
    }, [latestStatus])

    if (!group) {
        return <div />
    }
    if (error) {
        return (
            <div className='w-full h-full flex flex-col justify-center items-center text-secondary-main'>
                {error.name}
            </div>
        )
    }
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-3/5 flex flex-col justify-center items-center'>
                {latestStatus === 'none' && (
                    <div className='text-lg text-primary-main'>
                        <span>グループ </span>
                        <span className='font-semibold text-primary-dark'>{group.name}</span>
                        <span> の編集者として参加をリクエストします</span>
                    </div>
                )}
                {latestStatus === 'requesting' && (
                    <div className='text-lg text-primary-main'>
                        <span>グループ </span>
                        <span className='font-semibold text-primary-dark'>{group.name}</span>
                        <span> の編集者リクエスト中...</span>
                    </div>
                )}
                {latestStatus === 'rejected' && (
                    <div className='text-lg text-primary-main'>
                        <span>グループ </span>
                        <span className='font-semibold text-primary-dark'>{group.name}</span>
                        <span> の編集者リクエストを拒否されました</span>
                    </div>
                )}
                {exceededLimit && (
                    <div className='text-base text-secondary-main p-2'>
                        リクエストが一定回数を超えました
                    </div>
                )}
                <div className=''><WelcomeImg width='480px' height='480px' /></div>
                <div className='flex items-center justify-center'>
                    <ContainedButton className='mr-2' disabled={latestStatus === 'requesting' || exceededLimit} onClick={() => {
                        clientService.addRequest({
                            groupId
                        })
                    }}>参加をリクエストする</ContainedButton>
                    <OutlinedButton>キャンセルする</OutlinedButton>
                </div>
            </div>
        </div>
    )
}

export default BookmarkRequests