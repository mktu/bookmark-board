import { useContext, useEffect, useCallback, useState } from 'react'
import LiffContext from '@context/LiffContext'
import { getOrigin } from '@utils/index'

const ProfilePath = `${getOrigin()}/api/line/profile`

export const useProfile = () => {
    const { idToken, closure } = useContext(LiffContext)
    const { close } = closure
    const [error, setError] = useState('')
    const [fetching, setFetching] = useState(false)
    const [profile, setProfile] = useState<Profile>()
    const fetchGroups = useCallback(async () => {
        if (!idToken) {
            return
        }
        setFetching(true)
        const params = {
            idToken
        }
        const queryParams = new URLSearchParams(params)
        const response = await fetch(`${ProfilePath}?${queryParams}`)
        const json = await response.json() as {
            profile: Profile,
        }
        const { profile } = json
        setProfile(profile)
        setFetching(false)
        setError('')

    }, [idToken])
    const onClose = useCallback(async ()=>{
        await close({
            close : true,
        })
    },[close])
    useEffect(() => {
        fetchGroups().catch(e => {
            console.error(e)
            setError('ユーザ情報の取得に失敗しました')
            setFetching(false)
        })
    }, [fetchGroups])

    return {
        profile,
        error,
        fetching,
        onClose
    }
}