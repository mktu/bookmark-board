import React from 'react'
import Image from 'next/image'
import { PlaceHolderImg } from '../Image'
import Frame from './Frame'


type Props = {
    src?: string,
    width?: number,
    height?: number,
    name?: string,
    fallback?: React.ReactNode,
    disableNextImage?: boolean,
}
export const NextImage: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown',
    fallback,
    disableNextImage
}) => {
    const validSrc = src && src !== ''
    if (validSrc) {
        if (disableNextImage) {
            return <img alt={name} src={src} width={width} height={height} style={{ objectFit: 'cover' }} />
        } else {
            return <Image alt={name} src={src} width={width} height={height} objectFit='cover' />
        }
    }
    if (fallback) {
        return <>{fallback}</>
    }
    return <PlaceHolderImg width={width} height={height} />
}

type FrameProps = Omit<Parameters<typeof Frame>[0], 'children'>

const WithFrame: React.FC<FrameProps & Props> = ({
    className,
    width,
    height,
    frame,
    ...props
}) => {
    return (
        <Frame
            {...{
                className,
                width,
                height,
                frame
            }}>
            <NextImage width={width} height={height} {...props} />
        </Frame>
    )
}

export default WithFrame