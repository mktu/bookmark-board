import React, { useState, useContext } from 'react'
import { NoItemImg } from '../../Common/Image'
import { BookmarkInput } from '../../Common/Input'
import { SvgIconButton } from '../../Common/Button'
import { Add } from '../../Common/Icon'
import { LinkPreview, useLinkPreview } from '../../Common/LinkPreview'
import FirebaseContext from '../../../context/FirebaseContext'

type Props = {
    groupId: string
}

const NoItem: React.FC<Props> = ({
    groupId
}) => {
    const [inText, setInText] = useState('')
    const { linkData, status, url } = useLinkPreview({
        text : inText
    })
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='flex flex-col items-center justify-center p-4 w-full h-full bg-primary-light'>
            <p className='mb-4 text-primary-main'>
                ブックマークはまだ登録されていません
            </p>
            <div className='bg-white rounded-full p-12 flex items-center justify-center'>
                <NoItemImg width={200} />
            </div>
            <div className='w-6/12 mt-4'>
                <div className='flex flex-row items-center'>
                    <BookmarkInput placeholder={'ブックマークURLを入力'} value={inText} onChange={(e) => {
                        setInText(e.target.value)
                    }} />
                    <SvgIconButton className='block ml-2' onClick={() => {
                        linkData.url && clientService.addBookmark({
                            url : linkData.url,
                            title : linkData.title,
                            image : linkData.images.length > 0 && linkData.images[0],
                            description : linkData.description,
                            neighbors : [],
                            groupId,
                            owner : '',
                            reactions : {}
                        }, (id)=>{
                            console.log(`created new bookmark ${id}`)
                            setInText('')
                        })
                    }}>
                        <Add strokeWidth='1.5px' className='w-10' />
                    </SvgIconButton>
                </div>
                <LinkPreview url={url} linkData={linkData} />
                {status==='failed' && (
                    <div>無効なURLです</div>
                )}
            </div>
        </div>
    )
}

export default NoItem