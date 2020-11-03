import React, {useContext} from 'react'
import { useRouter } from 'next/router'
import FirebaseContext from '../../context/FirebaseContext'
import Presenter from './Presenter'

type Props = {
}

const Signin = ({
}: Props) => {
    const { clientService } = useContext(FirebaseContext)
    const router = useRouter();
    return (
        <Presenter 
            handleSignin={()=>{
                clientService.loginByGoogle(()=>{
                    router.push('/bookmarks')
                })
            }}
        />
    )
}

export default Signin;