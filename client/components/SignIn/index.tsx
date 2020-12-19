import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../context/FirebaseContext'
import Presenter from './Presenter'
import Signup from './Signup'

const Signin = () => {
    const { clientService } = useContext(FirebaseContext)
    const [needSignup, setNeedSignup] = useState(false)
    const router = useRouter();
    if (needSignup) {
        return <Signup handleCancelSignup={() => {
            setNeedSignup(false)
        }} />
    }

    const handleTransition = () => {
        clientService.getMyProfile(() => {
            console.log('success')
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
            handleSignin={handleSignin}
            handleAnonymous={handleAnonymous}
        />
    )
}

export default Signin;