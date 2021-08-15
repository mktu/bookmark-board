import { useEffect } from 'react'
import Info from '@components/Common/Icon/Info'
import { numberToDate } from '@utils/index'
import useNotifications from '@hooks/useNotifications'

const NotificationMenu = () => {
    const { notifications, setReadFlag, unreads } = useNotifications()
    const unreadCount = unreads.length
    useEffect(() => {
        if (unreadCount > 0) {
            setReadFlag()
        }
    }, [unreadCount, setReadFlag])
    return (
        <div className='bg-white opacity-80 rounded shadow-lg border-primary-border overflow-hidden flex flex-col justify-start align-middle pb-1' style={{width:256}}>
            <div className='flex items-center w-full text-primary-main bg-primary-light md:bg-primary-main justify-center p-2 md:text-white '>
                <span><Info className='w-6 h-6 stroke-primary-main mr-2 fill-white' /></span>
                <span>お知らせ</span>
            </div>
            <ul className='text-sm text-primary-main overflow-y-auto' style={{minHeight : 128, maxHeight : 256}}>
                {notifications.length === 0 && (
                    <div className='flex items-center w-full h-full justify-center' style={{height:128}}>
                        新しいお知らせはありません
                    </div>
                )}
                {notifications.map(v => (
                    <li className={`border-b border-primary-border py-2 flex items-center ${v.contentUrl && 'hover:bg-primary-hover'}`} key={v.id}>
                        <div className='pl-2'>
                            {v.contentUrl ? (
                                <a href={v.contentUrl} target='_blank' rel='noopener noreferrer' className=''>
                                    {v.content}
                                </a>
                            ):(
                                <span>{v.content}</span>
                            )}
                        </div>
                        <div className='pr-2 flex text-xs justify-end ml-auto flex-col'>
                            <div>{numberToDate(v.created)}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationMenu