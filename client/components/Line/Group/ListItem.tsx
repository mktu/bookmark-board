import { ButtonBase } from '@components/Common/Button'
import Check from '@components/Common/Icon/Check'
import classNames from 'classnames'




type Props = {
    group: BookmarkGroup,
    onCheck: () => void,
    checked?: boolean
}

const ListItem: React.VFC<Props> = ({
    checked, onCheck, group
}) => {
    return (
        <li className='flex items-center p-1 text-primary-main'>
            <ButtonBase id={group.id} aria-label='Check Bookmark'
                onClick={onCheck}
                className={classNames(`${checked ? 'bg-primary-500 stroke-primary-50 border-white' : 'bg-white hover:border-primary-200 border-primary-border'} border rounded-full`,)}>
                <Check className='h-5 w-5 md:h-4 md:w-4' strokeWidth={2} fill='none' />
            </ButtonBase>
            <label className='ml-2 w-full truncate' htmlFor={group.id}>{group.name}</label>
        </li>
    )
}

export const NoGroup: React.VFC<Pick<Props, 'onCheck' | 'checked'>> =
    ({ checked, onCheck }) => (
        <li className='flex items-center p-1 text-primary-main'>
            <ButtonBase id='no-group' aria-label='Check Bookmark'
                onClick={onCheck}
                className={classNames(`${checked ? 'bg-primary-500 stroke-primary-50 border-white' : 'bg-white hover:border-primary-200 border-primary-border'} border rounded-full`,)}>
                <Check className='h-5 w-5 md:h-4 md:w-4' strokeWidth={2} fill='none' />
            </ButtonBase>
            <label className='ml-2 w-full truncate' htmlFor='no-group'>指定しない</label>
        </li>
    )

export default ListItem