import React from 'react'
import { SvgIconButton } from '../../Common/Button'
import Avatar from '../../Common/Avatar/AvatarImage'

type Props = {
    image ?: string,
    name ?: string
}

const Editor : React.FC<Props> = ({
    image,
    name
}) => (
    <SvgIconButton>
        <Avatar src={image} width='48px' height='48px' name={name} />
    </SvgIconButton>
)

export default Editor 