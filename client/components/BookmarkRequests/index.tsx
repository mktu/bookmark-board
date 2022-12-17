import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { WelcomeImg } from '../Common/Image'
import { ContainedButton, OutlinedButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'
import { useRequestListener } from '../../hooks'

const BookmarkRequests: React.VFC = () => {
    const router = useRouter()
    const [error, setError] = useState<Error>()
    const [group, setGroup] = useState<BookmarkGroup>()
    const { id } = router.query
    const groupId = id as string ?? ''
    const { clientService } = useContext(FirebaseContext)
    const { latestStatus, exceededLimit, latestRequest } = useRequestListener(groupId)
    useEffect(() => {
        clientService.getGroup(groupId, (group) => {
            setGroup(group)
        }, () => {
            setError(new Error('グループは見つかりませんでした'))
        }, setError)
    }, [clientService, groupId])

    useEffect(() => {
        if (latestStatus === 'accepted' && latestRequest?.id) {
            clientService.removeRequest(groupId, latestRequest.id)
            router.push(`/bookmarks/${groupId}`)
        }
    }, [latestStatus, groupId, latestRequest?.id, router, clientService])

    if (!group) {
        return <div />
    }
    if (error) {
        return (
            <div className='flex h-full w-full flex-col items-center justify-center text-secondary-main'>
                {error.name}
            </div>
        )
    }
    return (
        <div className='flex h-full w-full flex-col items-center justify-center'>
            <div className='flex w-3/5 flex-col items-center justify-center'>
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
                    <div className='p-2 text-base text-secondary-main'>
                        リクエストが一定回数を超えました
                    </div>
                )}
                <div className=''><WelcomeImg width={480} height={480} /></div>
                <div className='flex items-center justify-center'>
                    <ContainedButton className='mr-2 whitespace-nowrap' disabled={latestStatus === 'requesting' || exceededLimit} onClick={() => {
                        clientService.addRequest({
                            groupId
                        })
                    }}>参加をリクエスト</ContainedButton>
                    <OutlinedButton className='whitespace-nowrap'>キャンセル</OutlinedButton>
                </div>
            </div>
        </div>
    )
}

export default BookmarkRequests