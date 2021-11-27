import { useContext, useEffect, useCallback, useState } from 'react'
import LiffContext from '@context/LiffContext'
import { getOrigin } from '@utils/index'

const GroupPath = `${getOrigin()}/api/line/groups`

export const useGroups = () => {
    const { lineProfile } = useContext(LiffContext)
    const { userId } = lineProfile || {}
    const [defaultGroup, setDefaultGroup] = useState('')
    const [error,setError] = useState('')
    const [groups, setGroups] = useState<BookmarkGroup[]>([])
    const fetchGroups = useCallback(async () => {
        if(!userId){
            return
        }
        const params = {
            user: userId
        }
        const queryParams = new URLSearchParams(params)
        const response = await fetch(`${GroupPath}?${queryParams}`)
        const json = await response.json() as {
            groups: BookmarkGroup[],
            defaultGroup?: string
        }
        const {groups, defaultGroup} = json
        setGroups(groups)
        setDefaultGroup(defaultGroup)
    }, [userId])
    useEffect(() => {
        fetchGroups().catch(e=>{
            console.error(e)
            setError('グループの取得に失敗しました')
        })
    }, [fetchGroups])

    return {
        lineProfile,
        defaultGroup,
        groups,
        error,
        setDefaultGroup
    }
}