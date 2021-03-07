import { Hit } from 'react-instantsearch-core';
import NextImage from '@components/Common/Avatar/NextImage'
import HeartFill from '@components/Common/Icon/HeartFill'
import Link from 'next/link'
import HighlightBase from './Highlight'
import { connectHighlight } from 'react-instantsearch-dom'
import { numberToDateTime } from '@utils/index'

const HighLight = connectHighlight(HighlightBase)

type Props = {
    hit: Hit<BookmarkGroupIndex>
}

const ListItem: React.FC<Props> = ({
    hit,
}) => {
    const path = `/public-bookmarks/${hit.objectID}`
    return (
        <div className='flex bg-white w-full shadow hover:bg-gray-50 p-2 rounded mt-1'>
            <div className='flex items-center flex-col justify-center'>
                <NextImage width={48} height={48} src={hit.ownerImage} name={hit.name} />
                <div className='mt-1 text-xs text-primary-main'>{hit.owner}</div>
            </div>
            <div style={{ minHeight: 48 }} className='mx-2 border-primary-border border-r h-full' />
            <div className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1'>
                <Link href={path}>
                    <a href={path} className='overflow-hidden truncate max-w-full text-primary-dark underline'>
                        <HighLight hit={hit} attribute='name' />
                    </a>
                </Link>
                <div className='overflow-hidden truncate text-xs max-w-full text-primary-main'>
                    <HighLight hit={hit} attribute='description' />
                </div>
                <div className='overflow-hidden truncate text-xs max-w-full text-primary-main'>
                    作成：{numberToDateTime(hit.created)}
                </div>
            </div>
            {(hit.numberOfLikes && hit.numberOfLikes > 0) ? (
                <div className='ml-auto flex items-start'>
                    <div className='flex items-end'>
                        <HeartFill className='w-6 fill-primary-400' />
                        <span className='ml-1 text-xs text-primary-main'>{hit.numberOfLikes}</span>
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default ListItem