import { getRelativeDate } from '@utils/date'
import Refresh from '@components/Common/Icon/Refresh'

type Props = {
    created: number,
    lastUpdate?: number,
}

const DateInfo: React.VFC<Props> = ({
    lastUpdate,
    created
}) => {
    const type = lastUpdate ? '更新' : '作成'
    const editDate = getRelativeDate(lastUpdate || created)
    const icon = lastUpdate ? (<Refresh className='w-4 h-4 stroke-primary-main' />) :
        editDate.type === 'date' ? <span /> :
            (<span role='img' aria-label='create' className='mr-1'>🎉</span>)
    return (
        <div className='flex items-center text-xs text-primary-main'>
            {icon}
            <span className='mx-1'>{editDate.msg}</span>
            <span className='mr-1'>{type}</span>
        </div>
    )
}

export default DateInfo