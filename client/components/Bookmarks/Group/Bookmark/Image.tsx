import React, { useState, useEffect } from 'react'
import { LoadingImg } from '../../../Common/Image'
import { ButtonBase } from '../../../Common/Button'
import UrlImage, { NotFound } from '../../../Common/Avatar/UrlImage'
import { Label } from '../../../Common/Label'

type Props = {
    image?: string,
    images?: string[],
    loading: boolean,
    onChangeImage: (image: string) => void
}

const Image: React.FC<Props> = ({
    image,
    images,
    loading,
    onChangeImage
}) => {
    const [currentImage, setCurrentImage] = useState(image)
    useEffect(() => {
        setCurrentImage(image)
    }, [image])
    const otherImages = images && Array.from(new Set(images)).filter(Boolean) || []
    return (
        <>
            <Label className=''>Icons</Label>
            <div className='flex items-end max-w-full m-2 overflow-hidden'>
                {loading ? (<LoadingImg className='w-32' />) : (
                    <>
                        <div className='block border rounded p-1 text-xs border-primary-border overflow-hidden'>
                            <UrlImage enableEndpoint={false} width='256px' src={currentImage} fallback={(<div className='text-secondary-main text-xs w-full' style={{ maxWidth: '256px' }}>
                                <NotFound width='256px' height='128px' text={`画像が見つかりません`} />
                            </div>)} />
                        </div>
                        {otherImages.length > 0 && (
                            <div className='ml-auto mr-1'>
                                <div className='text-xs text-primary-main'>選択可能なアイコン</div>
                                <div className='mt-4 flex items-end'>
                                    {otherImages.map((i) => (
                                        <div className='mx-1 flex flex-col items-center' key={i} >
                                            <ButtonBase className={`rounded block p-1 ${i === currentImage ? 'border-2 border-primary-main' : 'border border-primary-border'}`} onClick={() => {
                                                i !== currentImage && onChangeImage(i)
                                            }}>
                                                <UrlImage width='64px' height='64px' src={i} />
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