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
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold p-3 flex'>
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
                <div className='text-primary-dark flex items-center w-ful'>
                    <div>
                        {user.name}
                    </div>
                    {user.twitter && (
                        <a className='p-1 flex items-center' href={`${TwitterUrl}${user.twitter}`} target='_blank' rel='noopener noreferrer' >
                            <TwitterIcon width='32px' height='32px' />
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