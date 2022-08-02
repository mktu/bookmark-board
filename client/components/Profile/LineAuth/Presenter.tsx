import { VFC } from 'react'
import AddFriend from './AddFriend'

type Props = {
    closeButton: React.ReactNode,
    success: boolean,
    error: string,
    addFriendLink: string
}

const Presenter: VFC<Props> = ({
    success,
    error,
    closeButton,
    addFriendLink
}) => {
    return (
        <div>
            {success && (
                <div>
                    <div className='text-lg text-primary-main'>Lineアカウントの認証に成功
                        <span className='ml-1' role='img' aria-label='success'>🎉</span>
                    </div>
                    <p className='my-2 text-primary-main'>
                        友達に追加することで、Line上からBookmarkの登録や読み出しが行えます.
                    </p>
                </div>

            )}
            {error && (
                <div className='text-lg text-secondary-main'>{error}</div>
            )}
            <div className='mt-2 flex items-center justify-end'>
                {success && (
                    <div className='mr-2'>
                        <AddFriend link={addFriendLink} width={128} height={24}/>
                    </div>
                )}
                {closeButton}
            </div>
        </div>
    )
}

export default Presenter