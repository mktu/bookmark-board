import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../context/FirebaseContext'
import Presenter from './Presenter'
import Signup from './Signup'

const Signin = () => {
    const { clientService } = useContext(FirebaseContext)
    const { auth, getMyProfile, loginByGoogle, loginWithAnonymous } = clientService
    const [needSignup, setNeedSignup] = useState(false)
    const [signining, setSignining] = useState(false)
    const router = useRouter();

    useEffect(()=>{
        if(signining && auth){
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
    },[signining,auth,getMyProfile,router])

    if (needSignup) {
        return <Signup handleCancelSignup={() => {
            setNeedSignup(false)
        }} />
    }

    const handleTransition = () => {
        setSignining(true)
    }
    const handleSignin = () => {
        loginByGoogle(handleTransition)
    }

    const handleAnonymous = () => {
        loginWithAnonymous(handleTransition)
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