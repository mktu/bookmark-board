import React from 'react'
import { useRouter } from 'next/router'
import TextArea from '@components/Common/Input/TextArea'
import TextInput from '@components/Common/Input/TextInput'
import { ContainedButton, OutlinedButton } from '@components/Common/Button'
import { SigninImg, LoadingImg } from '@components/Common/Image'
import Avatar from '@components/Common/Avatar/NextImage'
import useNewProfile from '@hooks/useNewProfile'

type Props = {
    handleCancelSignup: () => void
}

const Signup: React.FC<Props> = ({
    handleCancelSignup
}) => {
    const router = useRouter()
    const {
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
    } = useNewProfile()
    const onCancel = async () => {
        await handleCancel()
        handleCancelSignup()
    }
    const onCreate = async () => {
        const gid = await handleSubmit()
        if (gid) {
            router.push(`bookmarks/${gid}`)
        }
    }
    return (
        <div className='md:flex justify-center p-4 md:p-0 w-screen h-screen'>
            <div className='flex flex-col md:justify-center w-full md:w-1/2 h-full'>
                <p className='md:mb-4 text-lg font-bold text-primary-main'>ユーザー登録</p>
                <p className='mb-4 text-base text-primary-main'>ニックネームを登録し、早速始めましょう</p>
                <div className='md:flex w-full'>
                    <div className='flex flex-col items-center p-2'>
                        <Avatar width={128} height={128} src={fileUrl} disableNextImage />
                        <label className='py-2 px-4 my-2 text-primary-main hover:text-primary-dark rounded border border-primary-main hover:border-primary-dark cursor-pointer' htmlFor='file-upload'>
                            画像を変更
                        <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
                        </label>
                    </div>
                    <div className='p-4 w-full'>
                        <TextInput label='NAME' required id='name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <TextArea className='mt-4' label='COMMENT' id='comment' border='outlined' value={comment} minRows={4} onChange={(e) => { setComment(e.target.value) }} />
                    </div>
                </div>
                <div>
                    <TextInput label='デフォルトグループ名' id='group' value={group} onChange={(e) => { setGroup(e.target.value) }} />
                </div>
                <div className='flex justify-end p-4'>
                    {state === 'loading' ? (
                        <div className='flex items-center'>
                            <LoadingImg width='32px' /> <span className='inline-block font-semibold text-primary-main'>作成中...</span>
                        </div>
                    ) : (
                        <>
                            <OutlinedButton className='mx-2' onClick={onCancel}>キャンセル</OutlinedButton>
                            <ContainedButton disabled={!valid} onClick={onCreate}>作成する</ContainedButton>
                        </>
                    )}
                </div>
            </div>
            <div className='hidden md:flex items-end p-10 ml-4'>
                <SigninImg width='256px' height='256px' />
            </div>
        </div>
    )
}

export default Signup