import { useState, useEffect, useCallback } from 'react'
import liff from '@line/liff';


const liffId = process.env.NEXT_PUBLIC_LIFF_ID

const useLiff = ()=>{
    const [hasInit,setInit] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const initLiff = useCallback(async ()=>{
        await liff.init({
            liffId
        });
    },[])
    useEffect(()=>{
        initLiff().then(()=>{
            setInit(true)
            setLoggedIn(liff.isLoggedIn())
        })
    },[initLiff])

    return {
        hasInit,
        isLineClient : liff.isInClient(),
        isLoggedIn
    }
}

export default useLiff