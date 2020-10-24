import React, { useEffect, useState } from 'react'
import FirebaseContext, { createFirebaseService, initialService } from '../../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions as profileActions } from '../../modules/profileSlice'
import nookies from 'nookies'

type Props = {
    children: React.ReactNode
}
const DefaultProvider: React.FC<Props> = ({ children }) => {
    const [clientService, setClientService] = useState(initialService)
    const [uid,setUid] = useState('')
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(clientService.mock && typeof window !== 'undefined'){
            createFirebaseService().then(services => {
                setClientService(services)
            })
            return;
        }
        const { listenAuthState, getProfile, addProfile } = clientService;
        listenAuthState((user)=>{
            setUid(user.uid)
            user.getIdToken().then(token=>{
                nookies.set(undefined, 'token', token, {})
            })
            getProfile(user.uid, ()=>{
                console.log(`${user.displayName} is already exist in profile`)
            }, ()=>{
                addProfile(user.displayName, user.uid, ()=>{
                    console.log(`added profile ${user.displayName}`)
                })
            })
        }, ()=>{
            setUid('')
            nookies.set(undefined, 'token', '', {})
        })
    }, [clientService.mock])

    useEffect(()=>{
        if(clientService.mock && typeof window !== 'undefined'){
            return;
        }
        if(!Boolean(uid)){
            return
        }
        const { listenProfile } = clientService
        const unsub = listenProfile(uid, (profile)=>{
            dispatch(profileActions.saveProfile({profile}))
        })
        return ()=>{
            unsub()
            dispatch(profileActions.clear())
        }
    }, [uid])

    return (
        <FirebaseContext.Provider value={{
            clientService,
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default DefaultProvider