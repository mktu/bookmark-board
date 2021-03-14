import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../context/FirebaseContext'
import Presenter from './Presenter'
import Signup from './Signup'

const Signin = () => {
    const { clientService } = useContext(FirebaseContext)
    const [needSignup, setNeedSignup] = useState(false)
    const [signining, setSignining] = useState(false)
    const router = useRouter();
    if (needSignup) {
        return <Signup handleCancelSignup={() => {
            setNeedSignup(false)
        }} />
    }

    const handleTransition = () => {
        setSignining(true)
        clientService.getMyProfile(() => {
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
    const handleSignin = () => {
        clientService.loginByGoogle(handleTransition)
    }

    const handleAnonymous = () => {
        clientService.loginWithAnonymous(handleTransition)
    }

    return (
        <Presenter
            signining={signining}
            handleSignin={handleSignin}
            handleAnonymous={handleAnonymous}
        />
    )
}

export default Signin;