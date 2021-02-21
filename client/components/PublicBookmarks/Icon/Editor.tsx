import React from 'react'
import { SvgIconButton } from '../../Common/Button'
import Avatar from '../../Common/Avatar/NextImage'
import Initial from '../../Common/Avatar/Initial'

type Props = {
    image?: string,
    name?: string
}

const Editor: React.FC<Props> = ({
    image,
    name
}) => (
    <SvgIconButton>
        <Avatar
            src={image}
            width={48}
            height={48}
            name={name}
            fallback={<Initial
                width={48}
                height={48}
                name={name}
            />}
        />
    </SvgIconButton>
)

export default Editor 