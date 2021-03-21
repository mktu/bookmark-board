import { useState, useContext, useRef, useEffect } from 'react'
import FirebaseContext from '@context/FirebaseContext'
import { toast } from 'react-toastify';
import useUpload from '@hooks/useUpload'
import { useNewBookmarkGroup } from '@hooks/useNewBookmarkGroup'
import { event } from '@utils/gtag'


const useNewProfile = () => {
    const [name, setName] = useState('')
    const [group, setGroup] = useState('Default')
    const [comment, setComment] = useState('')
    const { clientService } = useContext(FirebaseContext)
    const [state, setState] = useState<LoadStatus['status']>('loaded')
    const unmount = useRef(false)
    const { addGroup } = useNewBookmarkGroup()
    const {
        handleChangeFile,
        uploadP,
        fileUrl,
    } = useUpload()
    useEffect(() => {
        unmount.current = false
        return () => {
            unmount.current = true
        }
    }, [])
    const setError = (error: Error) => {
        if (unmount.current) return
        toast.error(error.name)
        setState('failed')
    }
    const handleCancel = () => new Promise<void>((resolve) => {
        clientService.logout(resolve)
    })
    const addProfile = (name: string, comment: string) => new Promise<string>((resolve) => clientService.addProfile({
        name, comment
    }, resolve))
    const updateImage = (uid: string, image: string) => new Promise<void>((resolve) => clientService.updateProfile(uid, {
        image
    }, resolve))

    const handleSubmit = async () => {
        if (unmount.current) return
        setState('loading')
        event({
            action: 'submit', category: 'signin'
        })
        if (!name) {
            toast.error('必要な項目が入力されていません')
            return
        }
        try {
            const uid = await addProfile(name, comment)
            const gid = await addGroup(group, uid)
            if (!fileUrl) {
                return gid
            }
            const image = await uploadP(`profiles/${uid}`)
            console.log(image)
            await updateImage(uid, image)
            return gid
        }catch (error) {
            setError(error)
        }
    }
    const valid = Boolean(name && group)
    return {
        name,
        setName,
        group,
        setGroup,
        comment,
        setComment,
        state,
        fileUrl,
        handleChangeFile,
        handleCancel,
        handleSubmit,
        valid
    }
}

export default useNewProfile