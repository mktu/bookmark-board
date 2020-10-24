import React from 'react'
import { useRouter } from 'next/router'
import Presenter from './Presenter'

const LP = ()=>{
    const router = useRouter();

    return <Presenter handleLogin={()=>{
        router.push('/signin')
    }}/>
}

export default LP;