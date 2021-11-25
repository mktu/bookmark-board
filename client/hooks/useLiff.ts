import { useState, useEffect, useCallback } from 'react'


const liffId = process.env.NEXT_PUBLIC_LIFF_ID

const useLiff = ()=>{
    const [hasInit,setInit] = useState(false)
    const [isLineClient,setLineClient] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const initLiff = useCallback(async ()=>{
        const liff = typeof window !== 'undefined' && (await import('@line/liff')).default;
        if(!liff){
            return
        }
        await liff.init({
            liffId
        });
        setLoggedIn(liff.isLoggedIn())
        setLineClient(liff.isInClient())
    },[])
    useEffect(()=>{
        initLiff().then(()=>{
            setInit(true)
        })
    },[initLiff])

    return {
        hasInit,
        isLineClient,
        isLoggedIn
    }
}

export default useLiff