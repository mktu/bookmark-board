import React from 'react'
const styles = {
    dark : {
        bookmarkText : 'text-primary-800',
        boardWrapper : 'bg-primary-800',
        boardText : 'text-white',
        icon : 'fill-primary-800'
    },
    light : {
        bookmarkText : 'text-white',
        boardWrapper : 'bg-white',
        boardText : 'text-primary-800',
        icon : 'fill-white'
    }
}
const sizes = {
    sm : {
        textSize : 'text-xl',
        boardPadding : 'px-2',
        margin : 'mr-1',
        width : 20,
        height: 20
    },
    md : {
        textSize : 'text-2xl',
        boardPadding : 'px-2',
        margin : 'mr-1',
        width : 25,
        height: 25
    },
    lg : {
        textSize : 'text-3xl',
        boardPadding : 'px-2',
        margin : 'mr-2',
        width : 25,
        height: 25
    }
}
type Props = {
    theme : keyof typeof styles,
    size : keyof typeof sizes
}
const Logo: React.FC<Props> = ({theme, size}) => (
    <div className="flex items-center">
        <p className={`${sizes[size].textSize} font-bold ${sizes[size].margin} ${styles[theme].bookmarkText}`}>Bookmark</p>
        <div className="flex items-center">
            <div className={`${sizes[size].boardPadding} ${styles[theme].boardWrapper} rounded-sm`}>
                <p className={`${sizes[size].textSize} font-bold ${styles[theme].boardText}`}>Board</p>
            </div>
            <div>
                <svg className={`${styles[theme].icon}`} width={sizes[size].width} height={sizes[size].height} viewBox="0 0 30 25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L30 0L20.8594 12.5L30 25L0 25L0 0Z"  />
                </svg>
            </div>
        </div>
    </div>
)
export default Logo