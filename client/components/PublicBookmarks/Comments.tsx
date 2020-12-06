import React, { useMemo } from 'react'
import { useCommentsByGroup } from '../../modules/commentSlice'
import { useProfileService, useCommentListener } from '../../hooks'
import { numberToDateTime } from '../../utils'
import { SvgIconButton } from '../Common/Button'
import { HeartFill } from '../Common/Icon'
import Avatar from '../Common/Avatar'

type Props = {
    groupId: string
}

const Comments: React.FC<Props> = ({
    groupId
}) => {
    useCommentListener(groupId, 10)
    const comments = useCommentsByGroup(groupId)
    const profiles = useProfileService(comments.map(c => c.sender))
    const senders = useMemo(() => {
        return profiles.reduce((acc, p) => {
            acc[p.id] = p
            return acc
        }, {} as { [id: string]: Profile })
    }, [profiles])
    return (
        <div>
            {comments.map(c => (
                <div key={c.id} className='flex items-center p-2 border-b'>
                    <div>
                        <Avatar src={senders[c.sender]?.image} width='40px' height='40px' />
                    </div>
                    <div className='px-2 text-sm text-primary-main'>
                        <div className='text-xs text-primary-400'>
                            {senders[c.sender]?.name}
                        </div>
                        <div>
                            {c.comment}
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <div className='flex justify-end p-2'>
                            <SvgIconButton>
                                <HeartFill className='w-6 fill-primary-300 hover:fill-primary-main stroke-0' />
                            </SvgIconButton>
                        </div>
                        <div className='text-xs text-primary-300'>
                            {c.lastUpdate ? numberToDateTime(c.lastUpdate) : numberToDateTime(c.created)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments