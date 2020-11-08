import React, { useState, useContext } from 'react'
import { AddFill, Add, ChevronDown } from '../../../Common/Icon'
import { SvgIconButton } from '../../../Common/Button'
import { BookmarkInputBase } from '../../../Common/Input'
import { LinkPreview, useLinkPreview } from '../../../Common/LinkPreview'
import FirebaseContext from '../../../../context/FirebaseContext'

type Props = {
    groupId: string
}

const Input: React.FC<Props> = ({
    groupId
}) => {
    const [showInput, setShowInput] = useState(false)
    const [bookmarkInput, setBookmarkInput] = useState('')
    const { linkData, url, status } = useLinkPreview({ text: bookmarkInput })
    const invalidUrl = status === 'none' && Boolean(bookmarkInput)
    const { clientService } = useContext(FirebaseContext)
    return (
        <div className='relative'>
            <div className={`overflow-hidden transition-all ease-in-out duration-200 transform ${showInput ? 'p-4' : 'h-0'}`}>
                <div className='flex flex-row items-center max-w-screen-sm '>
                    <div>
                        <SvgIconButton className='block mr-2' onClick={() => { setShowInput(false) }}>
                            <ChevronDown strokeWidth='1.5px' className='w-8' />
                        </SvgIconButton>
                    </div>
                    <div className='w-full'>
                        <div className='bg-white rounded shadow focus:shadow-outline'>
                            <BookmarkInputBase placeholder={'ブックマークURLを入力'} value={bookmarkInput} onChange={(e) => {
                                setBookmarkInput(e.target.value)
                            }} />
                        </div>
                        {status !== 'none' && (
                            <div className='bg-white mt-2 rounded shadow focus:shadow-outline' >
                                <LinkPreview url={url} linkData={linkData} />
                            </div>
                        )}
                        {invalidUrl && (
                            <div className=' text-secondary-main text-sm p-2' >
                                無効なURLです
                            </div>
                        )}
                    </div>
                    <div className='ml-auto'>
                        <SvgIconButton className='block ml-2' onClick={() => {
                            if (invalidUrl) return
                            const hasLinkData = Boolean(linkData)
                            let data;
                            if (hasLinkData) {
                                data = {
                                    url,
                                    title: linkData.title,
                                    image: linkData.images.length > 0 && linkData.images[0],
                                    description: linkData.description || '',
                                    neighbors: [],
                                    groupId,
                                    owner: '',
                                    reactions: {},
                                }
                            }
                            else{
                                data = {
                                    url,
                                    neighbors: [],
                                    groupId,
                                    owner: '',
                                    reactions: {},
                                    unacquired: true
                                }
                            }
                            !invalidUrl && clientService.addBookmark(data, () => {
                                setBookmarkInput('')
                            })
                        }}>
                            <Add strokeWidth='1.5px' className='w-10' />
                        </SvgIconButton>
                    </div>
                </div>
            </div>
            {!showInput && (
                <div className='absolute bottom-0 left-0 p-4'>
                    <SvgIconButton variant='inherit' onClick={() => { setShowInput(true) }}>
                        <AddFill className='w-12 fill-secondary-main hover:fill-secondary-dark' filter='drop-shadow(2px 2px 1.5px rgba(0,0,0,0.0))' />
                    </SvgIconButton>
                </div>
            )}
        </div>
    )
}

export default Input