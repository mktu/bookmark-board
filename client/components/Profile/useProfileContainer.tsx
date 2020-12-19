import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useProfile } from '../../modules/profileSlice'
import { useUpload } from '../../hooks'
import FirebaseContext from '../../context/FirebaseContext'

const useProfileContainer = () => {
    const profile = useProfile()
    const {
        progress,
        handleChangeFile,
        upload,
        error,
        file
    } = useUpload()
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    
    const updateProfile = (key: keyof Profile) => (value: string) => {
        clientService.updateProfile(profile.id, {
            [key]: value
        })
    }
    useEffect(()=>{
        if(file){
            setStatus('loading')
            upload(`profiles/${profile.id}`, (url)=>{
                clientService.updateProfile(profile.id, {
                    image : url
                }, ()=>{
                    setStatus('loaded')
                })
            }, (e)=>{
                setStatus('failed')
                toast.error(e.name)
            })
        }
    },[file])
    return {
        profile,
        progress,
        status,
        error,
        handleChangeFile,
        updateProfile
    }
}

export default useProfileContainer