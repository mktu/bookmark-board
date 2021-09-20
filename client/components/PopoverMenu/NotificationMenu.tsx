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
        <div className='flex overflow-hidden flex-col justify-start pb-1 align-middle bg-white rounded border border-primary-border shadow-lg opacity-80' style={{width:256}}>
            <div className='flex justify-center items-center p-2 w-full text-primary-main bg-primary-light border-b border-primary-border'>
                <span><Info className='mr-2 w-6 h-6 fill-white stroke-primary-main' /></span>
                <span>お知らせ</span>
            </div>
            <ul className='overflow-y-auto text-sm text-primary-main' style={{minHeight : 128, maxHeight : 256}}>
                {notifications.length === 0 && (
                    <div className='flex justify-center items-center w-full h-full' style={{height:128}}>
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
                            <span className='ml-2'>({numberToDate(v.created)})</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationMenu