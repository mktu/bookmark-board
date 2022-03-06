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
        <div className='p-2 max-w-full text-primary-dark bg-white border-b border-primary-border'>
            <div className='flex'>
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
                            <span>と類似性が高い</span>
                        </span>
                    </div>
                </div>

            </div>
            <div className='flex items-center my-2 ml-auto text-xs whitespace-nowrap'>
                <Link href={detailPath}><a className='underline' href={detailPath}>詳細を見る</a></Link>
                <TextButton className='block px-2 ml-auto border-r border-primary-border' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await moveBookmark(bookmark, targetGroup)
                    toast.success('ブックマークを移動しました')
                }}>移動する</TextButton>
                <TextButton className='block mx-2' colorType='secondary' onClick={async (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    await addIgnore(bookmark, targetGroup)
                    toast.success('1件の提案を無視しました')
                }}>無視する</TextButton>
            </div>
        </div>
    )
}

export default SimilarityListItem