import React, { useContext } from 'react'
import { useUserById } from '../../../modules/usersSlice'
import { useGroupById } from '../../../modules/groupSlice'
import Avatar from '../../Common/Avatar/NextImage'
import Initial from '../../Common/Avatar/Initial'
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
            <Avatar
                src={user.image}
                width={32}
                height={32}
                name={user.name}
                fallback={<Initial
                    width={32}
                    height={32}
                    name={user.name}
                />}
            />
            <div className='mx-2 text-primary-main'>
                {user.name}
            </div>
            <div className='flex items-center ml-auto text-sm'>
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
        <div className='flex flex-col justify-start p-3 font-semibold align-middle bg-white rounded border border-primary-border shadow-lg'>
            <div className='p-2 font-normal text-primary-main'>{`${requests.length}件の参加リクエストがあります`}</div>
            {requests.map(r => (
                <div key={r.id}>
                    <ListItem request={r} />
                </div>
            ))}
        </div>
    )
}

export default RequestUsers