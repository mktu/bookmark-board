import React from 'react'
import { useRefinements } from '@hooks/useBookmarkRefinement'
import HeartFill from '@components/Common/Icon/HeartFill'
import { SvgIconButton } from '@components/Common/Button'
import { TooltipDivContainer } from '@components/Common/Tooltip'
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
        <SvgIconButton
            onClick={() => {
                updateLikeFilter(hasMask ? '' : profile.id)
            }}
            className={classNames('flex items-center stroke-primary-main hover:stroke-primary-dark', className)}>
            <TooltipDivContainer content='お気に入り' placement='bottom'>
                <HeartFill className={classNames('w-6 mr-1',
                    likeMask ? 'fill-secondary-300' : 'fill-white',
                    likeMask ? 'stroke-secondary-300' : 'stroke-primary-300',
                )} strokeWidth={1.5} />
            </TooltipDivContainer>
        </SvgIconButton>
    )
}

export default LikeOptions