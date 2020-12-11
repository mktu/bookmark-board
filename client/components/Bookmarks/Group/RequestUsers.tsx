import React, { useContext } from 'react'
import { useUserById } from '../../../modules/usersSlice'
import { useGroupById } from '../../../modules/groupSlice'
import Avatar from '../../Common/Avatar'
import { TextButton, ContainedButton } from '../../Common/Button'
import FirebaseContext from '../../../context/FirebaseContext'

type Props = {
    requests: BookmarkRequest[]
}

const ListItem: React.FC<{ request: BookmarkRequest }> = ({
    request
}) => {
    const { clientService } = useContext(FirebaseContext)
    const user = useUserById(request.sender)
    const group = useGroupById(request.groupId)
    return (
        <div className='flex items-center'>
            <Avatar src={user.image} width='32px' height='32px' />
            <div className='mx-2 text-primary-main'>
                {user.name}
            </div>
            <div className='ml-auto flex items-center text-sm'>
                <ContainedButton colorType='secondary' className='mx-2' onClick={() => {
                    group && clientService.modifyGroup(group.id, {
                        users: [...group.users, user.id]
                    }, () => {
                        clientService.updateRequest(group.id, request.id, {
                            status: 'accepted'
                        })
                    })
                }}>追加</ContainedButton>
                <TextButton colorType='secondary' className='mx-2' onClick={() => {
                    clientService.updateRequest(request.groupId, request.id, {
                        status: 'rejected'
                    })
                }}>拒否</TextButton>
            </div>
        </div>
    )
}

const RequestUsers: React.FC<Props> = ({
    requests
}) => {
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold p-3 flex flex-col justify-start align-middle'>
            <div className='p-2 text-primary-main font-normal'>{`${requests.length}件の参加リクエストがあります`}</div>
            {requests.map(r => (
                <div key={r.id}>
                    <ListItem request={r} />
                </div>
            ))}
        </div>
    )
}

export default RequestUsers