import { useState, useEffect, useCallback } from 'react'
import { lineLogin, getAccessToken } from './useLineLogin'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID
type LineProfile = {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
}

const isLocalhost = ()=> typeof window !== 'undefined' && location?.host.includes('localhost')

type ClosureParam = {
    close : boolean,
    sendMessage ?: string
}

const useLiff = (pageUrl:string) => {
    const [hasInit, setInit] = useState(false)
    const [isLineClient, setLineClient] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [lineProfile, setLineProfile] = useState<LineProfile>()
    const [idToken, setIdToken] = useState('')
    const [closure,setClosure] = useState({
        close : async (param:ClosureParam)=>{
            console.log(param)
        }
    })
    const initLiff = useCallback(async () => {
        const liff = typeof window !== 'undefined' && (await import('@line/liff')).default;
        if (!liff) {
            return
        }
        await liff.init({
            liffId
        });
        setLineClient(liff.isInClient())
        const isLoggedIn = liff.isLoggedIn()
        setLoggedIn(isLoggedIn)
        if (!liff.isLoggedIn()) {
            return
        }
        const profile = await liff.getProfile()
        const idToken = liff.getIDToken()
        setIdToken(idToken)
        setLineProfile(profile)
        setClosure({
            close : async (param:ClosureParam)=>{
                if(param.sendMessage){
                    await liff.sendMessages([
                        {
                            type: 'text',
                            text: param.sendMessage,
                        },
                    ])
                }
                if(param.close){
                    liff.closeWindow()
                }
            }
        })
    }, [])
    useEffect(() => {
        if(isLocalhost() && pageUrl){
            getAccessToken(pageUrl).then(setIdToken).catch(e=>{
                console.error(e)
                lineLogin(pageUrl)
            })
        }else{
            initLiff().then(() => {
                setInit(true)
            })
        }
    }, [initLiff, pageUrl])

    return {
        hasInit,
        isLineClient,
        isLoggedIn,
        lineProfile,
        idToken,
        closure
    }
}

export default useLiff