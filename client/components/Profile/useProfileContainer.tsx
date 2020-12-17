import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import { useProfile } from '../../modules/profileSlice'
import FirebaseContext from '../../context/FirebaseContext'

const useProfileContainer = () => {
    const profile = useProfile()
    const { clientService } = useContext(FirebaseContext)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const [error, setError] = useState<Error>()
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        if (e.target.files[0].size > 1024 * 1024 * 5) {
            toast.error('ERROR 画像サイズが5MBを超えています')
            return
        }
        new Compressor(e.target.files[0], {
            quality: 0.3,
            success: (result) => {
                setStatus('loading')
                setProgress(0)
                clientService.uploadProfileImage(
                    profile.id,
                    result,
                    (url) => {
                        clientService.updateProfile(
                            profile.id,
                            { image: url },
                            () => {
                                setStatus('loaded')
                            }
                        )
                    },
                    (progress) => {
                        setProgress(Math.round(progress))
                    },
                    (e) => {
                        setError(e)
                        setStatus('failed')
                    }
                )
            }
        })
    }
    const updateProfile = (key: keyof Profile) => (value: string) => {
        clientService.updateProfile(profile.id, {
            [key]: value
        })
    }
    return {
        profile,
        progress,
        status,
        error,
        handleChangeImage,
        updateProfile
    }
}

export default useProfileContainer