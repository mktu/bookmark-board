import {useEffect, useState} from 'react'
import { FirebaseClientServiceType } from '../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions as profileActions } from '../modules/profileSlice'
import { actions as usersActions } from '../modules/usersSlice'

const useAuth = (clientService:FirebaseClientServiceType)=>{
    const [uid,setUid] = useState('')
    const [hasProfile,setHasProfile] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        const { listenAuthState, getProfile, addProfile } = clientService;
        listenAuthState((user)=>{
            setUid(user.uid)
            user.getIdToken().then(token=>{
                // nookies.set(undefined, 'bookmarkToken', token, {})
            })
            getProfile(user.uid, ()=>{
                setHasProfile(true)
                console.log(`${user.displayName} is already exist in profile`)
            }, ()=>{
                addProfile(user.displayName, user.uid, ()=>{
                    console.log(`added profile ${user.displayName}`)
                })
            })
        }, ()=>{
            setUid('')
            dispatch(profileActions.clear())
        })
    }, [clientService])

    useEffect(()=>{
        if(clientService.mock && typeof window !== 'undefined'){
            return;
        }
        if(!uid){
            return
        }
        const { listenProfile } = clientService
        const unsub = listenProfile(uid, (profile)=>{
            dispatch(profileActions.saveProfile({profile}))
            dispatch(usersActions.upsertUsers({users:[profile]}))
        })
        return ()=>{
            unsub()
            dispatch(profileActions.clear())
        }
    }, [uid])

    return uid
}

export default useAuth