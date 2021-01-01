import {useEffect, useState} from 'react'
import { FirebaseClientServiceType } from '../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions as profileActions } from '../modules/profileSlice'
import { actions as authActions } from '../modules/authSlice'
import { actions as usersActions } from '../modules/usersSlice'

const useAuth = (clientService:FirebaseClientServiceType)=>{
    const [uid,setUid] = useState('')
    const dispatch = useDispatch()
    const { listenAuthState, getProfile } = clientService;
    useEffect(()=>{
        listenAuthState((user)=>{
            setUid(user.uid)
            dispatch(authActions.authSucceeded(user.uid))
        }, ()=>{
            setUid('')
            dispatch(profileActions.clear())
            dispatch(authActions.authFailed())
        })
    }, [listenAuthState,getProfile])

    const { listenProfile, auth } = clientService
    
    useEffect(()=>{
        if(!uid || !auth){
            return
        }
        getProfile(uid, ()=>{
            dispatch(authActions.registerSucceeded())
        }, ()=>{
            dispatch(authActions.registerFailed())
        })
    },[uid,listenProfile,auth])
    
    useEffect(()=>{
        if(!uid || !auth){
            return
        }
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
    }, [uid,listenProfile,auth])

    return uid
}

export default useAuth