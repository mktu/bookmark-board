import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useProfile } from '@modules/profileSlice'
import useUpload from './useUpload'
import FirebaseContext from '@context/FirebaseContext'

const useProfileContainer = () => {
    const original = useProfile()
    const {
        progress,
        handleChangeFile,
        upload,
        error,
        file
    } = useUpload()
    const [update, setUpdate] = useState<Partial<Profile>>({})
    const profile = {...original,...update}
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    
    const handleSubmit = (onSucceed?:Notifier) => {
        clientService.updateProfile(profile.id, update, ()=>{
            setUpdate({})
            onSucceed()
        })
    }

    const updateProfile = (key: keyof Profile) => (value: string) => {
        setUpdate(before=>({
            ...before,
            [key] : key === 'twitter' ? value.replace(/\s/g, '') : value
        }))
    }
    useEffect(()=>{
        return ()=>{
            setUpdate({})
        }
    },[])

    const hasChange = Object.keys(update).length > 0

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
    },[file,clientService,profile.id,upload])
    return {
        profile,
        progress,
        status,
        error,
        handleChangeFile,
        updateProfile,
        handleSubmit,
        hasChange
    }
}

export default useProfileContainer