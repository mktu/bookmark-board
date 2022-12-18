import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FirebaseClientServiceType } from '../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions as profileActions } from '../modules/profileSlice'
import { actions as authActions } from '../modules/authSlice'
import { actions as usersActions } from '../modules/usersSlice'

const useAuth = (clientService: FirebaseClientServiceType) => {
    const [uid, setUid] = useState('')
    const dispatch = useDispatch()
    const { listenAuthState, getProfile } = clientService;
    useEffect(() => {
        const onFailed = () => {
            setUid('')
            dispatch(profileActions.clear())
            dispatch(authActions.authFailed())
        }
        const unsubscribe = listenAuthState((user) => {
            setUid(user.uid)
            dispatch(authActions.authSucceeded(user.uid))
        }, onFailed, () => {
            toast.error('ログイン中にエラーが発生しました')
            onFailed()
        })
        return () => {
            unsubscribe()
        }
    }, [listenAuthState, getProfile, dispatch])

    const { listenProfile, auth } = clientService

    useEffect(() => {
        if (!uid || !auth) {
            return
        }
        getProfile(uid, () => {
            dispatch(authActions.registerSucceeded())
        }, () => {
            dispatch(authActions.registerFailed())
        }, () => {
            toast.error('プロフィール取得中にエラーが発生しました')
            dispatch(authActions.registerFailed())
        })
    }, [uid, listenProfile, auth, dispatch, getProfile])

    useEffect(() => {
        if (!uid || !auth) {
            return
        }
        const unsub = listenProfile(uid, (profile) => {
            dispatch(profileActions.saveProfile({ profile }))
            dispatch(usersActions.upsertUsers({ users: [profile] }))
            dispatch(authActions.registerSucceeded())
        })
        return () => {
            unsub()
            dispatch(profileActions.clear())
            dispatch(usersActions.clear())
        }
    }, [uid, listenProfile, auth, dispatch])

    return uid
}

export default useAuth