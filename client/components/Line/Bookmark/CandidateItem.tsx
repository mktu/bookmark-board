import { LineBookmarkPage } from '@utils/routes'
import UrlImage, { NotFound } from '@components/Common/Avatar/UrlImage'
import Folder from '@components/Common/Icon/Folder'


type Props = {
    group: BookmarkGroup,
    bookmark: Bookmark,
}

const CandidateItem: React.VFC<Props> = ({
    group,
    bookmark
}) => {
    return (
        <li className='flex items-center p-1 w-full text-primary-main'>
            {bookmark.image ? (
                <UrlImage
                    className='rounded border border-primary-border'
                    src={bookmark.image}
                    width={64}
                    height={64}
                />
            ) : (<NotFound
                width={64}
                height={64}
            />)}
            <div className='overflow-x-hidden ml-2 w-full'>
                <a className='block underline truncate' href={LineBookmarkPage(group.id, bookmark.id)}>
                    {bookmark.title}
                </a>
                <div className='flex items-center mt-1 text-sm text-primary-main'>
                    <Folder className='mr-2 w-4 h-4 stroke-primary-main'/>
                    {group.name}
                </div>
            </div>
        </li>
    )
}

export default CandidateItem