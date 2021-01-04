import React, { useMemo, useContext } from 'react'
import { useCommentsByGroup } from '../../modules/commentSlice'
import useCommentListener from '../../hooks/useCommentListener'
import useProfileService from '../../hooks/useProfileService'
import { numberToDateTime } from '../../utils'
import { SvgIconButton, HeartButton } from '../Common/Button'
import { PopoverDivContainer } from '../Common/Popover'
import { UserPopover } from '../PopoverMenu'
import { useProfile } from '../../modules/profileSlice'
import Avatar from '../Common/Avatar/AvatarImage'
import FirebaseContext from '../../context/FirebaseContext'

type Props = {
    groupId: string
}

const Comments: React.FC<Props> = ({
    groupId
}) => {
    const myProfile = useProfile()
    useCommentListener(groupId, 10)
    const comments = useCommentsByGroup(groupId)
    const profiles = useProfileService(comments.map(c => c.sender))
    const senders = useMemo(() => {
        return profiles.reduce((acc, p) => {
            acc[p.id] = p
            return acc
        }, {} as { [id: string]: Profile })
    }, [profiles])
    const { clientService } = useContext(FirebaseContext)
    return (
        <div>
            {comments.map(c => {
                const myReaction = c.reactions.find(r => r.user === myProfile.id)
                return (
                    <div key={c.id} className='flex items-center p-2 border-b'>
                        <PopoverDivContainer content={senders[c.sender] && <UserPopover user={senders[c.sender]} />}>
                            <SvgIconButton aria-label='User'>
                                <Avatar src={senders[c.sender]?.image} width='40px' height='40px' name={senders[c.sender]?.name}/>
                            </SvgIconButton>
                        </PopoverDivContainer>
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
                                <HeartButton 
                                    aria-label='Likes'
                                    disabled={!myProfile.id}
                                    active={Boolean(myReaction)}
                                    counter={c.reactions.length > 0 && c.reactions.length}
                                    onClick={() => {
                                        myReaction ? clientService.updateComment(groupId, c.id, {
                                            reactions: c.reactions.filter(r => r.user !== myProfile.id)
                                        }) : clientService.updateComment(groupId, c.id, {
                                            reactions: [...c.reactions, {
                                                user: myProfile.id,
                                                type: 'likes',
                                            }]
                                        })
                                    }}
                                />
                            </div>
                            <div className='text-xs text-primary-300'>
                                {c.lastUpdate ? numberToDateTime(c.lastUpdate) : numberToDateTime(c.created)}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments