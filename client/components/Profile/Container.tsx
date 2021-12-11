import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import TextInput from '../Common/Input/TextInput'
import TextArea from '../Common/Input/TextArea'
import { ContainedButton } from '../Common/Button'
import Avatar from '../Common/Avatar/NextImage'
import useProfileEditor from '@hooks/useProfileEditor'
import { useGroupsByUser } from '@modules/groupSlice'
import { lineLogin, lineLoginSettingPage } from '@hooks/useLineLogin'
import Presenter from './Presenter'
import LineLogin from './LineLogin'
import GroupSelector from './GroupSelector'
import { LineAuthlDialog, LineAuth } from './LineAuth'

const Container: React.FC = () => {
    const router = useRouter()
    const { option } = router.query
    const lineSetting = option && option.length > 0 && option[0] === 'line-setting'
    const {
        profile,
        progress,
        error,
        status,
        handleChangeFile,
        updateProfile,
        registerLine,
        handleSubmit,
        hasChange
    } = useProfileEditor()
    const groups = useGroupsByUser(profile?.id)

    const lineLoginButton = (
        <LineLogin onClickLogin={() => {
            lineLogin(lineLoginSettingPage)
        }} authed={Boolean(profile?.lineInfo)} name={profile?.lineInfo?.name} />
    )
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
        <label className='py-2 px-4 text-primary-main hover:text-primary-dark rounded border border-primary-main hover:border-primary-dark cursor-pointer' htmlFor='file-upload'>
            画像を変更
            <input id="file-upload" type='file' className='hidden' onChange={handleChangeFile} />
        </label>
    )
    const failedUpload = status === 'failed' && (
        <label className='py-2 px-4 text-secondary-main'>
            {error.name}
        </label>
    )

    const name = <TextInput className='my-2' label='NAME' id='name' value={profile.name||''} onChange={(e) => { updateProfile('name',e.target.value) }} />

    const twitterInput = <TextInput placeholder='@アカウント名' className='w-full' id='twitter' value={profile.twitter||''} onChange={(e) => { updateProfile('twitter',e.target.value) }} />

    const commentInput = <TextArea className='my-2' label='COMMENT' id='comment' value={profile.comment||''} border='outlined' minRows={4} onChange={(e) => { updateProfile('comment',e.target.value) }} />

    const submit = (
        <ContainedButton disabled={!hasChange} className='my-2' onClick={() => {
            handleSubmit(() => {
                toast.success('プロファイルを変更しました')
            })
        }}>更新する</ContainedButton>
    )

    const onCloseAuth = ()=>{
        router.push('/profile')
    }

    const lineAuth = lineSetting ? (
        <LineAuthlDialog open={lineSetting} onClose={onCloseAuth}>
            <LineAuth onClose={onCloseAuth} registLineId={registerLine} />
        </LineAuthlDialog>
    ) : (<div />)

    const groupSelectorForLine = profile?.lineInfo ? (
        <GroupSelector groups={groups} selected={profile.lineInfo.defaultGroup} handleUpdate={(id)=>{
            updateProfile('lineInfo', {...profile.lineInfo, defaultGroup : id})
        }}/>
    ) : (<div />)

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
            updateDate,
            lineLogin: lineLoginButton,
            lineAuth,
            groupSelectorForLine
        }}
    />
}

export default Container