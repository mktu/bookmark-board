import { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../context/FirebaseContext'

const useProfileService = (profileIds:string[]) => {
    const { clientService } = useContext(FirebaseContext)
    const [profiles,setProfiles] = useState<Profile[]>([])
    const key = Array.from(new Set(profileIds)).sort().join(',')
    useEffect(() => {
        if (key) {
            const retrieveTraget = key.split(',')
            clientService.getProfiles(retrieveTraget, (editors) => {
                setProfiles(editors)
            })
        }
    }, [key,clientService])
    return profiles
}

export default useProfileService