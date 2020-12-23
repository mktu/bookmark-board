import React from 'react'
import { TextInput, TextArea, Dropdowns, Checkbox } from '../../../Common/Input'
import { LoadingImg } from '../../../Common/Image'
import { OutlinedButton, SvgIconButton, TextButton } from '../../../Common/Button'
import { ExternalLink, HeartFill, Refresh } from '../../../Common/Icon'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { Label } from '../../../Common/Label'
import { numberToDateTime } from '../../../../utils'

type Props = {
    bookmark: Bookmark,
    groups: BookmarkGroup[],
    likes: string[],
    moveDest: BookmarkGroup,
    sentLikes: boolean,
    status : LoadStatus['status'],
    copyGroup : boolean,
    handleLikes: () => void
    handleRefetch: () => void,
    handleSelectMoveDest: (s: string) => void,
    updateBookmark: (key:keyof Bookmark) => (value: string) => void,
    handleMove: () => void,
    handleJumpLink: ()=>void,
    handleCheckCopy: (checked:boolean)=>void
}

const Presenter: React.FC<Props> = ({
    bookmark,
    groups,
    likes,
    sentLikes,
    moveDest,
    status,
    copyGroup,
    handleLikes,
    handleRefetch,
    updateBookmark,
    handleSelectMoveDest,
    handleMove,
    handleJumpLink,
    handleCheckCopy
}) => {
    const inputDisabled = status === 'loading'
    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <div className='flex flex-col'>
                    <div className='w-32 h-32 flex items-center justify-center'>
                        {status === 'loading' ? (<LoadingImg className='w-32' />) : (
                            <img className='w-32' src={bookmark.image} />
                        )}
                    </div>
                    <TooltipDivContainer disabled={inputDisabled} content='説明や画像の情報を再度取得します' placement='bottom' className='flex items-center justify-center'>
                        <TextButton disabled={inputDisabled} className='my-4 text-xs flex items-center justify-center' fontType='none' onClick={handleRefetch}>
                            <Refresh className='w-4 stroke-primary-500 mr-2' strokeWidth={1.5} />
                            <span>情報再取得</span>
                        </TextButton>
                    </TooltipDivContainer>

                </div>
                <div className='w-full overflow-hidden p-4'>
                    <div className='flex items-center'>
                        <div className='w-full flex-1'>
                            <Label htmlFor='title'>Title</Label>
                            <TextInput disabled={inputDisabled} id='title' value={bookmark.title} handleSubmit={updateBookmark('title')} />
                        </div>
                        <SvgIconButton onClick={handleLikes}
                            className={`flex items-end ${sentLikes ? 'fill-secondary-main hover:fill-secondary-300' : 'fill-primary-300 hover:fill-primary-main'}`}>
                            <div className={`rounded-full p-1 ${sentLikes ? 'bg-secondary-light' : 'bg-primary-light'}`}>
                                <HeartFill className='w-6' strokeWidth={0} />
                            </div>
                            {likes.length > 0 && (
                                <div className={`text-xs ${sentLikes ? 'text-secondary-main' : 'text-primary-main'}`}>{likes.length}</div>
                            )}
                        </SvgIconButton>
                    </div>
                    <Label htmlFor='description' className='my-4'>Description</Label>
                    <TextArea
                        id='description'
                        disabled={inputDisabled}
                        maxRows={4}
                        value={bookmark.description}
                        handleSubmit={updateBookmark('description')} />
                </div>
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='url'>URL</Label>
                <div className='flex items-center'>
                    <TextInput className='flex-1' id='url' value={bookmark.url} handleSubmit={updateBookmark('url')} />
                    <SvgIconButton onClick={handleJumpLink}>
                        <ExternalLink className='w-6' strokeWidth={2} />
                    </SvgIconButton>
                </div>

            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='comment' className='mb-4'>ひとこと</Label>
                <TextArea id='comment' value={bookmark.comment} handleSubmit={updateBookmark('comment')} />
            </div>
            <div className='w-full overflow-hidden p-4'>
                <Label htmlFor='comment' className='mb-4'>グループを移動</Label>
                <div className='flex items-center'>
                    <Dropdowns
                        placement='bottom'
                        options={groups.map(g => ({ label: g.name, value: g.id }))}
                        selected={{ label: moveDest.name, value: moveDest.id }}
                        onSelect={handleSelectMoveDest} />
                    <Checkbox label='コピーを作成' className='ml-2 mt-2' id='copy' onChange={(e)=>{handleCheckCopy(e.target.checked)}}/>
                    <OutlinedButton
                        disabled={moveDest.id === bookmark.groupId}
                        className='ml-auto'
                        colorType='secondary'
                        onClick={handleMove}>
                        {copyGroup ? 'コピーする': '移動する'}
                    </OutlinedButton>
                </div>
            </div>
            <div className='p-2 mt-8 flex flex-col items-end justify-center'>
                {status === 'loading' ? (
                    <p className=' text-primary-400 text-xs'>更新中...</p>
                ) : (
                        <p className=' text-primary-400 text-xs'>{bookmark.lastUpdate && `更新日時   ${numberToDateTime(bookmark.lastUpdate)}`}</p>
                    )}
                <p className=' text-primary-400 text-xs'>{`作成日時   ${numberToDateTime(bookmark.created)}`}</p>
            </div>
        </div>
    )
}

export default Presenter