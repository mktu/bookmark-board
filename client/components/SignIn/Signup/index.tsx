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
        <div className='h-screen w-screen justify-center p-4 md:flex md:p-0'>
            <div className='flex h-full w-full flex-col md:w-1/2 md:justify-center'>
                <p className='text-lg font-bold text-primary-main md:mb-4'>ユーザー登録</p>
                <p className='mb-4 text-base text-primary-main'>ニックネームを登録し、早速始めましょう</p>
                <div className='w-full md:flex'>
                    <div className='flex flex-col items-center p-2'>
                        <Avatar width={128} height={128} src={fileUrl} disableNextImage />
                        <label className='my-2 cursor-pointer rounded border border-primary-main py-2 px-4 text-primary-main hover:border-primary-dark hover:text-primary-dark' htmlFor='file-upload'>
                            画像を変更
                            <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
                        </label>
                    </div>
                    <div className='w-full p-4'>
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
            <div className='ml-4 hidden items-end p-10 md:flex'>
                <SigninImg width={256} height={256} />
            </div>
        </div>
    )
}

export default Signup