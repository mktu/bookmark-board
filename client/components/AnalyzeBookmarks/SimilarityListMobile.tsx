import Link from 'next/link'
import { toast } from 'react-toastify';
import { BookmarkListImageSize } from '@utils/constants'
import { UrlImage } from '@components/Common/Avatar'
import Search from '@components/Common/Icon/Search'
import { TextButton } from '@components/Common/Button'
import { Props } from './SimilarityListItem'

const SimilarityListItem: React.VFC<Props> = ({
    detailPath,
    bookmark,
    targetGroup,
    addIgnore,
    moveBookmark
}) => {
    const { title, image, disableEndpoint } = bookmark
    return (
        <div className='max-w-full border-b border-primary-border bg-white p-2 text-primary-dark'>
            <div className='flex'>
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
                            <span>と類似性が高い</span>
                        </span>
                    </div>
                </div>

            </div>
            <div className='my-2 ml-auto flex items-center whitespace-nowrap text-xs'>
                <Link href={detailPath} className='underline'>詳細を見る</Link>
                <TextButton className='ml-auto block border-r border-primary-border px-2' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await moveBookmark(bookmark, targetGroup)
                    toast.success('ブックマークを移動しました')
                }}>移動する</TextButton>
                <TextButton className='mx-2 block' colorType='secondary' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await addIgnore(bookmark, targetGroup)
                    toast.success('1件の提案を無視しました')
                }}>無視する</TextButton>
            </div>
        </div>
    );
}

export default SimilarityListItem