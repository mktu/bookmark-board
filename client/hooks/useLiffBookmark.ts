import { useContext, useEffect, useCallback, useState } from 'react'
import LiffContext from '@context/LiffContext'
import { getOrigin } from '@utils/index'

const GroupPath = `${getOrigin()}/api/line/groups`

export const useGroups = () => {
    const { lineProfile, idToken, closure } = useContext(LiffContext)
    const { close } = closure
    const { userId } = lineProfile || {}
    const [defaultGroup, setDefaultGroup] = useState('')
    const [error, setError] = useState('')
    const [fetching, setFetching] = useState(false)
    const [posting,setPosting] = useState(false)
    const [groups, setGroups] = useState<BookmarkGroup[]>([])
    const fetchGroups = useCallback(async () => {
        if (!idToken) {
            return
        }
        setFetching(true)
        const params = {
            user: userId,
            idToken
        }
        const queryParams = new URLSearchParams(params)
        const response = await fetch(`${GroupPath}?${queryParams}`)
        const json = await response.json() as {
            groups: BookmarkGroup[],
            defaultGroup?: string
        }
        const { groups, defaultGroup } = json
        setGroups(groups)
        setDefaultGroup(defaultGroup)
        setFetching(false)

    }, [userId, idToken])
    const updateDefaultGroup = useCallback(async () => {
        setPosting(true)
        const response = await fetch(GroupPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken,
                defaultGroup
            })
        })
        const data = (await response.json()) as BookmarkGroup
        await close({
            close : true,
            sendMessage : `登録先グループを${data.name}に変更しました。`
        })
        setPosting(false)
    }, [idToken,defaultGroup, close])
    const onClose = useCallback(async ()=>{
        await close({
            close : true,
        })
    },[close])
    useEffect(() => {
        fetchGroups().catch(e => {
            console.error(e)
            setError('グループの取得に失敗しました')
            setFetching(false)
        })
    }, [fetchGroups])

    return {
        lineProfile,
        defaultGroup,
        groups,
        error,
        fetching,
        posting,
        setDefaultGroup,
        updateDefaultGroup,
        onClose
    }
}