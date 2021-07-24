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
            <div className='md:flex items-end w-full m-2 overflow-hidden'>
                {loading ? (<LoadingImg className='w-32' />) : (
                    <>
                        <div className='flex justify-center md:block text-xs overflow-hidden'>
                            <UrlImage className='md:border border-primary-border rounded p-1' enableEndpoint={false} objectFit='cover' src={currentImage}
                                style={imageStyle}
                                fallback={(
                                    <div className='text-secondary-main text-xs w-full'>
                                        <NotFound style={imageStyle} text={`画像が見つかりません`} />
                                    </div>)} />
                        </div>
                        {otherImages.length > 0 && (
                            <div className='ml-auto mr-1'>
                                <div className='hidden md:block text-xs text-primary-main'>選択可能なアイコン</div>
                                <div className='mt-4 flex items-end'>
                                    {otherImages.map((i) => (
                                        <div className='mx-1 flex flex-col items-center' key={i} >
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
            {currentImage && (<a className='px-2 inline-block w-full truncate overflow-hidden underline text-xs text-lightslategray-600' href={currentImage} target='_blank' rel='noopener noreferrer'>画像を別タブで開く</a>)}
        </>
    )
}

export default Image