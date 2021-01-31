import React from 'react'
import Base from '../PresenterBase'

type Props = {
    color?: string,
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
    style: React.CSSProperties
}

const ListItem: React.FC<Props> = ({
    color,
    image,
    title,
    url,
    description,
    comment,
    lastUpdate,
    copyIcon,
    openIcon,
    deleteIcon,
    heartButton,
    style
}) => {

    return (
        <div className={`w-full flex items-center cursor-pointer opacity-50`} style={color ? { borderLeft: `5px solid ${color}`, ...style } : { ...style }} >
            <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50'>
                <Base {...{
                    image,
                    title,
                    url,
                    description,
                    comment,
                    lastUpdate,
                    copyIcon,
                    openIcon,
                    deleteIcon,
                    heartButton,
                }} />
            </div>
        </div>
    )
}

export default ListItem