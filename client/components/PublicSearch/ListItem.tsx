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
        <div className='flex p-2 mt-1 w-full bg-white hover:bg-gray-50 rounded shadow'>
            <div className='flex flex-col justify-center items-center'>
                <NextImage width={48} height={48} src={hit.ownerImage} name={hit.name} />
                <div className='mt-1 text-xs text-primary-main'>{hit.owner}</div>
            </div>
            <div style={{ minHeight: 48 }} className='mx-2 h-full border-r border-primary-border' />
            <div className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full'>
                <Link href={path}>
                    <a href={path} className='overflow-hidden max-w-full text-primary-dark underline truncate'>
                        <HighLight hit={hit} attribute='name' />
                    </a>
                </Link>
                <div className='overflow-hidden max-w-full text-xs text-primary-main truncate'>
                    <HighLight hit={hit} attribute='description' />
                </div>
                <div className='overflow-hidden max-w-full text-xs text-primary-main truncate'>
                    作成：{numberToDateTime(hit.created)}
                </div>
            </div>
            {(hit.numberOfLikes && hit.numberOfLikes > 0) ? (
                <div className='flex items-start ml-auto'>
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