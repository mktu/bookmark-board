import React from 'react'
import Image from "next/image";
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
            // blurdata
            // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAE0lEQVR42mPMq6ysZ0ADjDQQBAA3RAlhPiic9AAAAABJRU5ErkJggg==);
            return <img alt={name} src={src} width={width} height={height} style={{ objectFit: 'cover' }} />
        } else {
            return (
                <Image
                    alt={name}
                    src={src}
                    width={width}
                    height={height}
                    placeholder='blur'
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAE0lEQVR42mPMq6ysZ0ADjDQQBAA3RAlhPiic9AAAAABJRU5ErkJggg=='
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover"
                    }} />
            );
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