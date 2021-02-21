import React, { useState, useContext, useRef, useEffect } from 'react'
import FirebaseContext from '../../../context/FirebaseContext'
import { useRouter } from 'next/router'
import TextArea from '../../Common/Input/TextArea'
import TextInput from '../../Common/Input/TextInput'
import { ContainedButton, OutlinedButton } from '../../Common/Button'
import { SigninImg, LoadingImg } from '../../Common/Image'
import Avatar from '../../Common/Avatar/NextImage'
import { toast } from 'react-toastify';
import useUpload from '../../../hooks/useUpload'

type Props = {
    handleCancelSignup: () => void
}

const Signup: React.FC<Props> = ({
    handleCancelSignup
}) => {
    const [name, setName] = useState('')
    const [group, setGroup] = useState('Default')
    const [comment, setComment] = useState('')
    const { clientService } = useContext(FirebaseContext)
    const [state, setState] = useState<LoadStatus['status']>('loaded')
    const unmount = useRef(false)
    useEffect(()=>{
        unmount.current = false
        return ()=>{
            unmount.current = true
        }
    },[])
    const setError = (error: Error) => {
        if(unmount.current) return
        toast.error(error.name)
        setState('failed')
    }
    const router = useRouter()
    const {
        handleChangeFile,
        upload,
        fileUrl,
    } = useUpload()
    const handleCancel = () => {
        clientService.logout(handleCancelSignup)
    }
    const handleSubmit = () => {
        if(unmount.current) return
        setState('loading')
        if (!name) {
            toast.error('必要な項目が入力されていません')
            return
        }
        clientService.addProfile({
            name,
            comment
        }, (uid) => {
            clientService.addGroup(group, uid, (gid) => {
                if (!fileUrl) {
                    router.push(`bookmarks/${gid}`)
                    return
                }
                upload(`profiles/${uid}`, (url) => {
                    clientService.updateProfile(uid, {
                        image: url
                    }, () => {
                        router.push(`bookmarks/${gid}`)
                    }, setError)
                })
            }, setError)
        }, setError)
    }
    return (
        <div className='md:flex w-screen h-screen justify-center p-4 md:p-0'>
            <div className='w-full md:w-1/2 h-full flex flex-col md:justify-center'>
                <p className='text-lg text-primary-main font-bold md:mb-4'>ユーザー登録</p>
                <p className='text-base text-primary-main mb-4'>ニックネームを登録し、早速始めましょう</p>
                <div className='md:flex w-full'>
                    <div className='flex flex-col items-center p-2'>
                        <Avatar width={128} height={128} src={fileUrl} disableNextImage />
                        <label className='my-2 py-2 px-4 cursor-pointer rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark' htmlFor='file-upload'>
                            画像を変更
                        <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
                        </label>
                    </div>
                    <div className='p-4 w-full'>
                        <TextInput label='NAME' required id='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                        <TextArea className='mt-4' label='COMMENT' id='comment' border='outlined' value={comment} minRows={4} onChange={(e)=>{setComment(e.target.value)}} />
                    </div>
                </div>
                <div>
                    <TextInput label='デフォルトグループ名' id='group' value={group} onChange={(e)=>{setGroup(e.target.value)}} />
                </div>
                <div className='flex justify-end p-4'>
                    {state === 'loading' ? (
                        <div className='flex items-center'>
                            <LoadingImg width='32px' /> <span className='inline-block text-primary-main font-semibold'>作成中...</span>
                        </div>
                    ) : (
                            <>
                                <OutlinedButton className='mx-2' onClick={handleCancel}>キャンセル</OutlinedButton>
                                <ContainedButton disabled={!name} onClick={handleSubmit}>作成する</ContainedButton>
                            </>
                        )}
                </div>
            </div>
            <div className='hidden ml-4 md:flex items-end p-10'>
                <SigninImg width='256px' height='256px' />
            </div>
        </div>
    )
}

export default Signup