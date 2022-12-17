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
    diff: number,
    addIgnore: (bookmark: Bookmark, targetGroup: BookmarkGroup) => Promise<void>,
    moveBookmark: (bookmark: Bookmark, targetGroup: BookmarkGroup) => Promise<void>,
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
        (<Link
            href={detailPath}
            className='flex max-w-full border-b border-primary-border bg-white p-2 text-primary-dark hover:bg-gray-50'>

            <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex items-center overflow-hidden'>
                <UrlImage
                    className='rounded border border-primary-border'
                    src={image}
                    enableEndpoint={!disableEndpoint}
                    width={BookmarkListImageSize}
                    height={BookmarkListImageSize}
                    name={title} />
            </div>
            <div className='mx-3 flex w-full flex-col justify-center overflow-x-hidden'>
                <div>{bookmark.title}</div>
                <div className='my-1 max-w-full text-xs'>
                    <span className='inline-flex rounded border border-secondary-border p-1 text-sm text-secondary-main'>
                        <Search className='h-4 w-4 stroke-secondary-300' strokeWidth={2} />
                        <span className='mx-1 font-semibold'>{targetGroup.name}</span>
                        <span>と類似性が</span>
                        <span className='mx-1 font-semibold'>{Math.floor(diff * 100)}%</span>
                        <span>高い</span>
                    </span>
                </div>
            </div>
            <div className='ml-auto flex flex-col justify-center whitespace-nowrap text-xs'>
                <OutlinedButton className='block' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await moveBookmark(bookmark, targetGroup)
                    toast.success('ブックマークを移動しました')
                }}>移動する</OutlinedButton>
                <TextButton className='mt-2 block' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await addIgnore(bookmark, targetGroup)
                    toast.success('1件の提案を無視しました')
                }}>無視する</TextButton>
            </div>

        </Link >)
    );
}

export default SimilarityListItem