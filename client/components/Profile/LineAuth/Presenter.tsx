import { VFC } from 'react'

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
            <div className='flex justify-end items-center mt-2'>
                {success && (
                    <div className='mr-2'>
                        <a href={addFriendLink} target='_blank' rel='noopener noreferrer'><img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height={24} width={128} /></a>
                    </div>
                )}
                {closeButton}
            </div>
        </div>
    )
}

export default Presenter