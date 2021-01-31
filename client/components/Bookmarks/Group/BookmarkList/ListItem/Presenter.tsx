import React from 'react'
import Link from 'next/link'
import Base from './PresenterBase'


type Props = {
    detailLink: string,
    attachDnDRef: (el: HTMLElement) => void,
    dragging: boolean,
    color?: string,
    opacity: number,
    image: React.ReactNode,
    title?: string,
    url?: string,
    maskUrl?: boolean,
    description?: string,
    comment?: string,
    lastUpdate?: string,
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
    deleteIcon: React.ReactNode,
    heartButton: React.ReactNode,
}

const ListItem: React.FC<Props> = ({
    detailLink,
    attachDnDRef,
    dragging,
    color,
    opacity,
    image,
    title,
    url,
    description,
    comment,
    lastUpdate,
    copyIcon,
    openIcon,
    deleteIcon,
    heartButton
}) => {
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
    return (
        <Link href={detailLink}>
            <a href={detailLink} ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} flex items-center cursor-pointer`}
                style={color ? { borderLeft: `5px solid ${color}`, opacity } : { opacity }} tabIndex={0}>
                <Base {...{
                    attachDnDRef : isTouch ? attachDnDRef : undefined,
                    image,
                    title,
                    url,
                    description,
                    comment,
                    lastUpdate,
                    copyIcon,
                    openIcon,
                    deleteIcon,
                    heartButton
                }} />
            </a>
        </Link>
    )
}

export default ListItem