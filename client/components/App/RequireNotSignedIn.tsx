import React, {useEffect} from 'react'
import { useProfile } from '../../modules/profileSlice'
import { useRouter } from 'next/router'
import { LoadingLayout } from '../Layout'
import { LoadingImg } from '../Common/Image'

type Props = {
    children: React.ReactNode
}

const RequireSignedIn = ({ children }: Props) => {
    const profile = useProfile()
    const router = useRouter()
    const {loading, id} = profile
    useEffect(()=>{
        if(loading){
            return
        }
        if(id){
            router.push('/bookmarks')
        }
    }, [id,loading])

    if(loading || Boolean(id)){
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

export default RequireSignedIn