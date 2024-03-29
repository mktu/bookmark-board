import React from 'react'
import { toast } from 'react-toastify';
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import { useAlgoliaRegister } from '../../../../hooks/useAlgoliaRegister'
import { OutlinedButton, ContainedButton } from '../../../Common/Button'
import PublicLink from './PublicLink'
import PrivateLink from './PrivateLink'
import Presenter from './Presenter'

type Props = {
    groupId: string,
    onClose: () => void
}

const Share: React.FC<Props> = ({
    groupId,
    onClose
}) => {
    const { group, updatePartial, handleSubmit, hasChange, hasOwnership } = useBookmarkGroup(groupId)
    const { canCreate, canDelete, searchable, setSearchable, handleCreateAlgolia, handleDeleteAlgolia } = useAlgoliaRegister(groupId, group?.searchable)
    const { sharable } = group || {}
    const origin = window.location.origin
    const publicPath = `/public-bookmarks/${groupId}`
    const publicUrl = `${origin}${publicPath}`
    const requestUrl = `${origin}/bookmark-requests/${groupId}`
    const handleShare = (sharable: boolean) => {
        updatePartial({ sharable })
        !sharable && setSearchable(false)
    }

    const publicLink = <PublicLink
        hasOwnership={hasOwnership}
        handleShare={handleShare}
        publicPath={publicPath}
        publicUrl={publicUrl}
        sharable={sharable}
        searchable={searchable}
        enableSearch={(searchable) => { setSearchable(searchable) }}
    />
    const privateLink = <PrivateLink
        requestUrl={requestUrl}
    />
    const submit = hasOwnership ? (
        <ContainedButton disabled={!hasChange && (!canCreate && !canDelete)} onClick={async () => {
            if (hasChange) {
                await handleSubmit()
            }
            if (canCreate) {
                handleCreateAlgolia().catch(() => {
                    toast.error('エラーにより検索インデックスの作成に失敗しました')
                })
            } else if (canDelete) {
                handleDeleteAlgolia().catch(() => {
                    toast.error('エラーにより検索インデックスの削除に失敗しました')
                })
            }
            onClose()
        }}>変更を保存</ContainedButton>
    ) : <div/>
    const cancel = (
        <OutlinedButton onClick={() => { onClose() }}>{hasOwnership ? 'キャンセル' : '戻る'}</OutlinedButton>
    )
    return <Presenter
        {...{
            publicLink,
            privateLink,
            submit,
            cancel
        }}

    />
}


export default Share

