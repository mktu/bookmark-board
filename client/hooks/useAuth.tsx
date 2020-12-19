import {useEffect, useState} from 'react'
import { FirebaseClientServiceType } from '../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions as profileActions } from '../modules/profileSlice'
import { actions as authActions } from '../modules/authSlice'
import { actions as usersActions } from '../modules/usersSlice'

const useAuth = (clientService:FirebaseClientServiceType)=>{
    const [uid,setUid] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        const { listenAuthState, getProfile } = clientService;
        listenAuthState((user)=>{
            setUid(user.uid)
            dispatch(authActions.authSucceeded(user.uid))
            getProfile(user.uid, ()=>{
                dispatch(authActions.registerSucceeded())
            }, ()=>{
                dispatch(authActions.registerFailed())
            })
        }, ()=>{
            setUid('')
            dispatch(profileActions.clear())
            dispatch(authActions.authFailed())
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
            dispatch(authActions.registerSucceeded())
        })
        return ()=>{
            unsub()
            dispatch(profileActions.clear())
            dispatch(usersActions.clear())
        }
    }, [uid])

    return uid
}

export default useAuth