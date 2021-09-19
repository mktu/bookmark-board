import Presenter from "./Presenter";
import { useRouter } from 'next/router'
import { useMemo, useState, VFC, useEffect } from "react";
import useNewBookmark from "@hooks/useNewBookmark";
import { BookmarkInputBase } from '@components/Common/Input/BookmarkInput'
import { LinkPreview } from "@components/Common/LinkPreview";
import { Dropdowns } from "@components/Common/Input";
import { useGroupsByUser } from '@modules/groupSlice'
import { useProfile } from "@modules/profileSlice";
import { ContainedButton, OutlinedButton } from "@components/Common/Button";

const Container: VFC = () => {
    const router = useRouter()
    const { link } = router.query as { link ?: string }
    const [selectedGroup, setGroup] = useState<BookmarkGroup>()
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const { submit, onChangeBookmarkInput, bookmarkInput, url, linkData, error, setBookmarkInput } = useNewBookmark(selectedGroup?.id)

    useEffect(()=>{
        if(link){
            setBookmarkInput(link)
        }
    }, [link, setBookmarkInput])

    const Input = useMemo(() => (
        <BookmarkInputBase value={bookmarkInput} onChange={onChangeBookmarkInput} placeholder='ここにURLを入力' />
    ), [bookmarkInput, onChangeBookmarkInput])

    const Preview = useMemo(() => (
        <LinkPreview linkData={linkData} url={url} />
    ), [linkData, url])

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
        <ContainedButton disabled={Boolean(error) || !selectedGroup || !url} onClick={()=>{
            submit().then(()=>{
                router.push(`/bookmarks/${selectedGroup.id}`)
            })
        }}>
            保存
        </ContainedButton>
    ), [submit, selectedGroup, url, error,router])

    const Cancel = useMemo(() => (
        <OutlinedButton onClick={()=>{
            router.push(`/bookmarks`)
        }}>
            キャンセル
        </OutlinedButton>
    ), [router])
    return (
        <Presenter Input={Input} Preview={Preview} GroupDropdown={GroupDropdown} Cancel={Cancel} Submit={Submit} errorMessage={error} />
    )
}

export default Container