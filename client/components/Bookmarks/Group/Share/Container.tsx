import React from 'react'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
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
    const { group, updatePartial, handleSubmit } = useBookmarkGroup(groupId)
    const { sharable } = group || {}
    const host = window.location.host
    const publicPath = `/public-bookmarks/${groupId}`
    const publicUrl = `${host}${publicPath}`
    const requestUrl = `${host}/bookmark-requests/${groupId}`
    const handleShare = (sharable: boolean) => updatePartial({ sharable })

    const publicLink = <PublicLink
        handleShare={handleShare}
        publicPath={publicPath}
        publicUrl={publicUrl}
        sharable={sharable}
        searchable={group.searchable}
        enableSearch={(searchable)=>{updatePartial({searchable})}}
    />
    const privateLink = <PrivateLink
        requestUrl={requestUrl}
    />
    const submit = (
        <ContainedButton onClick={() => {
            handleSubmit().then(onClose)
        }}>変更を保存</ContainedButton>
    )
    const cancel = (
        <OutlinedButton onClick={() => { onClose() }}>キャンセル</OutlinedButton>
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

