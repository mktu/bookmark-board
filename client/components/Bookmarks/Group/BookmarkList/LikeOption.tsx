import React from 'react'
import { useRefinements } from '@hooks/useBookmarkRefinement'
import HeartFill from '@components/Common/Icon/HeartFill'
import { TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import classNames from 'classnames'

type Props = {
    groupId: string,
    className?: string
}

const LikeOptions: React.FC<Props> = ({
    groupId,
    className
}) => {
    const profile = useProfile()
    const { likeMask, updateLikeFilter } = useRefinements(groupId)
    const hasMask = likeMask === profile.id
    return (
        <TextButton
            onClick={() => {
                updateLikeFilter(hasMask ? '' : profile.id)
            }}
            className={classNames('flex items-center stroke-primary-main hover:stroke-primary-dark', className)}>
            <HeartFill className={classNames('w-6 mr-1',
                likeMask ? 'fill-secondary-300' : 'fill-white',
                likeMask ? 'stroke-secondary-300' : 'stroke-primary-300',
            )} />
            <div className='text-sm'>お気に入り</div>
        </TextButton>
    )
}

export default LikeOptions