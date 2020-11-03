import React, {useEffect} from 'react'
import { useProfile } from '../../modules/profileSlice'
import { useRouter } from 'next/router'
import { LoadingLayout } from '../Layout'
import { LoadingImg } from '../Common/Image'

type Props = {
    children: React.ReactNode
}

const RequireSigned = ({ children }: Props) => {
    const profile = useProfile()
    const router = useRouter()
    const {loading, id} = profile
    useEffect(()=>{
        if(loading){
            return
        }
        if(!Boolean(id)){
            router.push('/signin')
        }
    }, [id,loading])

    if(loading){
        return (
            <LoadingLayout>
                <LoadingImg />
            </LoadingLayout>
        )
    }
    return (
        <>
            {children}
        </>)
}

export default RequireSigned