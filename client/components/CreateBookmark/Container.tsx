import Presenter from "./Presenter";
import { useRouter } from 'next/router'
import { useMemo, useState, VFC, useEffect } from "react";
import Exclamation from '@components/Common/Icon/Exclamation'
import useNewBookmark from "@hooks/useNewBookmark";
import { BookmarkInputBase } from '@components/Common/Input/BookmarkInput'
import { LinkPreview } from "@components/Common/LinkPreview";
import { Dropdowns } from "@components/Common/Input";
import { useGroupsByUser } from '@modules/groupSlice'
import { useProfile } from "@modules/profileSlice";
import { ContainedButton, OutlinedButton } from "@components/Common/Button";

const Container: VFC = () => {
    const router = useRouter()
    const { description } = router.query as { description?: string }
    const [selectedGroup, setGroup] = useState<BookmarkGroup>()
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const { submit, onChangeBookmarkInput, bookmarkInput, url, linkData, error, setBookmarkInput, warn } = useNewBookmark(selectedGroup?.id)

    useEffect(() => {
        if (description) {
            setBookmarkInput(description)
        }
    }, [description, setBookmarkInput])

    const Input = useMemo(() => (
        <BookmarkInputBase value={bookmarkInput} onChange={onChangeBookmarkInput} placeholder='ここにURLを入力' />
    ), [bookmarkInput, onChangeBookmarkInput])

    const Preview = useMemo(() => warn ? (
        <div className='flex items-center p-2 text-sm text-coral-500' >
            <span><Exclamation className='mr-2 w-5 h-5 stroke-coral-500' fill='none' /></span>
            {warn}
        </div>
    ) : (
        <LinkPreview linkData={linkData} url={url} />
    ), [linkData, url, warn])

    const GroupDropdown = useMemo(() => (
        <Dropdowns placeholder='グループを選択してください' options={groups.map(v => ({ label: v.name, value: v.id }))} selected={selectedGroup?.id} onSelect={(selected) => {
            const target = groups.find(v => v.id === selected)
            setGroup(target)
        }}
            placement='auto-end'
            poperStyles={{
                width: 300,
                height: 400
            }}
        />
    ), [groups, selectedGroup])

    const Submit = useMemo(() => (
        <ContainedButton disabled={Boolean(error) || !selectedGroup || !url} onClick={() => {
            submit().then(() => {
                router.push(`/bookmarks/${selectedGroup.id}`)
            })
        }}>
            保存
        </ContainedButton>
    ), [submit, selectedGroup, url, error, router])

    const Cancel = useMemo(() => (
        <OutlinedButton onClick={() => {
            router.push(`/bookmarks`)
        }}>
            キャンセル
        </OutlinedButton>
    ), [router])
    return (
        <Presenter Input={Input} Preview={Preview} GroupDropdown={GroupDropdown} Cancel={Cancel} Submit={Submit} errorMessage={error} warnMessage={warn} />
    )
}

export default Container