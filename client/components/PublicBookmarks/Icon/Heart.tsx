import React from 'react'
import HeartButton from '../../Common/Button/HeartButton'

type Props = Parameters<typeof HeartButton>[0]

const Heart: React.FC<Props> = (props) => (
    <HeartButton
        aria-label='Likes'
        {...props} />
)

export default Heart 