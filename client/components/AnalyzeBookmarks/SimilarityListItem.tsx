import Link from 'next/link'
import { toast } from 'react-toastify';
import { BookmarkListImageSize } from '@utils/constants'
import { UrlImage } from '@components/Common/Avatar'
import Search from '@components/Common/Icon/Search'
import { OutlinedButton, TextButton } from '@components/Common/Button'

export type Props = {
    detailPath: string,
    bookmark: Bookmark,
    targetGroup: BookmarkGroup,
    diff : number,
    addIgnore: (bookmark:Bookmark,targetGroup:BookmarkGroup)=>Promise<void>,
    moveBookmark: (bookmark:Bookmark,targetGroup:BookmarkGroup)=>Promise<void>,
}

const SimilarityListItem: React.VFC<Props> = ({
    detailPath,
    bookmark,
    targetGroup,
    diff,
    addIgnore,
    moveBookmark
}) => {
    const { title, image, disableEndpoint } = bookmark
    return (
        <Link href={detailPath}>
            <a href={detailPath} className='flex p-2 max-w-full text-primary-dark bg-white hover:bg-gray-50 border-b border-primary-border'>
                <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                    <UrlImage
                        className='rounded border border-primary-border'
                        src={image}
                        enableEndpoint={!disableEndpoint}
                        width={BookmarkListImageSize}
                        height={BookmarkListImageSize}
                        name={title} />
                </div>
                <div className='flex overflow-x-hidden flex-col justify-center mx-3 w-full'>
                    <div>{bookmark.title}</div>
                    <div className='my-1 max-w-full text-xs'>
                        <span className='inline-flex p-1 text-sm text-secondary-main rounded border border-secondary-border'>
                            <Search className='w-4 h-4 stroke-secondary-300' strokeWidth={2} />
                            <span className='mx-1 font-semibold'>{targetGroup.name}</span>
                            <span>と類似性が</span>
                            <span className='mx-1 font-semibold'>{Math.floor(diff * 100)}%</span>
                            <span>高い</span>
                        </span>
                    </div>
                </div>
                <div className='flex flex-col justify-center ml-auto text-xs whitespace-nowrap'>
                    <OutlinedButton className='block' onClick={async (e)=>{
                        e.stopPropagation()
                        e.preventDefault()
                        await moveBookmark(bookmark, targetGroup)
                        toast.success('ブックマークを移動しました')
                    }}>移動する</OutlinedButton>
                    <TextButton className='block mt-2' onClick={async (e)=>{
                        e.stopPropagation()
                        e.preventDefault()
                        await addIgnore(bookmark, targetGroup)
                        toast.success('1件の提案を無視しました')
                    }}>無視する</TextButton>
                </div>
            </a>
        </Link >
    )
}

export default SimilarityListItem