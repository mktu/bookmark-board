import React, { useState, useEffect, CSSProperties } from 'react'
import { LoadingImg } from '@components/Common/Image'
import { ButtonBase } from '@components/Common/Button'
import UrlImage, { NotFound } from '@components/Common/Avatar/UrlImage'
import { Label } from '@components/Common/Label'
import { BookmarkListImageSize, BookmarkLargeImageSize } from '@utils/constants'

type Props = {
    image?: string,
    images?: string[],
    loading: boolean,
    disableEndpoint?: boolean,
    onChangeImage: (image: string) => void
}

const Image: React.FC<Props> = ({
    image,
    images,
    loading,
    disableEndpoint,
    onChangeImage
}) => {
    const [currentImage, setCurrentImage] = useState(image)
    useEffect(() => {
        setCurrentImage(image)
    }, [image])
    const otherImages = images && Array.from(new Set(images)).filter(Boolean) || []
    const imageStyle : CSSProperties = {
        width : `min(${BookmarkLargeImageSize}px,90vw)`,
        height : `calc(min(${BookmarkLargeImageSize}px,90vw)/1.91)` }
    return (
        <>
            <Label className=''>Icons</Label>
            <div className='overflow-hidden items-end m-2 w-full md:flex'>
                {loading ? (<LoadingImg className='w-32' />) : (
                    <>
                        <div className='flex overflow-hidden justify-center text-xs md:block'>
                            <UrlImage className='p-1 rounded border-primary-border md:border' enableEndpoint={false} objectFit='cover' src={currentImage}
                                style={imageStyle}
                                fallback={(
                                    <div className='w-full text-xs text-secondary-main'>
                                        <NotFound style={imageStyle} text={`画像が見つかりません`} />
                                    </div>)} />
                        </div>
                        {otherImages.length > 0 && (
                            <div className='mr-1 ml-auto'>
                                <div className='hidden text-xs text-primary-main md:block'>選択可能なアイコン</div>
                                <div className='flex items-end mt-4'>
                                    {otherImages.map((i) => (
                                        <div className='flex flex-col items-center mx-1' key={i} >
                                            <ButtonBase className={`rounded block p-1 ${i === currentImage ? 'border-2 border-primary-main' : 'border border-primary-border'}`} onClick={() => {
                                                i !== currentImage && onChangeImage(i)
                                            }}>
                                                <UrlImage width={BookmarkListImageSize} height={BookmarkListImageSize} src={i} enableEndpoint={!disableEndpoint} />
                                            </ButtonBase>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            {currentImage && (<a className='inline-block overflow-hidden px-2 w-full text-xs text-lightslategray-600 underline truncate' href={currentImage} target='_blank' rel='noopener noreferrer'>画像を別タブで開く</a>)}
        </>
    )
}

export default Image