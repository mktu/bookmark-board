import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '@context/FirebaseContext'
import Presenter from './Presenter'
import Signup from './Signup'
import { TermLink, PrivactPolicyLink } from '@utils/constants'
import Welcome from './Welcome'
import WebLogin from './WebLogin'
import MobileLogin from './MobileLogin'

const Signin = () => {
    const { clientService, uid } = useContext(FirebaseContext)
    const { auth: authModuleImported, getMyProfile, loginByGoogle, loginWithAnonymous, loginByGoogleWithRedirect } = clientService
    const [needSignup, setNeedSignup] = useState(false)
    const [signining, setSignining] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (authModuleImported && uid) {
            getMyProfile(() => {
                // login flow
                const fromPath = sessionStorage.getItem('fromPath')
                // tbd check if profile exists
                if (fromPath) {
                    router.push(fromPath).then(()=>{
                        setSignining(false)
                    })
                }
                else {
                    router.push('/bookmarks').then(()=>{
                        setSignining(false)
                    })
                }
            }, () => {
                setSignining(false)
                // signup flow
                setNeedSignup(true)
            })
        }
    }, [authModuleImported, uid, getMyProfile, router])

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

    const welcome = <Welcome />

    const webLogin = <WebLogin
        termLink={TermLink}
        signining={signining}
        handleSignin={handleSignin}
        handleAnonymous={handleAnonymous}
        privactPolicyLink={PrivactPolicyLink}
    />

    const mobileLogin = <MobileLogin
        termLink={TermLink}
        signining={signining}
        handleMobileSignin={handleMobileSignin}
        privactPolicyLink={PrivactPolicyLink}
    />

    return (
        <Presenter
            {...{ welcome, webLogin, mobileLogin }}
        />
    )
}

export default Signin;