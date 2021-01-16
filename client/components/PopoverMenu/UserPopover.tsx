import Avatar from '../Common/Avatar/AvatarImage'
import { TwitterUrl } from '../../utils/constants'
import { TwitterImage } from '../Common/Image'

type Props = {
    user: Profile
}

const UserPopover: React.FC<Props> = ({
    user
}) => {
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold p-3 flex'>
            <div>
                <Avatar height='48px' width='48px' src={user.image} name={user.name} />
            </div>
            <div className='ml-2 w-full'>
                <div className='text-primary-dark flex items-center w-ful'>
                    <div>
                        {user.name}
                    </div>
                    {user.twitter && (
                        <a className='p-1 flex items-center' href={`${TwitterUrl}${user.twitter}`} target='_blank' rel='noopener noreferrer' >
                            <TwitterImage width='32px' height='32px' variant='logo' />
                        </a>
                    )}
                </div>
                <div className='text-primary-main font-normal text-sm'>
                    {user.comment}
                </div>
            </div>
        </div>
    )
}

export default UserPopover