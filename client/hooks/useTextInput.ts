import {useState,useEffect} from 'react'

export const useDelayedInput = (init:string, delay = 500)=>{
    const [latest,setLatest] = useState('')
    const [confirmed, setConfirmed] = useState('')
    
    useEffect(()=>{
        setLatest(init)
        setConfirmed(init)
    },[init])

    useEffect(()=>{
        let unmounted = false
        setTimeout(() => {
            if(!unmounted){
                setConfirmed(latest)
            }
        }, delay)
        return ()=>{
            unmounted = true
        }
    },[delay,latest])
    return {
        latest,
        setLatest,
        confirmed
    }
}

