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
    const { auth: authModuleImported, getMyProfile, loginByGoogle, loginWithAnonymous, loginByGoogleWithRedirect, mock } = clientService
    const [needSignup, setNeedSignup] = useState(false)
    const [signining, setSignining] = useState(false)
    const router = useRouter()
    useEffect(() => {
        let unmounted = false
        if (authModuleImported && uid) {
            setSignining(true) // for redirect from google signin of mobile
            getMyProfile(() => {
                // login flow
                const fromPath = sessionStorage.getItem('fromPath')
                // tbd check if profile exists
                if (fromPath) {
                    router.push(fromPath).then(() => {
                        !unmounted && setSignining(false)
                    })
                }
                else {
                    router.push('/bookmarks').then(() => {
                        !unmounted && setSignining(false)
                    })
                }
            }, () => {
                setSignining(false)
                // signup flow
                setNeedSignup(true)
            })
        }
        return () => {
            unmounted = true
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
        <>
            {uid},{authModuleImported ? 'Yes' : 'No'}, {mock ? 'Yes' : 'No'}
            <Presenter
                {...{ welcome, webLogin, mobileLogin }}
            />
        </>
    )
}

export default Signin;