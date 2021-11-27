import { useState, useEffect, useCallback } from 'react'


const liffId = process.env.NEXT_PUBLIC_LIFF_ID
type LineProfile = {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
}

const useLiff = () => {
    const [hasInit, setInit] = useState(false)
    const [isLineClient, setLineClient] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [lineProfile, setLineProfile] = useState<LineProfile>()
    const initLiff = useCallback(async () => {
        if (location?.host.includes('localhost')) {
            setLoggedIn(true)
            setLineClient(true)
            setLineProfile({
                userId : 'Ub3d89d90c4c1f8891f4976c8c2374149',
                displayName : 'mktu',
            })
            return
        }
        const liff = typeof window !== 'undefined' && (await import('@line/liff')).default;
        if (!liff) {
            return
        }
        await liff.init({
            liffId
        });
        setLoggedIn(liff.isLoggedIn())
        setLineClient(liff.isInClient())
        if (!liff.isLoggedIn()) {
            return
        }
        const profile = await liff.getProfile()
        setLineProfile(profile)
    }, [])
    useEffect(() => {
        initLiff().then(() => {
            setInit(true)
        })
    }, [initLiff])

    return {
        hasInit,
        isLineClient,
        isLoggedIn,
        lineProfile
    }
}

export default useLiff