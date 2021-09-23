import Avatar from '../Common/Avatar/NextImage'
import Initial from '../Common/Avatar/Initial'
import { TwitterUrl } from '@utils/constants'
import TwitterIcon from '../Common/Icon/Twitter'

type Props = {
    user: Profile
}

const UserPopover: React.FC<Props> = ({
    user
}) => {
    return (
        <div className='flex p-3 font-semibold bg-white rounded border border-primary-border shadow-lg'>
            <div>
                <Avatar
                    height={48}
                    width={48}
                    src={user.image}
                    name={user.name}
                    fallback={<Initial
                        height={48}
                        width={48}
                        name={user.name}
                    />}
                />
            </div>
            <div className='ml-2 w-full'>
                <div className='flex items-center w-full text-primary-dark'>
                    <div>
                        {user.name}
                    </div>
                    {user.twitter && (
                        <a className='flex items-center p-1' href={`${TwitterUrl}${user.twitter}`} target='_blank' rel='noopener noreferrer' >
                            <TwitterIcon width='32px' height='32px' />
                        </a>
                    )}
                </div>
                <div className='text-sm font-normal text-primary-main'>
                    {user.comment}
                </div>
            </div>
        </div>
    )
}

export default UserPopover