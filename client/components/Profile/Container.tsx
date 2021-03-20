import React from 'react'
import { toast } from 'react-toastify';
import TextInput from '../Common/Input/TextInput'
import TextArea from '../Common/Input/TextArea'
import { ContainedButton } from '../Common/Button'
import Avatar from '../Common/Avatar/NextImage'
import useProfileEditor from '../../hooks/useProfileEditor'
import Presenter from './Presenter'

const Container: React.FC = () => {
    const {
        profile,
        progress,
        error,
        status,
        handleChangeFile,
        updateProfile,
        handleSubmit,
        hasChange
    } = useProfileEditor()

    const avatar = (
        <Avatar
            src={profile.image}
            width={192}
            height={192}
            name={profile.name} />
    )
    const uploadingImage = status === 'loading' && (
        <label className='py-2 px-4 text-primary-300 rounded border'>
            更新中...{progress}%
        </label>
    )
    const modifyImage = status === 'loaded' && (
        <label className='py-2 px-4 cursor-pointer rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark' htmlFor='file-upload'>
            画像を変更
            <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
        </label>
    )
    const failedUpload = status === 'failed' && (
        <label className='py-2 px-4 text-secondary-main'>
            {error.name}
        </label>
    )

    const name = <TextInput className='my-2' label='NAME' id='name' value={profile.name} onChange={(e) => { updateProfile('name')(e.target.value) }} />

    const twitterInput = <TextInput placeholder='@アカウント名のみ入力' className='w-full' id='twitter' value={profile.twitter} onChange={(e) => { updateProfile('twitter')(e.target.value) }} />

    const commentInput = <TextArea className='my-2' label='COMMENT' id='comment' value={profile.comment} border='outlined' minRows={4} onChange={(e) => { updateProfile('comment')(e.target.value) }} />

    const submit = (
        <ContainedButton disabled={!hasChange} className='my-2' onClick={() => {
            handleSubmit(() => {
                toast.success('プロファイルを変更しました')
            })
        }}>更新する</ContainedButton>
    )

    const updateDate = profile.lastUpdate && `更新日時   ${(new Date(profile.lastUpdate).toLocaleString())}`

    return <Presenter
        {...{
            avatar,
            uploadingImage,
            modifyImage,
            failedUpload,
            name,
            twitterInput,
            commentInput,
            submit,
            updateDate
        }}
    />
}

export default Container