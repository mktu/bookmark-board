import {useContext, useState, useCallback} from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';

const useUpload = (quality=0.3)=>{
    const { clientService } = useContext(FirebaseContext)
    const [file,setFile] = useState<Blob>()
    const fileUrl = (file && URL.createObjectURL(file))
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<Error>()
    const handleChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        if (e.target.files[0].size > 1024 * 1024 * 5) {
            toast.error('ERROR ファイルサイズが5MBを超えています')
            return
        }
        setFile(e.target.files[0])
    },[])
    const upload = useCallback((path:string, onSuccess:(url:string)=>void, onError?:(error:Error)=>void) => {
        new Compressor(file, {
            quality,
            success: (result) => {
                setProgress(0)
                clientService.uploadFile(
                    path,
                    result,
                    onSuccess,
                    (progress) => {
                        setProgress(Math.round(progress))
                    },
                    (e) => {
                        setError(e)
                        onError && onError(e)
                    }
                )
            }
        })
    },[file,clientService,quality])

    const uploadP = useCallback((path:string) => 
    new Promise<string>((resolve,reject)=>{
        new Compressor(file, {
            quality,
            success: (result) => {
                setProgress(0)
                clientService.uploadFile(
                    path,
                    result,
                    (url)=>{
                        resolve(url)
                    },
                    (progress) => {
                        setProgress(Math.round(progress))
                    },
                    (e) => {
                        setError(e)
                        reject(e)
                    }
                )
            }
        })
    }),[file,clientService,quality])

    return {
        file,
        fileUrl,
        progress,
        handleChangeFile,
        error,
        upload,
        uploadP
    }
}

export default useUpload