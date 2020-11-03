import React, { useState, useContext } from 'react'
import { NoItemImg } from '../../Common/Image'
import { Input } from '../../Common/Input'
import { SvgIconButton } from '../../Common/Button'
import { Add } from '../../Common/Icon'
import { find } from 'linkifyjs';
import { LinkPreview, useLinkPreview } from '../../Common/LinkPreview'
import FirebaseContext from '../../../context/FirebaseContext'

type Props = {
    groupId: string
}

const NoItem: React.FC<Props> = ({
    groupId
}) => {
    const [inText, setInText] = useState('')
    const urls = find(inText)
    const invalid = inText !== '' && urls.length === 0
    const { linkData } = useLinkPreview({
        url: urls.length > 0 && urls[0].value
    })
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='flex flex-col items-center justify-center p-4 w-full h-full'>
            <p className='mb-4 text-primary-main'>
                ブックマークはまだ登録されていません
            </p>
            <div>
                <NoItemImg width={200} />
            </div>
            <div className='w-6/12 mt-4'>
                <div className='flex flex-row items-center'>
                    <Input placeholder={'ブックマークURLを入力'} value={inText} onChange={(e) => {
                        setInText(e.target.value)
                    }} />
                    <SvgIconButton className='block ml-2' onClick={() => {
                        linkData.url && clientService.addBookmark({
                            url : linkData.url,
                            title : linkData.title,
                            image : linkData.images.length > 0 && linkData.images[0],
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
                {urls.length > 0 && (
                    <LinkPreview url={urls[0].value} linkData={linkData} />
                )}
                {invalid && (
                    <div>無効なURLです</div>
                )}
            </div>
        </div>
    )
}

export default NoItem