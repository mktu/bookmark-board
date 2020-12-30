import Avatar from '../Common/Avatar/AvatarImage'

type Props = {
    user : Profile
}

const UserPopover: React.FC<Props> = ({
    user
}) => {
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border border-primary-border font-semibold p-3 flex'>
            <Avatar height='48px' width='48px' src={user.image} name={user.name}/>
            <div className='ml-2 flex flex-col items-start'>
                <div className='text-primary-dark'>
                    {user.name}
                </div>
                <div className='text-primary-main font-normal text-sm'>
                    {user.comment}
                </div>
            </div>
        </div>
    )
}

export default UserPopover