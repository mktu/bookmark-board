import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '@context/FirebaseContext'
import Presenter from './Presenter'
import Signup from './Signup'

const Signin = () => {
    const { clientService, uid } = useContext(FirebaseContext)
    const { auth : authModuleImported, getMyProfile, loginByGoogle, loginWithAnonymous, loginByGoogleWithRedirect } = clientService
    const [needSignup, setNeedSignup] = useState(false)
    const [signining, setSignining] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        if(authModuleImported && uid){
            getMyProfile(() => {
                setSignining(false)
                // login flow
                const fromPath = sessionStorage.getItem('fromPath')
                // tbd check if profile exists
                if (fromPath) {
                    router.push(fromPath)
                }
                else {
                    router.push('/bookmarks')
                }
            }, () => {
                setSignining(false)
                // signup flow
                setNeedSignup(true)
            })
        }
    },[authModuleImported,uid,getMyProfile,router])

    if (needSignup) {
        return <Signup handleCancelSignup={() => {
            setNeedSignup(false)
        }} />
    }

    const handleSignin = () => {
        setSignining(true)
        loginByGoogle()
    }

    const handleMobileSignin = () => {
        setSignining(true)
        loginByGoogleWithRedirect()
    }

    const handleAnonymous = () => {
        setSignining(true)
        loginWithAnonymous()
    }

    return (
        <Presenter
            signining={signining}
            handleMobileSignin={handleMobileSignin}
            handleSignin={handleSignin}
            handleAnonymous={handleAnonymous}
        />
    )
}

export default Signin;