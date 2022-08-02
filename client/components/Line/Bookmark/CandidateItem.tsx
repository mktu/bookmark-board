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
        <li className='flex w-full items-center p-1 text-primary-main'>
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
            <div className='ml-2 w-full overflow-x-hidden'>
                <a className='block truncate underline' href={LineBookmarkPage(group.id, bookmark.id)}>
                    {bookmark.title}
                </a>
                <div className='mt-1 flex items-center text-sm text-primary-main'>
                    <Folder className='mr-2 h-4 w-4 stroke-primary-main'/>
                    {group.name}
                </div>
            </div>
        </li>
    )
}

export default CandidateItem