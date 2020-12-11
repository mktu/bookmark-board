import React, {useContext} from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../context/FirebaseContext'
import Presenter from './Presenter'

const Signin = () => {
    const { clientService } = useContext(FirebaseContext)
    const router = useRouter();
    return (
        <Presenter 
            handleSignin={()=>{
                clientService.loginByGoogle(()=>{
                    const fromPath = sessionStorage.getItem('fromPath')
                    if(fromPath){
                        router.push(fromPath)
                    }
                    else{
                        router.push('/bookmarks')
                    }
                })
            }}
            handleAnonymous={()=>{
                clientService.loginWithAnonymous(()=>{
                    router.push('/bookmarks')
                })
            }}
        />
    )
}

export default Signin;