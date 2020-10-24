import React, {useEffect} from 'react'
import { useProfile } from '../../modules/profileSlice'
import { useRouter } from 'next/router'
type Props = {
    children: React.ReactNode
}

const App = ({ children }: Props) => {
    const profile = useProfile()
    const router = useRouter()
    useEffect(()=>{
        if(profile.loading){
            return
        }
        if(!Boolean(profile.id)){
            router.push('/signin')
        }
    }, [profile.id])
    if(!Boolean(profile.id)){
        return <div/>
    }
    return (
        <>
            {children}
        </>)
}

export default App